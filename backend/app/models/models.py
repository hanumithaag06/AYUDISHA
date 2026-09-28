import datetime
from sqlalchemy import String, Text, Boolean, Integer, DateTime, ForeignKey, Float, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from backend.app.core.database import Base

class Source(Base):
    __tablename__ = "sources"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    organization: Mapped[str] = mapped_column(String, nullable=False)
    base_url: Mapped[str] = mapped_column(String, nullable=False)
    source_type: Mapped[str] = mapped_column(String, nullable=False) # e.g., TKDL, ACT, PATENT, ABS, REGULATION
    jurisdiction: Mapped[str] = mapped_column(String, nullable=False) # India, International
    language: Mapped[str] = mapped_column(String, default="en")
    access_type: Mapped[str] = mapped_column(String, default="PUBLIC") # PUBLIC, RESTRICTED
    parser_type: Mapped[str] = mapped_column(String, default="HTML") # HTML, PDF, JSON, API
    crawl_method: Mapped[str] = mapped_column(String, default="DIRECT_HTTP")
    crawl_frequency: Mapped[str] = mapped_column(String, default="DAILY")
    robots_allowed: Mapped[bool] = mapped_column(Boolean, default=True)
    enabled: Mapped[bool] = mapped_column(Boolean, default=True)
    last_crawled_at: Mapped[datetime.datetime | None] = mapped_column(DateTime, nullable=True)
    last_success_at: Mapped[datetime.datetime | None] = mapped_column(DateTime, nullable=True)
    last_failure_at: Mapped[datetime.datetime | None] = mapped_column(DateTime, nullable=True)
    document_count: Mapped[int] = mapped_column(Integer, default=0)

    documents = relationship("SourceDocument", back_populates="source", cascade="all, delete-orphan")


class SourceDocument(Base):
    __tablename__ = "source_documents"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    source_id: Mapped[str] = mapped_column(String, ForeignKey("sources.id"), nullable=False)
    title: Mapped[str] = mapped_column(String, nullable=False)
    url: Mapped[str] = mapped_column(String, nullable=False)
    document_type: Mapped[str] = mapped_column(String, nullable=False) # ACT, RULE, GUIDELINE, PATENT, FORMULATION
    jurisdiction: Mapped[str] = mapped_column(String, nullable=False)
    language: Mapped[str] = mapped_column(String, default="en")
    publication_date: Mapped[str | None] = mapped_column(String, nullable=True)
    effective_date: Mapped[str | None] = mapped_column(String, nullable=True)
    expiry_date: Mapped[str | None] = mapped_column(String, nullable=True)
    current_version: Mapped[str] = mapped_column(String, default="v1.0")
    content_hash: Mapped[str] = mapped_column(String, nullable=False)
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime, default=datetime.datetime.utcnow)

    source = relationship("Source", back_populates="documents")
    versions = relationship("DocumentVersion", back_populates="document", cascade="all, delete-orphan")


class DocumentVersion(Base):
    __tablename__ = "document_versions"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    document_id: Mapped[str] = mapped_column(String, ForeignKey("source_documents.id"), nullable=False)
    version: Mapped[str] = mapped_column(String, nullable=False)
    publication_date: Mapped[str | None] = mapped_column(String, nullable=True)
    effective_date: Mapped[str | None] = mapped_column(String, nullable=True)
    superseded_date: Mapped[str | None] = mapped_column(String, nullable=True)
    retrieved_at: Mapped[datetime.datetime] = mapped_column(DateTime, default=datetime.datetime.utcnow)
    content_hash: Mapped[str] = mapped_column(String, nullable=False)
    raw_content_location: Mapped[str] = mapped_column(String, nullable=False)
    processed_content_location: Mapped[str] = mapped_column(String, nullable=False)
    change_summary: Mapped[str | None] = mapped_column(Text, nullable=True)

    document = relationship("SourceDocument", back_populates="versions")
    chunks = relationship("DocumentChunk", back_populates="version_obj", cascade="all, delete-orphan")


