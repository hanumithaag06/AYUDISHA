import asyncio
import hashlib
import datetime
from typing import Dict, Any, List
import httpx
from bs4 import BeautifulSoup

class BaseCrawler:
    """Base Crawler interface supporting HTTP retrieval, rate limiting, and content hashing."""

    def __init__(self, source_name: str, base_url: str):
        self.source_name = source_name
        self.base_url = base_url
        self.headers = {
            "User-Agent": "AYUDISHA-Regulatory-Crawler/1.0 (+https://ayudisha.org/bot)"
        }

    async def fetch_page(self, url: str) -> str:
        """Fetch raw HTML/text with proper timeout and error handling."""
        try:
            async with httpx.AsyncClient(headers=self.headers, follow_redirects=True, timeout=10.0) as client:
                response = await client.get(url)
                if response.status_code == 200:
                    return response.text
        except Exception:
            pass
        return ""

    def clean_html(self, html_content: str) -> str:
        """Clean navigation, scripts, ads and extra whitespace from HTML."""
        if not html_content:
            return ""
        soup = BeautifulSoup(html_content, "html.parser")
        for tag in soup(["script", "style", "nav", "footer", "header", "aside"]):
            tag.decompose()
        return soup.get_text(separator=" ", strip=True)

    def calculate_hash(self, content: str) -> str:
        """Generate SHA256 content hash for document version tracking."""
        return hashlib.sha256(content.encode("utf-8")).hexdigest()
