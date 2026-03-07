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
    msg = str(exc).lower()
    retry_markers = [
        "no endpoints found",
        "notfounderror",
        "ratelimiterror",
        "429",
        "500",
        "502",
        "503",
        "504",
        "openrouterexception",
        "temporarily rate-limited",
        "invalid response from llm",
        "none or empty",
        "internal server error",
        "api error",
    ]
    return any(m in msg for m in retry_markers)


def _print_session_summary(result) -> None:
    """Print a structured summary of the crew's execution."""
    print("\n" + "="*60)
    print("🚀 SESSION SUMMARY")
    print("="*60)
    
    if hasattr(result, 'tasks_output') and result.tasks_output:
        for i, task_output in enumerate(result.tasks_output, 1):
            agent_role = getattr(task_output, 'agent', 'Unknown Agent')
            # Handle if agent is an object with a role attribute
            if not isinstance(agent_role, str) and hasattr(agent_role, 'role'):
                agent_role = agent_role.role
            
            print(f"\n📍 Task {i}: {task_output.description[:100]}...")
            print(f"👤 Agent: {agent_role}")
            print(f"✅ Output: {task_output.raw[:300]}...")
            print("-" * 30)
    else:
        print(f"Final result: {result}")
        
    if hasattr(result, 'token_usage') and result.token_usage:
        usage = result.token_usage
        print(f"\n📊 Token Usage: {usage}")
    
    print("="*60 + "\n")


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
            
            # Print the detailed summary
            _print_session_summary(result)
            
            append_company_changelog(
                title=f"Cycle {cycle_num}",
                details=(
                    f"Model used: {os.getenv('OPENAI_MODEL_NAME')}\n\n"
                    f"Result (summary):\n\n{result.raw[:2000]}\n"
                ),
            )
            return
        except Exception as e:
            if idx < len(model_candidates) - 1 and _should_try_next_model(e):
                next_model = model_candidates[idx + 1]
                print(f"Model failed: {model!r}. Error: {e}")
                print(f"Retrying with fallback in 10s: {next_model!r}.")
                time.sleep(10)
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
