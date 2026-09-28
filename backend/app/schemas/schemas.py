from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

class ChatRequest(BaseModel):
    query: str = Field(..., example="I have developed a polyherbal anti-diabetic formulation using Turmeric and Neem. How do I navigate Section 3(p) TKDL and Section 6 NBA approval?")
    jurisdiction: str = Field("Both", example="Both") # India, International, Both
    language: str = Field("en", example="en")
    temporal_year: Optional[int] = Field(None, example=2024)
    workspace_id: Optional[str] = None

class CitationSchema(BaseModel):
    id: str
    source_name: str
    organization: str
    document_title: str
    document_type: str
    jurisdiction: str
    publication_date: Optional[str] = None
    effective_date: Optional[str] = None
    version: str
    section: str
    page: Optional[int] = None
    source_url: str
    evidence_text: str

class ClaimVerification(BaseModel):
    claim_id: str
    claim_text: str
    verification_status: str # VERIFIED, PARTIALLY_SUPPORTED, UNSUPPORTED
    supporting_citation_id: Optional[str] = None

class ChatResponse(BaseModel):
    answer: str
    jurisdiction: str
    confidence: str # High evidence support, Moderate evidence support, Limited evidence support, Insufficient evidence
    confidence_score: float
    claims: List[ClaimVerification] = []
    citations: List[CitationSchema] = []
    related_documents: List[Dict[str, Any]] = []
    next_questions: List[str] = []
    disclaimer: str
    research_trail_id: str

class SearchRequest(BaseModel):
    query: str
    jurisdiction: Optional[str] = "Both"
    source_type: Optional[str] = None
    top_k: int = 5

class SearchResult(BaseModel):
    chunk_id: str
    source_name: str
    document_title: str
    section: str
    version: str
    jurisdiction: str
    source_url: str
    score: float
    content: str

class SearchResponse(BaseModel):
    query: str
    results: List[SearchResult]

class SourceSchema(BaseModel):
    id: str
    name: str
    organization: str
    base_url: str
    source_type: str
    jurisdiction: str
    language: str
    access_type: str
    parser_type: str
    enabled: bool
    last_crawled_at: Optional[str] = None
    document_count: int

class ClassificationRequest(BaseModel):
    product_name: str
    ingredients: List[str]
    formulation_type: str # Classical, Proprietary, Herb-Extract, Food
    intended_use: str

class ClassificationResponse(BaseModel):
    product_name: str
    classification_category: str
    confidence: str
    rationale: str
    retrieved_evidence: List[CitationSchema]
    regulatory_steps: List[str]

class IPRPathRequest(BaseModel):
    product_name: str
    description: str
    ingredients: List[str]
    target_market: str = "Both"

class IPRPathNode(BaseModel):
    step_id: str
    title: str
    status: str
    relevance_reason: str
    evidence_citations: List[CitationSchema]
    questions_to_verify: List[str]
    official_resource_url: str

class IPRPathResponse(BaseModel):
    product_name: str
    target_market: str
    ipr_nodes: List[IPRPathNode]

class TKLensRequest(BaseModel):
    search_term: str

class TKLensMatch(BaseModel):
    formulation_name: str
    sanskrit_name: str
    classical_text: str
    classification: str
    similarity_score: float
    evidence_snippet: str
    source_url: str

class TKLensResponse(BaseModel):
    search_term: str
    normalized_scientific_name: str
    status: str
    matches: List[TKLensMatch]
    explicit_disclaimer: str

class TimelineEvent(BaseModel):
    date: str
    version: str
    title: str
    change_summary: str
    affected_sections: List[str]
    source_url: str

class TimelineResponse(BaseModel):
    document_id: str
    document_title: str
    jurisdiction: str
    events: List[TimelineEvent]

class CompareRequest(BaseModel):
    topic: str
    jurisdiction_a: str = "India"
    jurisdiction_b: str = "USA"

class ComparePoint(BaseModel):
    criterion: str
    position_jurisdiction_a: str
    position_jurisdiction_b: str
    key_difference: str
    citation_a: Optional[str] = None
    citation_b: Optional[str] = None

class CompareResponse(BaseModel):
    topic: str
    jurisdiction_a: str
    jurisdiction_b: str
    comparison_points: List[ComparePoint]

# ----------------------------------------------------
# ADVANCED SPECIFICATION SCHEMAS
# ----------------------------------------------------
class FormulationFingerprintRequest(BaseModel):
    formulation_name: str
    ingredients: List[str]
    dosage_form: str # Capsule, Churna, Kwatha, Extract Syrup, Topical Cream
    preparation_method: str # Aqueous Extraction, Hydroalcoholic, Powdering
    intended_use: str # Anti-Diabetic, Anti-Inflammatory, Immunomodulatory
    traditional_terminology: Optional[str] = None

