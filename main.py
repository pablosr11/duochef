#!/usr/bin/env python3
"""Entry point for the autonomous 3-agent company."""

import os
import sys
import time

from dotenv import load_dotenv

from company.state_io import append_company_changelog, build_context_summary, ensure_state_tree
from company.tasks import create_company_crew

# Ensure imports work when running as script
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

load_dotenv()


def _parse_fallback_models(raw: str | None) -> list[str]:
    if not raw:
        return []
    parts = [p.strip() for p in raw.split(",")]
    return [p for p in parts if p]


def _should_try_next_model(exc: Exception) -> bool:
    msg = f"{exc}"
    retry_markers = [
        "No endpoints found",
        "NotFoundError",
        "RateLimitError",
        "429",
        "OpenRouterException",
        "temporarily rate-limited",
    ]
    return any(m in msg for m in retry_markers)


def run_cycle(cycle_num: int) -> None:
    """Run one idea → build → market cycle."""
    ensure_state_tree()
    context = build_context_summary()
    print(f"\n--- Cycle {cycle_num} ---")

    primary = os.getenv("OPENAI_MODEL_NAME", "")
    fallbacks = _parse_fallback_models(os.getenv("OPENAI_MODEL_FALLBACKS"))
    model_candidates = [m for m in [primary, *fallbacks] if m]

    for idx, model in enumerate(model_candidates or [primary]):
        if model:
            os.environ["OPENAI_MODEL_NAME"] = model
        try:
            crew = create_company_crew(context)
            result = crew.kickoff()
            print(f"\nCycle {cycle_num} result: {result}")
            append_company_changelog(
                title=f"Cycle {cycle_num}",
                details=(
                    f"Model used: {os.getenv('OPENAI_MODEL_NAME')}\n\n"
                    f"Result (raw):\n\n{result}\n"
                ),
            )
            return
        except Exception as e:
            if idx < len(model_candidates) - 1 and _should_try_next_model(e):
                next_model = model_candidates[idx + 1]
                print(f"Model failed: {model!r}. Retrying with fallback: {next_model!r}.")
                continue
            raise


def main() -> None:
    """Run the company loop with configurable cycles and delay."""
    max_cycles = os.getenv("MAX_CYCLES_PER_RUN")
    max_cycles = int(max_cycles) if max_cycles else None
    delay_sec = float(os.getenv("CYCLE_DELAY_SECONDS", "60"))

    ensure_state_tree()
    cycle = 1
    try:
        while True:
            run_cycle(cycle)
            if max_cycles and cycle >= max_cycles:
                print(f"Reached max cycles ({max_cycles}). Stopping.")
                break
            cycle += 1
            if delay_sec > 0:
                print(f"Sleeping {delay_sec}s before next cycle...")
                time.sleep(delay_sec)
    except KeyboardInterrupt:
        print("\nStopped by user.")


if __name__ == "__main__":
    main()
