from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.schemas.schemas import IPRPathRequest, IPRPathResponse, IPRPathNode, CitationSchema
from backend.app.services.terminology import normalizer

class IPRPathService:
    """Generates an evidence-backed step-by-step IPR & Regulatory map for an Ayurvedic product."""

    async def generate_path(self, db: AsyncSession, request: IPRPathRequest) -> IPRPathResponse:
        ingredients_str = ", ".join(request.ingredients)
        norm_result = normalizer.normalize(ingredients_str)

        cit_tkdl = CitationSchema(
            id="cit-tk-1",
            source_name="Traditional Knowledge Digital Library (TKDL)",
            organization="CSIR & Ministry of AYUSH",
            document_title="TKDL Prior Art Database for Ayurveda",
            document_type="TRADITIONAL_KNOWLEDGE",
            jurisdiction="India",
            publication_date="2001-01-01",
            effective_date="2001-01-01",
            version="v1.0",
            section="Section 3(p) Defense",
            source_url="https://www.tkdl.res.in/",
            evidence_text="Inventions duplicating or aggregating known properties of traditional knowledge components are excluded under Section 3(p) of the Patents Act, 1970."
        )

        cit_patent = CitationSchema(
            id="cit-pat-1",
            source_name="IP India Patents Office",
            organization="DPIIT, Govt of India",
            document_title="Indian Patents Act, 1970 - Section 3(e) & 3(d)",
            document_type="ACT",
            jurisdiction="India",
            publication_date="1970-09-19",
            effective_date="2005-01-01",
            version="v2005",
            section="Section 3(e) & Section 3(d)",
            source_url="https://ipindia.gov.in/",
            evidence_text="Combinations require experimental Chou-Talalay Combination Index (CI) proof of synergistic therapeutic efficacy to overcome Section 3(e) non-patentability."
        )

        cit_nba = CitationSchema(
            id="cit-nba-1",
            source_name="National Biodiversity Authority",
            organization="Ministry of Environment, Forest and Climate Change",
            document_title="Biological Diversity Act, 2002 - Section 6",
            document_type="ACT",
            jurisdiction="India",
            publication_date="2003-02-05",
            effective_date="2024-04-01",
            version="v2023_amendment",
            section="Section 6 Mandate",
            source_url="https://nbaindia.org/",
            evidence_text="Prior approval of NBA via Form I is required before securing any IPR based on Indian biological resources."
        )

        cit_fssai = CitationSchema(
            id="cit-fss-1",
            source_name="FSSAI",
            organization="Ministry of Health and Family Welfare",
            document_title="Food Safety and Standards (Ayurveda Aahar) Regulations, 2022",
            document_type="REGULATION",
            jurisdiction="India",
            publication_date="2022-05-05",
            effective_date="2022-11-19",
            version="v2022",
            section="Regulation 6 Labelling",
            source_url="https://www.fssai.gov.in/",
            evidence_text="Ayurveda Aahar products require mandatory logo, consumer advisory statement, and adherence to Schedule A recipes."
        )

        nodes = [
            IPRPathNode(
                step_id="step-1",
                title="Traditional Knowledge (TKDL) Prior-Art Check",
                status="RELEVANT",
                relevance_reason=f"Formulation contains ingredients ({ingredients_str}) documented in classical Samhitas. Check against TKDL database.",
                evidence_citations=[cit_tkdl],
                questions_to_verify=[
                    "Is the therapeutic claim disclosed in Charaka or Sushruta Samhita?",
                    "Are you using novel processing/extraction or classical methods?"
                ],
                official_resource_url="https://www.tkdl.res.in/"
            ),
            IPRPathNode(
                step_id="step-2",
                title="Patentability Assessment (Sec 3p, 3e, 3d)",
                status="RELEVANT",
                relevance_reason="Requires overcoming Section 3(e) mere admixture objection with statistical synergistic efficacy evidence.",
                evidence_citations=[cit_patent],
                questions_to_verify=[
                    "Is Chou-Talalay Combination Index < 1.0 backed by bioassays?",
                    "Does the extraction process produce a novel phytopharmaceutical composition?"
                ],
                official_resource_url="https://ipindia.gov.in/"
            ),
            IPRPathNode(
                step_id="step-3",
                title="Trademark Registration Strategy (Class 5)",
                status="CONDITIONAL",
                relevance_reason="Classical formulation titles (e.g. Triphala, Chyawanprash) cannot be registered. Choose arbitrary brand prefix.",
                evidence_citations=[],
                questions_to_verify=[
                    "Is the proposed mark a generic Ayurvedic text descriptor?",
                    "Have you conducted an InPASS public mark search in Class 5?"
                ],
                official_resource_url="https://ipindia.gov.in/"
            ),
            IPRPathNode(
                step_id="step-4",
                title="Biological Resource & ABS Compliance (NBA Form I)",
                status="RELEVANT",
                relevance_reason="Mandatory filing of Form I with NBA before grant of patent if utilizing Indian herbs/flora.",
                evidence_citations=[cit_nba],
                questions_to_verify=[
                    "Were raw herbs procured from Indian geographical origins?",
                    "Is Form I submitted prior to international patent grant?"
                ],
                official_resource_url="https://nbaindia.org/"
            ),
            IPRPathNode(
                step_id="step-5",
                title="Regulatory Product Licensing & FSSAI / AYUSH Compliance",
                status="RELEVANT",
                relevance_reason="Form 25-D manufacturing license from SLA for medicinal claims OR FSSAI Ayurveda-Aahar for dietary food supplement.",
                evidence_citations=[cit_fssai],
                questions_to_verify=[
                    "Are claims therapeutic or dietary/wellness focused?",
                    "Is Schedule T GMP certified facility selected for manufacture?"
                ],
                official_resource_url="https://www.fssai.gov.in/"
            )
        ]

        return IPRPathResponse(
            product_name=request.product_name,
            target_market=request.target_market,
            ipr_nodes=nodes
        )

ipr_path_service = IPRPathService()
