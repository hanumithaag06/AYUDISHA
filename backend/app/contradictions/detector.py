from typing import List
from backend.app.schemas.schemas import ContradictionResponse, ContradictionItem

class SourceContradictionDetectorEngine:
    """Identifies apparent contradictions between authoritative documents and explains date, amendment, or category rationale."""

    def detect_contradictions(self, topic: str) -> ContradictionResponse:
        contradictions = [
            ContradictionItem(
                topic="Benefit Sharing Obligation for Registered AYUSH Practitioners",
                source_a_title="Biological Diversity Act, 2002 (Original Section 6)",
                source_a_requirement="Mandatory ABS approval and benefit-sharing fee payment required for all users of Indian biological resources.",
                source_b_title="Biological Diversity (Amendment) Act, 2023 (Amended Section 6)",
                source_b_requirement="Registered AYUSH practitioners and codified traditional knowledge users are explicitly exempted from benefit-sharing fee obligations.",
                possible_explanation="Legislative Amendment: The 2023 Amendment Act (effective April 2024) superseded the 2002 provision for AYUSH practitioners, while commercial IPR applicants retain mandatory NBA Form I notification.",
                source_a_url="https://nbaindia.org/",
                source_b_url="https://nbaindia.org/"
            ),
            ContradictionItem(
                topic="Therapeutic Claims on Packaged Herbal Products",
                source_a_title="Drugs and Cosmetics Rules 1945 (Rule 158-B)",
                source_a_requirement="Therapeutic disease claims permitted under SLA Form 25-D License backed by textual Samhita citations or pilot safety trial data.",
                source_b_title="Food Safety and Standards (Ayurveda Aahar) Regulations 2022 (Regulation 6)",
                source_b_requirement="Mandatory front-of-pack advisory statement: 'Ayurveda Aahar product - Not for medicinal use'. Disease claims strictly prohibited.",
                possible_explanation="Product Category Difference: Drugs & Cosmetics governs medicinal drugs (AYUSH SLA), whereas FSSAI governs food/dietary products. The applicable requirement depends on product regulatory classification.",
                source_a_url="https://www.ayush.gov.in/",
                source_b_url="https://www.fssai.gov.in/"
            )
        ]

        return ContradictionResponse(
            topic=topic,
            apparent_contradictions=contradictions
        )

contradiction_detector = SourceContradictionDetectorEngine()
