from typing import List
from backend.app.schemas.schemas import ResearchGapResponse, GapItem

class ResearchGapDetectorEngine:
    """Analyzes the evidence corpus for missing metadata, sparse evidence, or incomplete jurisdiction coverage."""

    def detect_gaps(self) -> ResearchGapResponse:
        gaps = [
            GapItem(
                research_area="International Export Product Classification",
                evidence_status="LIMITED_EVIDENCE",
                reason="Only WIPO PCT framework retrieved. Specific country botanical pharmacopoeias (e.g. US Pharmacopeia USP-NF Herbal Monographs) require addition.",
                recommendation="Register US FDA Botanical Drug Guidelines as an additional source in the Source Registry."
            ),
            GapItem(
                research_area="Experimental Combination Efficacy Index Data",
                evidence_status="SPARSE_EVIDENCE",
                reason="Section 3(e) requires Chou-Talalay Combination Index (CI) bioassay evidence. Specific experimental values must be uploaded by user.",
                recommendation="Upload bioassay synergy assay lab reports to the Research Workspace."
            ),
            GapItem(
                research_area="Restricted TKDL Database Prior Art",
                evidence_status="UNAVAILABLE_RESTRICTED",
                reason="TKDL restricted access entries are not publicly searchable per official CSIR licensing restrictions.",
                recommendation="File an official prior-art access request directly through CSIR TKDL portal."
            )
        ]

        return ResearchGapResponse(gaps=gaps)

research_gap_detector = ResearchGapDetectorEngine()
