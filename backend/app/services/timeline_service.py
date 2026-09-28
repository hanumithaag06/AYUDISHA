from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.schemas.schemas import TimelineResponse, TimelineEvent

class RegulationTimelineService:
    """Regulation Timeline feature: visualizes version progression & 'What Changed?' differences."""

    async def get_timeline(self, db: AsyncSession, document_id: str) -> TimelineResponse:
        # Provide detailed timeline for Biological Diversity Act / Drugs & Cosmetics / FSSAI
        if "bda" in document_id.lower() or "biodiversity" in document_id.lower():
            events = [
                TimelineEvent(
                    date="2003-02-05",
                    version="v1.0 (Original Act)",
                    title="Enactment of Biological Diversity Act, 2002",
                    change_summary="Established National Biodiversity Authority (NBA). Section 6 mandated prior approval for filing IPR derived from Indian biological resources.",
                    affected_sections=["Section 3", "Section 6", "Section 19"],
                    source_url="https://nbaindia.org/"
                ),
                TimelineEvent(
                    date="2014-11-21",
                    version="v1.1 (ABS Regulations 2014)",
                    title="Access and Benefit Sharing Guidelines Issued",
                    change_summary="Introduced structured Form I, Form II, Form III fees and benefit-sharing fee brackets (0.1% - 0.5% of ex-factory sales).",
                    affected_sections=["ABS Guidelines 2014"],
                    source_url="https://nbaindia.org/"
                ),
                TimelineEvent(
                    date="2024-04-01",
                    version="v2.0 (Biological Diversity Amendment Act 2023)",
                    title="Biological Diversity (Amendment) Act, 2023 Effective Date",
                    change_summary="Exempted codified traditional knowledge users and registered AYUSH practitioners from benefit-sharing obligations. Streamlined NBA approval process for Indian patent applicants.",
                    affected_sections=["Section 6 (Amended)", "Section 40"],
                    source_url="https://nbaindia.org/"
                )
            ]
            return TimelineResponse(
                document_id=document_id,
                document_title="Biological Diversity Act & Amendments Timeline",
                jurisdiction="India",
                events=events
            )
        else:
            events = [
                TimelineEvent(
                    date="1945-12-21",
                    version="v1.0",
                    title="Enactment of Drugs and Cosmetics Rules, 1945",
                    change_summary="Initial framework for regulating drugs and cosmetics in India.",
                    affected_sections=["Rule 151"],
                    source_url="https://www.ayush.gov.in/"
                ),
                TimelineEvent(
                    date="2006-08-10",
                    version="v1.5 (Schedule T Implementation)",
                    title="Mandatory GMP (Schedule T) for Ayurvedic Units",
                    change_summary="Made Good Manufacturing Practices mandatory for commercial Ayurvedic drugs manufacturing.",
                    affected_sections=["Schedule T", "Rule 157"],
                    source_url="https://www.ayush.gov.in/"
                ),
                TimelineEvent(
                    date="2022-05-05",
                    version="v2.0 (FSSAI Ayurveda Aahar Notification)",
                    title="FSSAI Ayurveda-Aahar Regulations 2022",
                    change_summary="Created distinct regulatory category for Ayurvedic food products, separating them from medicinal drugs under AYUSH SLA.",
                    affected_sections=["FSSAI Regulation 3", "Regulation 6"],
                    source_url="https://www.fssai.gov.in/"
                )
            ]
            return TimelineResponse(
                document_id=document_id,
                document_title="Ayurvedic Regulatory Framework & FSSAI Evolution Timeline",
                jurisdiction="India",
                events=events
            )

timeline_service = RegulationTimelineService()
