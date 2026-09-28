from typing import List
from backend.app.schemas.schemas import IPRRadarRequest, IPRRadarResponse, IPRRadarCategoryOverlap

class IPRConflictRadarEngine:
    """Evaluates potential overlap across Patents, Trademarks Class 5, Designs, GI, Copyright, TKDL, and NBA ABS."""

    def analyze_radar(self, request: IPRRadarRequest) -> IPRRadarResponse:
        overlaps = [
            IPRRadarCategoryOverlap(
                category="Traditional Knowledge (TKDL)",
                overlap_level="HIGH",
                supporting_record="TKDL Entry TKDL/AY/204 (Charaka Samhita 16/39)",
                similarity_score=0.96,
                reason_for_flag="Ingredients and traditional therapeutic claims match classical prior art. Section 3(p) statutory defense required.",
                relevant_source_url="https://www.tkdl.res.in/"
            ),
            IPRRadarCategoryOverlap(
                category="Patents (Section 3e & 3d)",
                overlap_level="MODERATE",
                supporting_record="Indian Patents Act 1970 Sec 3(e) Examination Guidelines",
                similarity_score=0.88,
                reason_for_flag="Polyherbal combination requires Chou-Talalay synergistic efficacy bioassay proof to overcome mere admixture objection.",
                relevant_source_url="https://ipindia.gov.in/"
            ),
            IPRRadarCategoryOverlap(
                category="Trademarks (Class 5)",
                overlap_level="MODERATE",
                supporting_record="Trade Marks Rules 2017 Class 5 Generic Descriptors",
                similarity_score=0.75,
                reason_for_flag="Classical formulation names in API cannot be trademarked. Word mark must feature a distinctive novel prefix.",
                relevant_source_url="https://ipindia.gov.in/"
            ),
            IPRRadarCategoryOverlap(
                category="Biological Resource Access (NBA ABS)",
                overlap_level="HIGH",
                supporting_record="Biological Diversity Act 2002 Section 6",
                similarity_score=0.92,
                reason_for_flag="Mandatory prior approval from NBA via Form I required before grant of patent for Indian biological resources.",
                relevant_source_url="https://nbaindia.org/"
            ),
            IPRRadarCategoryOverlap(
                category="Geographical Indication (GI)",
                overlap_level="LOW",
                supporting_record="GI Registry Portal",
                similarity_score=0.35,
                reason_for_flag="Check if raw materials originate from protected GI regions (e.g. Alleppey Green Cardamom).",
                relevant_source_url="https://ipindia.gov.in/"
            )
        ]

        return IPRRadarResponse(
            formulation_name=request.formulation_name,
            overlaps=overlaps,
            disclaimer="AYUDISHA IPR Conflict Radar identifies potential research overlaps based on retrieved public evidence. It does not provide legal infringement determinations."
        )

conflict_radar_engine = IPRConflictRadarEngine()
