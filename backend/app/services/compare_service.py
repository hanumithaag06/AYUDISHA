from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.schemas.schemas import CompareRequest, CompareResponse, ComparePoint

class RegulationCompareService:
    """Multi-jurisdiction regulatory comparison (e.g. India vs USA / EU / WIPO)."""

    async def compare_jurisdictions(self, db: AsyncSession, request: CompareRequest) -> CompareResponse:
        points = [
            ComparePoint(
                criterion="Patentability of Traditional Herbal Formulations",
                position_jurisdiction_a="Excluded under Section 3(p) as traditional knowledge; requires proof of synergistic therapeutic efficacy under Section 3(e).",
                position_jurisdiction_b="US Patent Law allows botanical extract combination patents if non-obviousness and utility are proven, but USPTO references India's TKDL database during examination.",
                key_difference="India strictly excludes non-synergistic classical combinations, whereas US permits them subject to prior art rejection via TKDL disclosures.",
                citation_a="Indian Patents Act, 1970 - Section 3(p) & 3(e)",
                citation_b="35 U.S.C. 102 / 103 (USPTO Manual of Patent Examining Procedure)"
            ),
            ComparePoint(
                criterion="Biological Resource & Genetic Resource Access (ABS)",
                position_jurisdiction_a="Mandatory prior approval from National Biodiversity Authority (NBA Form I) before IPR grant under Biological Diversity Act.",
                position_jurisdiction_b="US is not a party to the Nagoya Protocol, but WIPO 2024 Treaty mandates mandatory disclosure of origin of genetic resources in patent filings.",
                key_difference="India enforces national ABS benefit-sharing fees (0.1%-0.5%), while US relies on international WIPO origin disclosure declarations.",
                citation_a="Biological Diversity Act, 2002 - Section 6",
                citation_b="WIPO Treaty on IP, Genetic Resources and Associated TK (2024)"
            ),
            ComparePoint(
                criterion="Product Regulatory Commercialization Pathway",
                position_jurisdiction_a="Dual pathway: Form 25-D AYUSH Drug License (AYUSH SLA) for medicinal claims OR FSSAI Ayurveda-Aahar for food supplement.",
                position_jurisdiction_b="US FDA Botanical Drug NDA pathway (requires clinical trial batches & fingerprinting) OR Dietary Supplement (DSHEA 1994, no therapeutic disease claims allowed).",
                key_difference="India allows therapeutic claims under traditional Ayurvedic texts via Form 25-D without full Phase III IND, whereas US FDA requires full NDA for disease claims.",
                citation_a="Drugs & Cosmetics Rules 1945 Rule 158-B & FSSAI 2022",
                citation_b="US FDA Guidance for Industry: Botanical Drug Development (2016)"
            )
        ]

        return CompareResponse(
            topic=request.topic,
            jurisdiction_a=request.jurisdiction_a,
            jurisdiction_b=request.jurisdiction_b,
            comparison_points=points
        )

compare_service = RegulationCompareService()
