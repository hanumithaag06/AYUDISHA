import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "AYUDISHA"
    TAGLINE: str = "Where Ayurveda Meets IPR & Regulation"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Database Settings
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "sqlite+aiosqlite:///./ayudisha.db"
    )
    
    # LLM Settings
    OLLAMA_BASE_URL: str = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
    OLLAMA_MODEL: str = os.getenv("OLLAMA_MODEL", "qwen2.5:7b-instruct")
    
    # Data Storage Directories
    DATA_DIR: str = os.getenv("DATA_DIR", "./data")
    RAW_DIR: str = os.path.join(DATA_DIR, "raw")
    PROCESSED_DIR: str = os.path.join(DATA_DIR, "processed")
    CHUNKS_DIR: str = os.path.join(DATA_DIR, "chunks")
    EMBEDDINGS_DIR: str = os.path.join(DATA_DIR, "embeddings")
    
    # Supported Languages
    SUPPORTED_LANGUAGES: list[str] = [
        "en", "hi", "ta", "te", "ml", "kn", "bn", "mr", "gu", "sa"
    ]
    
    # Legal Guardrail Disclaimer
    LEGAL_DISCLAIMER: str = (
        "AYUDISHA provides information and research guidance based on retrieved sources. "
        "It does not provide legal advice. Further official verification is recommended."
    )

settings = Settings()

# Ensure data directories exist
os.makedirs(settings.RAW_DIR, exist_ok=True)
os.makedirs(settings.PROCESSED_DIR, exist_ok=True)
os.makedirs(settings.CHUNKS_DIR, exist_ok=True)
os.makedirs(settings.EMBEDDINGS_DIR, exist_ok=True)
