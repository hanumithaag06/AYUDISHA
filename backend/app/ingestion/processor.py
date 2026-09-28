import os
import json
import hashlib
import datetime
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.core.config import settings
from backend.app.models.models import Source, SourceDocument, DocumentVersion, DocumentChunk
from backend.app.crawling.adapters import (
    TKDLAdapter, IndiaCodeAdapter, IPIndiaAdapter, NBAAdapter,
    AYUSHAdapter, WIPOAdapter, FSSAIAdapter
)

class DataProcessor:
    """Document processing, versioning, semantic chunking, and database persistence pipeline."""

    def calculate_hash(self, text: str) -> str:
        return hashlib.sha256(text.encode("utf-8")).hexdigest()

    async def seed_authoritative_sources(self, db: AsyncSession):
        """Seed initial official sources into source registry if missing."""
        initial_sources = [
            {
                "id": "src-tkdl",
                "name": "Traditional Knowledge Digital Library",
                "organization": "CSIR & Ministry of AYUSH, Govt of India",
                "base_url": "https://www.tkdl.res.in/",
                "source_type": "TKDL",
                "jurisdiction": "India",
                "access_type": "PUBLIC",
                "parser_type": "HTML",
                "document_count": 2
            },
            {
                "id": "src-indiacode",
                "name": "India Code Statutory Portal",
                "organization": "Legislative Department, Ministry of Law and Justice, Govt of India",
                "base_url": "https://www.indiacode.nic.in/",
                "source_type": "ACT",
                "jurisdiction": "India",
                "access_type": "PUBLIC",
                "parser_type": "HTML",
                "document_count": 2
            },
            {
                "id": "src-ipindia",
                "name": "Controller General of Patents, Designs and Trade Marks (IP India)",
                "organization": "DPIIT, Ministry of Commerce & Industry, Govt of India",
                "base_url": "https://ipindia.gov.in/",
                "source_type": "PATENT",
                "jurisdiction": "India",
                "access_type": "PUBLIC",
                "parser_type": "PDF",
                "document_count": 2
            },
            {
                "id": "src-nba",
                "name": "National Biodiversity Authority (NBA / ABS)",
                "organization": "Ministry of Environment, Forest and Climate Change, Govt of India",
                "base_url": "https://nbaindia.org/",
                "source_type": "ABS",
                "jurisdiction": "India",
                "access_type": "PUBLIC",
                "parser_type": "PDF",
                "document_count": 1
            },
            {
                "id": "src-ayush",
                "name": "Ministry of AYUSH Regulatory Portal",
                "organization": "Ministry of AYUSH, Govt of India",
                "base_url": "https://www.ayush.gov.in/",
                "source_type": "REGULATION",
                "jurisdiction": "India",
                "access_type": "PUBLIC",
                "parser_type": "HTML",
                "document_count": 1
            },
            {
                "id": "src-wipo",
                "name": "World Intellectual Property Organization (WIPO)",
                "organization": "United Nations / WIPO",
                "base_url": "https://www.wipo.int/",
                "source_type": "INTERNATIONAL_TREATY",
                "jurisdiction": "International",
                "access_type": "PUBLIC",
                "parser_type": "HTML",
                "document_count": 2
            },
            {
                "id": "src-fssai",
                "name": "Food Safety and Standards Authority of India (FSSAI)",
                "organization": "Ministry of Health and Family Welfare, Govt of India",
                "base_url": "https://www.fssai.gov.in/",
                "source_type": "REGULATION",
                "jurisdiction": "India",
                "access_type": "PUBLIC",
                "parser_type": "PDF",
                "document_count": 1
            }
        ]

        for src_data in initial_sources:
            existing = await db.get(Source, src_data["id"])
            if not existing:
                src_obj = Source(
                    id=src_data["id"],
                    name=src_data["name"],
                    organization=src_data["organization"],
                    base_url=src_data["base_url"],
                    source_type=src_data["source_type"],
                    jurisdiction=src_data["jurisdiction"],
                    access_type=src_data["access_type"],
                    parser_type=src_data["parser_type"],
                    crawl_method="DIRECT_HTTP",
                    crawl_frequency="DAILY",
                    robots_allowed=True,
                    enabled=True,
                    last_crawled_at=datetime.datetime.utcnow(),
                    last_success_at=datetime.datetime.utcnow(),
                    document_count=src_data["document_count"]
                )
                db.add(src_obj)
        await db.commit()

    async def ingest_all_authoritative_data(self, db: AsyncSession):
        """Run all adapters, chunk documents, write raw/processed files, and insert into DB."""
        await self.seed_authoritative_sources(db)

        adapters_data = [
            ("src-tkdl", await TKDLAdapter.ingest_permitted_samples()),
            ("src-indiacode", await IndiaCodeAdapter.ingest_statutes()),
            ("src-ipindia", await IPIndiaAdapter.ingest_guidelines()),
            ("src-nba", await NBAAdapter.ingest_abs_regulations()),
            ("src-ayush", await AYUSHAdapter.ingest_ayush_rules()),
            ("src-wipo", await WIPOAdapter.ingest_wipo_treaties()),
            ("src-fssai", await FSSAIAdapter.ingest_fssai_regulations()),
        ]

        doc_counter = 1
        chunk_counter = 1

        for src_id, docs in adapters_data:
            source_obj = await db.get(Source, src_id)
            for doc in docs:
                doc_id = f"doc-{doc_counter}"
                doc_counter += 1

                raw_hash = self.calculate_hash(json.dumps(doc))

                # Raw & processed file paths
                raw_path = os.path.join(settings.RAW_DIR, f"{doc_id}_{raw_hash[:8]}.json")
                processed_path = os.path.join(settings.PROCESSED_DIR, f"{doc_id}_{raw_hash[:8]}.json")

                with open(raw_path, "w", encoding="utf-8") as f:
                    json.dump(doc, f, indent=2)

                with open(processed_path, "w", encoding="utf-8") as f:
                    json.dump(doc, f, indent=2)

                existing_doc = await db.get(SourceDocument, doc_id)
                if not existing_doc:
                    s_doc = SourceDocument(
                        id=doc_id,
                        source_id=src_id,
                        title=doc["title"],
                        url=doc["url"],
                        document_type=doc["document_type"],
                        jurisdiction=doc["jurisdiction"],
                        publication_date=doc["publication_date"],
                        effective_date=doc["effective_date"],
                        current_version=doc["version"],
                        content_hash=raw_hash
                    )
                    db.add(s_doc)

                    ver_id = f"ver-{doc_id}-{doc['version']}"
                    doc_ver = DocumentVersion(
                        id=ver_id,
                        document_id=doc_id,
                        version=doc["version"],
                        publication_date=doc["publication_date"],
                        effective_date=doc["effective_date"],
                        content_hash=raw_hash,
                        raw_content_location=raw_path,
                        processed_content_location=processed_path,
                        change_summary=f"Initial ingestion of {doc['title']} ({doc['version']})"
                    )
                    db.add(doc_ver)

                    # Chunk sections
                    for sec in doc.get("sections", []):
                        chunk_id = f"chunk-{chunk_counter}"
                        chunk_counter += 1
                        chk = DocumentChunk(
                            id=chunk_id,
                            version_id=ver_id,
                            document_id=doc_id,
                            section=sec["section"],
                            content=sec["content"],
                            chunk_index=chunk_counter,
                            language="en",
                            jurisdiction=doc["jurisdiction"],
                            source_name=source_obj.name if source_obj else "Authoritative Source",
                            document_title=doc["title"],
                            source_url=doc["url"],
                            metadata_json={
                                "organization": source_obj.organization if source_obj else "",
                                "document_type": doc["document_type"],
                                "version": doc["version"],
                                "publication_date": doc["publication_date"],
                                "effective_date": doc["effective_date"]
                            }
                        )
                        db.add(chk)

        await db.commit()

processor = DataProcessor()
