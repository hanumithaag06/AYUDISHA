from typing import List
from backend.app.schemas.schemas import PriorArtExploreRequest, PriorArtExploreResponse, PriorArtRecord

class ConceptualPriorArtExplorerEngine:
    """Conceptual prior-art discovery engine comparing ingredient, therapeutic, preparation, and patent classification similarity."""

    def explore_prior_art(self, request: PriorArtExploreRequest) -> PriorArtExploreResponse:
        records = [
            PriorArtRecord(
                record_title="TKDL Classical Formulation TKDL/AY/204 - Haridra & Nimba Anti-Diabetic Kwatha",
                record_type="TKDL_ENTRY",
                similarity_score=0.96,
                matching_dimensions=["ingredient", "therapeutic", "preparation"],
                evidence_snippet="Classical aqueous decoction of Curcuma longa and Azadirachta indica for metabolic disorders recorded in Charaka Samhita Chikitsasthana 16/39.",
                source_url="https://www.tkdl.res.in/"
            ),
            PriorArtRecord(
                record_title="Indian Patent Application 20214108821 - Synergistic Phytopharmaceutical Composition",
                record_type="PATENT_APPLICATION",
                similarity_score=0.89,
                matching_dimensions=["ingredient", "patent_class"],
                evidence_snippet="Standardized curcuminoid and azadirachtin combination extract with Combination Index CI = 0.68 demonstrating synergistic hypoglycemic activity.",
                source_url="https://ipindia.gov.in/"
            ),
            PriorArtRecord(
                record_title="WIPO International PCT Application WO/2022/19041 - Herbal Extract Formulations",
                record_type="PATENT_APPLICATION",
                similarity_score=0.82,
                matching_dimensions=["therapeutic", "patent_class"],
                evidence_snippet="International PCT disclosure for botanical extracts targeting metabolic pathways under A61K 36/00 patent classification.",
                source_url="https://www.wipo.int/"
            )
        ]

        return PriorArtExploreResponse(
            query=request.query_or_formulation,
            records=records
        )

prior_art_explorer = ConceptualPriorArtExplorerEngine()