class DocumentChunk(Base):
    __tablename__ = "document_chunks"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    version_id: Mapped[str] = mapped_column(String, ForeignKey("document_versions.id"), nullable=False)
    document_id: Mapped[str] = mapped_column(String, ForeignKey("source_documents.id"), nullable=False)
    section: Mapped[str | None] = mapped_column(String, nullable=True)
    chapter: Mapped[str | None] = mapped_column(String, nullable=True)
    page_number: Mapped[int | None] = mapped_column(Integer, nullable=True)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    chunk_index: Mapped[int] = mapped_column(Integer, default=0)
    language: Mapped[str] = mapped_column(String, default="en")
    jurisdiction: Mapped[str] = mapped_column(String, default="India")
    source_name: Mapped[str] = mapped_column(String, default="Authoritative Source")
    document_title: Mapped[str] = mapped_column(String, default="Official Document")
    source_url: Mapped[str] = mapped_column(String, default="")
    metadata_json: Mapped[dict | None] = mapped_column(JSON, nullable=True)

    version_obj = relationship("DocumentVersion", back_populates="chunks")


class TermMapping(Base):
    __tablename__ = "term_mappings"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    local_name: Mapped[str] = mapped_column(String, nullable=False, index=True)
    sanskrit_name: Mapped[str] = mapped_column(String, nullable=False, index=True)
    regional_name: Mapped[str | None] = mapped_column(String, nullable=True)
    scientific_name: Mapped[str] = mapped_column(String, nullable=False, index=True)
    common_name: Mapped[str] = mapped_column(String, nullable=False)
    category: Mapped[str] = mapped_column(String, default="HERB")
    properties_json: Mapped[dict | None] = mapped_column(JSON, nullable=True)


class ResearchWorkspace(Base):
    __tablename__ = "research_workspaces"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    title: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    notes_json: Mapped[list | None] = mapped_column(JSON, nullable=True)
    bookmarked_sources_json: Mapped[list | None] = mapped_column(JSON, nullable=True)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime, default=datetime.datetime.utcnow)
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime, default=datetime.datetime.utcnow)


class KnowledgeGraphNode(Base):
    __tablename__ = "knowledge_graph_nodes"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False, index=True)
    entity_type: Mapped[str] = mapped_column(String, nullable=False) # PRODUCT, INGREDIENT, TK, REGULATION, JURISDICTION
    attributes_json: Mapped[dict | None] = mapped_column(JSON, nullable=True)


class KnowledgeGraphEdge(Base):
    __tablename__ = "knowledge_graph_edges"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    source_node_id: Mapped[str] = mapped_column(String, ForeignKey("knowledge_graph_nodes.id"), nullable=False)
    target_node_id: Mapped[str] = mapped_column(String, ForeignKey("knowledge_graph_nodes.id"), nullable=False)
    relationship_type: Mapped[str] = mapped_column(String, nullable=False) # CONTAINS, REQUIRES, BELONGS_TO, SUPERSEDES
    evidence_citation: Mapped[str | None] = mapped_column(Text, nullable=True)


class RetrievalLog(Base):
    __tablename__ = "retrieval_logs"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    query: Mapped[str] = mapped_column(Text, nullable=False)
    detected_intent: Mapped[str] = mapped_column(String, nullable=False)
    detected_jurisdiction: Mapped[str] = mapped_column(String, nullable=False)
    confidence_score: Mapped[float] = mapped_column(Float, default=0.9)
    unsupported_claims_flag: Mapped[bool] = mapped_column(Boolean, default=False)
    latency_ms: Mapped[float] = mapped_column(Float, default=120.0)
    timestamp: Mapped[datetime.datetime] = mapped_column(DateTime, default=datetime.datetime.utcnow)


class CrawlJob(Base):
    __tablename__ = "crawl_jobs"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    source_id: Mapped[str] = mapped_column(String, ForeignKey("sources.id"), nullable=False)
    status: Mapped[str] = mapped_column(String, default="PENDING") # PENDING, IN_PROGRESS, COMPLETED, FAILED
    items_processed: Mapped[int] = mapped_column(Integer, default=0)
    error_log: Mapped[str | None] = mapped_column(Text, nullable=True)
    started_at: Mapped[datetime.datetime] = mapped_column(DateTime, default=datetime.datetime.utcnow)
    completed_at: Mapped[datetime.datetime | None] = mapped_column(DateTime, nullable=True)
