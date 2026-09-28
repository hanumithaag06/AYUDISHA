from typing import List, Dict, Any
from backend.app.schemas.schemas import MissingEvidenceRequest, MissingEvidenceResponse

class MissingEvidenceEngine:
    """Identifies missing product attributes or evidence gaps and generates targeted research questions."""

    def analyze_missing(self, request: MissingEvidenceRequest) -> MissingEvidenceResponse:
        provided = request.provided_attributes or {}
        missing = []
        questions = []

        if "dosage_form" not in provided:
            missing.append("Dosage Form (e.g. Capsule, Churna, Kwatha, Extract)")
            questions.append("Is the product formulated as a classical Churna/Kwatha or a modern standardized extract capsule?")

        if "intended_use" not in provided:
            missing.append("Intended Therapeutic / Dietary Use")
            questions.append("Are you making therapeutic disease claims (requiring AYUSH Form 25-D) or dietary wellness claims (under FSSAI Ayurveda-Aahar)?")

        if "biological_source_origin" not in provided:
            missing.append("Biological Resource Geographical Origin")
            questions.append("Were the botanical raw herbs harvested within India, or imported from overseas?")

        status = "INCOMPLETE" if missing else "COMPLETE"

        if not missing:
            questions.append("All primary attributes provided. Ready for IPR Path & Conflict Radar generation.")

        return MissingEvidenceResponse(
            product_name=request.product_name,
            evidence_status=status,
            missing_attributes=missing,
            targeted_clarifying_questions=questions
        )

missing_evidence_engine = MissingEvidenceEngine()
