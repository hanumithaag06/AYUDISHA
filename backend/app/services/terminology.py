from typing import Dict, Any, Optional

TERMINOLOGY_DATABASE = [
    {
        "local_name": "Haldi",
        "sanskrit_name": "Haridra",
        "regional_name": "Manjal (Tamil), Pasupu (Telugu), Turmeric (English)",
        "scientific_name": "Curcuma longa",
        "common_name": "Turmeric",
        "category": "HERB",
        "synonyms": ["haldi", "haridra", "turmeric", "curcuma longa", "curcumin", "manjal", "pasupu"],
        "tkdl_entries": ["TKDL/AY/204"],
        "ip_notes": "Prior art disclosed in TKDL for anti-inflammatory & anti-diabetic uses."
    },
    {
        "local_name": "Neem",
        "sanskrit_name": "Nimba",
        "regional_name": "Veppam (Tamil), Vepa (Telugu), Margosa (English)",
        "scientific_name": "Azadirachta indica",
        "common_name": "Neem",
        "category": "HERB",
        "synonyms": ["neem", "nimba", "veppam", "vepa", "azadirachta indica", "margosa"],
        "tkdl_entries": ["TKDL/AY/189"],
        "ip_notes": "EPO/USPTO patent revocations based on TKDL traditional prior art."
    },
    {
        "local_name": "Ashwagandha",
        "sanskrit_name": "Ashwagandha",
        "regional_name": "Amukkara (Tamil), Winter Cherry (English)",
        "scientific_name": "Withania somnifera",
        "common_name": "Indian Ginseng / Winter Cherry",
        "category": "HERB",
        "synonyms": ["ashwagandha", "amukkara", "withania somnifera", "winter cherry", "asgandh"],
        "tkdl_entries": ["TKDL/AY/512"],
        "ip_notes": "Requires Section 6 NBA approval if exported or patented."
    },
    {
        "local_name": "Amla",
        "sanskrit_name": "Amalaki",
        "regional_name": "Nellikai (Tamil), Usiri (Telugu), Indian Gooseberry (English)",
        "scientific_name": "Phyllanthus emblica",
        "common_name": "Indian Gooseberry",
        "category": "HERB",
        "synonyms": ["amla", "amalaki", "nellikai", "usiri", "phyllanthus emblica", "emblica officinalis"],
        "tkdl_entries": ["TKDL/AY/108"],
        "ip_notes": "Classical ingredient in Triphala and Chyawanprash. Non-trademarkable."
    },
    {
        "local_name": "Tulsi",
        "sanskrit_name": "Tulasi",
        "regional_name": "Thulasi (Tamil), Holy Basil (English)",
        "scientific_name": "Ocimum sanctum",
        "common_name": "Holy Basil",
        "category": "HERB",
        "synonyms": ["tulsi", "tulasi", "thulasi", "ocimum sanctum", "ocimum tenuiflorum", "holy basil"],
        "tkdl_entries": ["TKDL/AY/330"],
        "ip_notes": "Widely documented in Charaka Samhita. Sec 3(p) defense applies."
    }
]

class TerminologyNormalizer:
    """Normalizes botanical, Ayurvedic, regional, and scientific terms across languages."""

    def normalize(self, text: str) -> Dict[str, Any]:
        text_lower = text.lower()
        for entry in TERMINOLOGY_DATABASE:
            for syn in entry["synonyms"]:
                if syn in text_lower:
                    return {
                        "normalized_found": True,
                        "search_term": syn,
                        "local_name": entry["local_name"],
                        "sanskrit_name": entry["sanskrit_name"],
                        "regional_name": entry["regional_name"],
                        "scientific_name": entry["scientific_name"],
                        "common_name": entry["common_name"],
                        "category": entry["category"],
                        "tkdl_entries": entry["tkdl_entries"],
                        "ip_notes": entry["ip_notes"]
                    }
        return {
            "normalized_found": False,
            "search_term": text,
            "local_name": text,
            "sanskrit_name": text,
            "regional_name": text,
            "scientific_name": f"Botanical extract of {text}",
            "common_name": text,
            "category": "HERBAL_COMPOUND",
            "tkdl_entries": [],
            "ip_notes": "No explicit botanical normalization found in dictionary. Querying live statutory DB."
        }

normalizer = TerminologyNormalizer()
