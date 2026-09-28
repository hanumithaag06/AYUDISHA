from typing import List
from backend.app.schemas.schemas import KnowledgeGraphTraverseResponse, KnowledgeGraphNodeSchema, KnowledgeGraphEdgeSchema

class RegulatoryKnowledgeGraphEngine:
    """Builds and traverses dynamic regulatory dependency graphs."""

    def traverse_graph(self) -> KnowledgeGraphTraverseResponse:
        nodes = [
            KnowledgeGraphNodeSchema(id="n-prod", label="Polyherbal Formulation (Haridra + Nimba)", node_type="PRODUCT"),
            KnowledgeGraphNodeSchema(id="n-ing1", label="Haridra (Curcuma longa)", node_type="INGREDIENT"),
            KnowledgeGraphNodeSchema(id="n-ing2", label="Nimba (Azadirachta indica)", node_type="INGREDIENT"),
            KnowledgeGraphNodeSchema(id="n-tk", label="TKDL/AY/204 Prior Art (Charaka Samhita)", node_type="TK"),
            KnowledgeGraphNodeSchema(id="n-reg1", label="Indian Patents Act Sec 3(p) & 3(e)", node_type="REGULATION"),
            KnowledgeGraphNodeSchema(id="n-reg2", label="Biological Diversity Act Sec 6", node_type="REGULATION"),
            KnowledgeGraphNodeSchema(id="n-auth1", label="National Biodiversity Authority (NBA)", node_type="AUTHORITY"),
            KnowledgeGraphNodeSchema(id="n-auth2", label="AYUSH State Licensing Authority (SLA)", node_type="AUTHORITY"),
            KnowledgeGraphNodeSchema(id="n-jur", label="India Legal Framework", node_type="JURISDICTION")
        ]

        edges = [
            KnowledgeGraphEdgeSchema(id="e-1", source_id="n-prod", target_id="n-ing1", relationship="CONTAINS"),
            KnowledgeGraphEdgeSchema(id="e-2", source_id="n-prod", target_id="n-ing2", relationship="CONTAINS"),
            KnowledgeGraphEdgeSchema(id="e-3", source_id="n-ing1", target_id="n-tk", relationship="BELONGS_TO"),
            KnowledgeGraphEdgeSchema(id="e-4", source_id="n-prod", target_id="n-reg1", relationship="REQUIRES"),
            KnowledgeGraphEdgeSchema(id="e-5", source_id="n-prod", target_id="n-reg2", relationship="REQUIRES"),
            KnowledgeGraphEdgeSchema(id="e-6", source_id="n-reg2", target_id="n-auth1", relationship="APPLIES_TO"),
            KnowledgeGraphEdgeSchema(id="e-7", source_id="n-reg1", target_id="n-jur", relationship="BELONGS_TO")
        ]

        return KnowledgeGraphTraverseResponse(nodes=nodes, edges=edges)

knowledge_graph_engine = RegulatoryKnowledgeGraphEngine()
