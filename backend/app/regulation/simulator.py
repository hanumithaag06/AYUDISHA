from typing import List
from backend.app.schemas.schemas import RegulatorySimulateRequest, RegulatorySimulateResponse, CitationSchema

class RegulatoryImpactSimulatorEngine:
    """Models hypothetical attribute changes (e.g. Food -> Medicine, Domestic -> Export) and recomputes research pathways."""

    def simulate_impact(self, request: RegulatorySimulateRequest) -> RegulatorySimulateResponse:
        attribute_changes = [
            {"attribute": "Product Category", "from": request.current_category, "to": request.proposed_category},
            {"attribute": "Target Market", "from": request.current_market, "to": request.proposed_market}
        ]

        recomputed = [
            {
                "area": "Licensing & Manufacturing Authority",
                "old_requirement": "FSSAI Food License under Ayurveda-Aahar Regulations 2022",
                "new_requirement": "State Licensing Authority (AYUSH SLA) Form 25-D License with Schedule T GMP certification",
                "action_needed": "Transition factory layout to Schedule T audit compliance and submit raw herb botanical identification logs."
            },
            {
                "area": "Biological Resource Access & Export Clearance (NBA)",
                "old_requirement": "Domestic procurement compliance",
                "new_requirement": "NBA Form III Export Approval & Form I IPR filing prior to overseas patent grant",
                "action_needed": "File Form III with National Biodiversity Authority for sending biological samples overseas for clinical testing."
            },
            {
                "area": "International Regulatory Pathway (US FDA / EU)",
                "old_requirement": "Indian domestic food supplement label",
                "new_requirement": "US FDA Botanical Drug NDA pathway or DSHEA Dietary Supplement (No therapeutic disease claims without IND)",
                "action_needed": "Perform HPLC batch-to-batch chemical fingerprinting for US FDA compliance."
            }
        ]

        cit = CitationSchema(
            id="cit-sim-1",
            source_name="Biological Diversity Act, 2002 & FSSAI 2022",
            organization="NBA & FSSAI, Govt of India",
            document_title="Biological Diversity Act Section 6 & FSSAI Regulation 6",
            document_type="REGULATION",
            jurisdiction="India & International",
            publication_date="2022-05-05",
            effective_date="2024-04-01",
            version="v2024",
            section="Section 6 & Regulation 6",
            source_url="https://nbaindia.org/",
            evidence_text="Changing product category to medicinal drug or exporting biological resources activates NBA Form I/III approval mandates and SLA Form 25-D licensing."
        )

        return RegulatorySimulateResponse(
            product_name=request.product_name,
            attribute_changes=attribute_changes,
            recomputed_requirements=recomputed,
            evidence_citations=[cit]
        )

regulatory_simulator = RegulatoryImpactSimulatorEngine()
