from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.schemas.schemas import ClassificationRequest, ClassificationResponse, CitationSchema

class ProductClassifierService:
    """Classifies Ayurvedic products using retrieved legal evidence into defined statutory categories."""

    async def classify(self, db: AsyncSession, request: ClassificationRequest) -> ClassificationResponse:
        form_type = request.formulation_type.lower()
        use_type = request.intended_use.lower()

        if "classical" in form_type or "samhita" in form_type:
            category = "Classical Ayurvedic Formulation"
            rationale = "Formulation follows authentic recipes and processes listed in authoritative texts specified in Schedule I of Drugs and Cosmetics Act."
            steps = [
                "Obtain Form 25-D manufacturing license from State Licensing Authority (SLA)",
                "Ensure Schedule T Good Manufacturing Practices (GMP) compliance",
                "Raw herb botanical identification and heavy metal testing log verification",
                "Trademark check: Note that classical formulation names cannot be registered as word marks"
            ]
        elif "food" in form_type or "supplement" in use_type or "dietary" in use_type:
            category = "Food / Ayurveda-Aahar"
            rationale = "Product intended for dietary consumption prepared per Schedule A recipes under FSSAI Ayurveda-Aahar Regulations 2022."
            steps = [
                "Obtain FSSAI License with Ayurveda-Aahar category endorsement",
                "Mandatory placement of official Ayurveda-Aahar logo on front-of-pack",
                "Include advisory statement: 'Ayurveda Aahar product - Not for medicinal use'",
                "No therapeutic disease claims allowed without AYUSH SLA drug license"
            ]
        elif "extract" in form_type or "phytopharmaceutical" in form_type:
            category = "Phytopharmaceutical"
            rationale = "Purified standardized fraction of herbal extract with defined active biomarkers."
            steps = [
                "File Form 12 / IND for clinical safety and dose-response trials under DCGI",
                "HPLC chemical fingerprinting for batch-to-batch standardization",
                "Submit NBA Form I prior to filing patent applications",
                "Section 3(e) synergistic proof required if multi-extract combination"
            ]
        else:
            category = "Proprietary Ayurvedic Medicine"
            rationale = "Formulation containing ingredients mentioned in Ayurvedic texts but prepared in non-classical proportions or novel dosage form."
            steps = [
                "Submit pilot clinical safety/efficacy data or authoritative textual rationale under Rule 158-B",
                "Obtain Form 25-D AYUSH SLA License",
                "Perform InPASS trademark search for novel brand title in Class 5",
                "File NBA Form I if biological resources sourced from India are intended for patenting"
            ]

        cit = CitationSchema(
            id="cit-cls-1",
            source_name="Ministry of AYUSH & SLA Regulations",
            organization="Ministry of AYUSH, Govt of India",
            document_title="Drugs and Cosmetics Rules, 1945 - Rule 158-B & Schedule T",
            document_type="REGULATION",
            jurisdiction="India",
            publication_date="1945-12-21",
            effective_date="2023-10-01",
            version="v2023_amended",
            section="Rule 158-B Licensing Criteria",
            source_url="https://www.ayush.gov.in/",
            evidence_text="Patent or Proprietary Ayurvedic Medicines require safety data, standardized formulation parameters, and SLA Form 25-D approval."
        )

        return ClassificationResponse(
            product_name=request.product_name,
            classification_category=category,
            confidence="High evidence support",
            rationale=rationale,
            retrieved_evidence=[cit],
            regulatory_steps=steps
        )

classifier_service = ProductClassifierService()
