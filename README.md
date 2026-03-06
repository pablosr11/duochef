# Autonomous 3-Agent Company

A CrewAI-powered multi-agent "company" with three agents (CEO, Engineer, Marketing) that run autonomously in a loop, communicate via files, and use cheap OpenRouter models for all reasoning.

## Setup

1. **Create a virtual environment** (recommended):

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

2. **Install dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment**:

   Ensure your `.env` file contains:

   ```
   OPENROUTER_API_KEY=your_api_key
   OPENAI_API_BASE=https://openrouter.ai/api/v1
   OPENAI_MODEL_NAME=openrouter/meta-llama/llama-3.2-3b-instruct:free
   OPENAI_MODEL_FALLBACKS=openrouter/mistralai/mistral-7b-instruct,openrouter/qwen/qwen-2.5-7b-instruct
   ```

   You can override the model with any OpenRouter model ID. Free models may be rate-limited; if you see 429 errors, try a different model (e.g. `openrouter/mistralai/mistral-7b-instruct`) or use a paid model.

## Running the Company

Start the long-running loop:

```bash
python main.py
```

Optional environment variables:

- `MAX_CYCLES_PER_RUN` – cap the number of cycles (default: unlimited)
- `CYCLE_DELAY_SECONDS` – seconds to sleep between cycles (default: 60)
- `OPENAI_MODEL_NAME` – OpenRouter model for all agents
- `OPENAI_MODEL_FALLBACKS` – comma-separated fallback models to try automatically on common OpenRouter failures (e.g. 404/no endpoints, 429/rate-limits)

## File Structure

All agent communication and progress is persisted under `company_state/`:

- `company_state/backlog.json` – Kanban-style task list (id, title, description, assigned_to, status)
- `company_state/logs/ceo.md`, `engineer.md`, `marketing.md` – per-agent logs
- `company_state/products/<product_slug>/spec.md` – CEO product vision and requirements
- `company_state/products/<product_slug>/engineering/` – Engineer code and tests
- `company_state/products/<product_slug>/marketing/` – Marketing assets (copy, campaigns)

Inspect these files to see what your "company" is doing. Agents only write within `company_state/` and do not modify other project files.

## Tweaking

- **Model**: Change `OPENAI_MODEL_NAME` in `.env` to use a different OpenRouter model.
- **Agent behavior**: Edit `company/agents.py` to adjust goals, backstories, and constraints.
- **Task flow**: Edit `company/tasks.py` to change how tasks are wired and ordered.

## Plan and changelogs

- **`PLAN.md`**: The current implementation plan tracked in-repo.
- **`CHANGELOG.md`**: Repo changelog (updated whenever code/config changes).
- **`company_state/changelog.md`**: Runtime changelog appended automatically on every cycle/iteration.