class FormulationFingerprintResponse(BaseModel):
    fingerprint_hash: str
    formulation_name: str
    botanical_entities: List[Dict[str, str]] # Sanskrit, Scientific, Common
    extracted_attributes: Dict[str, Any]
    matched_tkdl_prior_art: List[Dict[str, Any]]
    similarity_vector_id: str

class IPRRadarRequest(BaseModel):
    formulation_name: str
    ingredients: List[str]
    target_market: str = "Both"

class IPRRadarCategoryOverlap(BaseModel):
    category: str # Patent, Trademark, Design, GI, Copyright, TKDL, NBA ABS
    overlap_level: str # HIGH, MODERATE, LOW
    supporting_record: str
    similarity_score: float
    reason_for_flag: str
    relevant_source_url: str

class IPRRadarResponse(BaseModel):
    formulation_name: str
    overlaps: List[IPRRadarCategoryOverlap]
    disclaimer: str

class PriorArtExploreRequest(BaseModel):
    query_or_formulation: str
    search_dimensions: List[str] = ["ingredient", "therapeutic", "preparation", "patent_class"]

class PriorArtRecord(BaseModel):
    record_title: str
    record_type: str # PATENT_APPLICATION, TKDL_ENTRY, PUBLISHED_RESEARCH
    similarity_score: float
    matching_dimensions: List[str]
    evidence_snippet: str
    source_url: str

class PriorArtExploreResponse(BaseModel):
    query: str
    records: List[PriorArtRecord]

class RegulatorySimulateRequest(BaseModel):
    product_name: str
    current_category: str # Food / Ayurveda-Aahar
    proposed_category: str # Medicinal Drug (AYUSH SLA)
    current_market: str # Domestic India
    proposed_market: str # Export USA/EU

class RegulatorySimulateResponse(BaseModel):
    product_name: str
    attribute_changes: List[Dict[str, str]]
    recomputed_requirements: List[Dict[str, Any]]
    evidence_citations: List[CitationSchema]

class MissingEvidenceRequest(BaseModel):
    product_name: str
    provided_attributes: Dict[str, Any]

class MissingEvidenceResponse(BaseModel):
    product_name: str
    evidence_status: str # COMPLETE, INCOMPLETE
    missing_attributes: List[str]
    targeted_clarifying_questions: List[str]

class ContradictionItem(BaseModel):
    topic: str
    source_a_title: str
    source_a_requirement: str
    source_b_title: str
    source_b_requirement: str
    possible_explanation: str # Amendment, Category Difference, Jurisdiction Difference, Superseded Date
    source_a_url: str
    source_b_url: str

class ContradictionResponse(BaseModel):
    topic: str
    apparent_contradictions: List[ContradictionItem]

class UncertaintyDimension(BaseModel):
    research_area: str # Product Classification, TKDL, Patent Prior Art, Regulatory Requirement, International
    evidence_state: str # Strong, Moderate, Limited, Insufficient
    confidence_score: float
    main_reason: Optional[str] = None
    supporting_chunk_count: int

class UncertaintyMapResponse(BaseModel):
    dimensions: List[UncertaintyDimension]
    overall_assessment: str

class GapItem(BaseModel):
    research_area: str
    evidence_status: str
    reason: str
    recommendation: str

class ResearchGapResponse(BaseModel):
    gaps: List[GapItem]

class KnowledgeGraphNodeSchema(BaseModel):
    id: str
    label: str
    node_type: str # PRODUCT, INGREDIENT, TK, REGULATION, AUTHORITY, JURISDICTION

class KnowledgeGraphEdgeSchema(BaseModel):
    id: str
    source_id: str
    target_id: str
    relationship: str # CONTAINS, REQUIRES, APPLIES_TO, BELONGS_TO, SUPERSEDES

class KnowledgeGraphTraverseResponse(BaseModel):
    nodes: List[KnowledgeGraphNodeSchema]
    edges: List[KnowledgeGraphEdgeSchema]

class ResearchWorkspaceCreate(BaseModel):
    title: str
    description: Optional[str] = None

class AdminDashboardResponse(BaseModel):
    total_sources: int
    active_sources: int
    document_count: int
    version_count: int
    chunk_count: int
    failed_crawls: int
    retrieval_latency_ms: float
    citation_coverage_pct: float
    unsupported_claim_rate: float
    sources_health: List[Dict[str, Any]]
