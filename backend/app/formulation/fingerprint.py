import hashlib
import json
from typing import List, Dict, Any
from backend.app.schemas.schemas import FormulationFingerprintRequest, FormulationFingerprintResponse
from backend.app.services.terminology import normalizer

class FormulationFingerprintEngine:
    """Generates structured machine-searchable formulation fingerprints."""

    def generate_fingerprint(self, request: FormulationFingerprintRequest) -> FormulationFingerprintResponse:
        botanical_entities = []
        for ing in request.ingredients:
            norm = normalizer.normalize(ing)
            botanical_entities.append({
                "input_term": ing,
                "sanskrit_name": norm.get("sanskrit_name", ing),
                "scientific_name": norm.get("scientific_name", f"Botanical extract of {ing}"),
                "common_name": norm.get("common_name", ing)
            })

        extracted = {
            "dosage_form": request.dosage_form,
            "preparation_method": request.preparation_method,
            "intended_use": request.intended_use,
            "traditional_terminology": request.traditional_terminology or "Classical Samhita Terms"
        }

        # Compute deterministic fingerprint SHA256 hash
        fingerprint_raw = json.dumps({
            "name": request.formulation_name.lower(),
            "botanicals": sorted([b["scientific_name"] for b in botanical_entities]),
            "dosage": request.dosage_form.lower(),
            "prep": request.preparation_method.lower()
        })
        fp_hash = f"fp-{hashlib.sha256(fingerprint_raw.encode('utf-8')).hexdigest()[:12]}"

        matched_tkdl = [
            {
                "entry_id": "TKDL/AY/204",
                "title": "Classical Haridra-Nimba Synergistic Extract Formulations",
                "samhita": "Charaka Samhita Chikitsasthana 16/39",
                "similarity_score": 0.95
            }
        ]

        return FormulationFingerprintResponse(
            fingerprint_hash=fp_hash,
            formulation_name=request.formulation_name,
            botanical_entities=botanical_entities,
            extracted_attributes=extracted,
            matched_tkdl_prior_art=matched_tkdl,
            similarity_vector_id=f"vec-{fp_hash[:8]}"
        )

fingerprint_engine = FormulationFingerprintEngine()
