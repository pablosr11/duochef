"""OpenRouter LLM configuration for CrewAI agents."""

import os

from crewai import LLM

OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"
DEFAULT_CHEAP_MODEL = "openrouter/meta-llama/llama-3.2-3b-instruct:free"


def get_openrouter_llm(
    model: str | None = None,
    temperature: float = 0.7,
    max_tokens: int = 4096,
) -> LLM:
    """Create a shared OpenRouter LLM for all agents.

    Uses OPENROUTER_API_KEY and OPENAI_MODEL_NAME from environment.
    Falls back to a cheap default model if not set.
    """
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        raise ValueError(
            "OPENROUTER_API_KEY must be set in .env for OpenRouter models"
        )

    model_name = (
        model
        or os.getenv("OPENAI_MODEL_NAME")
        or DEFAULT_CHEAP_MODEL
    )
    # Ensure openrouter/ prefix if user passed a bare model id
    if not model_name.startswith("openrouter/"):
        model_name = f"openrouter/{model_name}"

    base_url = os.getenv("OPENAI_API_BASE") or OPENROUTER_BASE_URL

    return LLM(
        model=model_name,
        base_url=base_url,
        api_key=api_key,
        temperature=temperature,
        max_tokens=max_tokens,
    )


def get_ceo_llm() -> LLM:
    """CEO uses a slightly more creative temperature for ideation."""
    return get_openrouter_llm(temperature=0.8)


def get_engineer_llm() -> LLM:
    """Engineer uses lower temperature for deterministic code."""
    return get_openrouter_llm(temperature=0.3)


def get_marketing_llm() -> LLM:
    """Marketing uses moderate creativity."""
    return get_openrouter_llm(temperature=0.6)
