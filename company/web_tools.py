"""Web research tools for CEO and Marketing agents."""

import warnings
from crewai.tools import tool

# Suppress the duckduckgo_search rename warning
warnings.filterwarnings("ignore", message="This package .* has been renamed to ddgs")

try:
    from duckduckgo_search import DDGS
except ImportError:
    DDGS = None


@tool("Web search and summarize")
def web_search_and_summarize(query: str, max_results: int = 5) -> str:
    """Search the web for the given query and return a concise summary of the top results.
    Use this for market research, idea validation, and competitive analysis.
    Do not paste large raw page content into logs; summarize key findings only."""
    if DDGS is None:
        return "Web search is not available (duckduckgo-search not installed)."
    try:
        with DDGS() as ddgs:
            results = list(ddgs.text(query, max_results=max_results))
    except Exception as e:
        return f"Search failed: {e}"
    if not results:
        return "No results found."
    summaries = []
    for i, r in enumerate(results[:max_results], 1):
        title = r.get("title", "Untitled")
        body = r.get("body", "")[:500]
        url = r.get("href", "")
        summaries.append(f"{i}. {title}\n   {body}\n   Source: {url}")
    return "\n\n".join(summaries)
