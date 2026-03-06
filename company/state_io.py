"""File-based state and progress tracking for the agent company."""

import json
from datetime import datetime
from pathlib import Path

from company import (
    BACKLOG_FILE,
    COMPANY_STATE_DIR,
    LOGS_DIR,
    PRODUCTS_DIR,
)

STATE_ROOT = Path(COMPANY_STATE_DIR)
BACKLOG_PATH = STATE_ROOT / BACKLOG_FILE
LOGS_PATH = STATE_ROOT / LOGS_DIR
PRODUCTS_PATH = STATE_ROOT / PRODUCTS_DIR

DEFAULT_BACKLOG = {"tasks": [], "active_product": None, "next_id": 1}
CHANGELOG_PATH = STATE_ROOT / "changelog.md"


def ensure_state_tree() -> None:
    """Create company_state/ directory structure if it does not exist."""
    STATE_ROOT.mkdir(parents=True, exist_ok=True)
    LOGS_PATH.mkdir(parents=True, exist_ok=True)
    PRODUCTS_PATH.mkdir(parents=True, exist_ok=True)
    if not BACKLOG_PATH.exists():
        with open(BACKLOG_PATH, "w", encoding="utf-8") as f:
            json.dump(DEFAULT_BACKLOG, f, indent=2)


def load_backlog() -> dict:
    """Load backlog from company_state/backlog.json."""
    ensure_state_tree()
    if not BACKLOG_PATH.exists():
        return DEFAULT_BACKLOG.copy()
    with open(BACKLOG_PATH, encoding="utf-8") as f:
        return json.load(f)


def save_backlog(backlog: dict) -> None:
    """Persist backlog to company_state/backlog.json."""
    ensure_state_tree()  # Ensures dirs exist; does not recurse into save_backlog
    with open(BACKLOG_PATH, "w", encoding="utf-8") as f:
        json.dump(backlog, f, indent=2)


def add_task(
    title: str,
    description: str,
    assigned_to: str,
    status: str = "todo",
    product_slug: str | None = None,
) -> dict:
    """Add a task to the backlog and return the new task."""
    backlog = load_backlog()
    task_id = backlog.get("next_id", 1)
    task = {
        "id": task_id,
        "title": title,
        "description": description,
        "assigned_to": assigned_to,
        "status": status,
        "product_slug": product_slug,
        "created_at": datetime.now(datetime.UTC).isoformat(),
    }
    backlog["tasks"] = backlog.get("tasks", []) + [task]
    backlog["next_id"] = task_id + 1
    save_backlog(backlog)
    return task


def update_task_status(task_id: int, status: str) -> bool:
    """Update a task's status. Returns True if task was found."""
    backlog = load_backlog()
    for t in backlog.get("tasks", []):
        if t["id"] == task_id:
            t["status"] = status
            t["updated_at"] = datetime.now(datetime.UTC).isoformat()
            save_backlog(backlog)
            return True
    return False


def get_tasks_for(assigned_to: str, status: str | None = None) -> list[dict]:
    """Get tasks assigned to a given agent, optionally filtered by status."""
    backlog = load_backlog()
    tasks = [t for t in backlog.get("tasks", []) if t["assigned_to"] == assigned_to]
    if status:
        tasks = [t for t in tasks if t["status"] == status]
    return tasks


def set_active_product(slug: str | None) -> None:
    """Set the currently active product slug."""
    backlog = load_backlog()
    backlog["active_product"] = slug
    save_backlog(backlog)


def get_active_product() -> str | None:
    """Get the currently active product slug."""
    return load_backlog().get("active_product")


def product_dir(slug: str) -> Path:
    """Return the path to a product's directory."""
    path = PRODUCTS_PATH / slug
    path.mkdir(parents=True, exist_ok=True)
    return path


def product_spec_path(slug: str) -> Path:
    """Return the path to a product's spec.md."""
    return product_dir(slug) / "spec.md"


def product_engineering_dir(slug: str) -> Path:
    """Return the path to a product's engineering/ directory."""
    path = product_dir(slug) / "engineering"
    path.mkdir(parents=True, exist_ok=True)
    return path


def product_marketing_dir(slug: str) -> Path:
    """Return the path to a product's marketing/ directory."""
    path = product_dir(slug) / "marketing"
    path.mkdir(parents=True, exist_ok=True)
    return path


def log_path(agent: str) -> Path:
    """Return the path to an agent's log file."""
    ensure_state_tree()
    return LOGS_PATH / f"{agent}.md"


def append_log(agent: str, content: str) -> None:
    """Append a time-stamped entry to an agent's log."""
    ensure_state_tree()
    path = log_path(agent)
    timestamp = datetime.now(datetime.UTC).strftime("%Y-%m-%d %H:%M:%S UTC")
    entry = f"\n## {timestamp}\n\n{content}\n"
    with open(path, "a", encoding="utf-8") as f:
        f.write(entry)


def append_company_changelog(title: str, details: str) -> None:
    """Append an entry to company_state/changelog.md for each cycle/iteration."""
    ensure_state_tree()
    timestamp = datetime.now(datetime.UTC).strftime("%Y-%m-%d %H:%M:%S UTC")
    entry = f"\n## {timestamp} — {title}\n\n{details}\n"
    if not CHANGELOG_PATH.exists():
        CHANGELOG_PATH.write_text("# Company State Changelog\n\n", encoding="utf-8")
    with open(CHANGELOG_PATH, "a", encoding="utf-8") as f:
        f.write(entry)


def read_log(agent: str, max_entries: int = 10) -> str:
    """Read the last N entries from an agent's log (approximate)."""
    path = log_path(agent)
    if not path.exists():
        return ""
    text = path.read_text(encoding="utf-8")
    sections = [s.strip() for s in text.split("## ") if s.strip()]
    if not sections:
        return ""
    recent = sections[-max_entries:] if len(sections) >= max_entries else sections
    return "\n\n## ".join([""] + recent)


def read_spec(slug: str) -> str:
    """Read a product spec. Returns empty string if missing."""
    path = product_spec_path(slug)
    if not path.exists():
        return ""
    return path.read_text(encoding="utf-8")


def write_spec(slug: str, content: str) -> None:
    """Write a product spec."""
    path = product_spec_path(slug)
    path.write_text(content, encoding="utf-8")


def write_engineering_file(slug: str, filename: str, content: str) -> Path:
    """Write a file in the product's engineering/ directory."""
    base = product_engineering_dir(slug)
    path = base / filename
    path.write_text(content, encoding="utf-8")
    return path


def write_marketing_file(slug: str, filename: str, content: str) -> Path:
    """Write a file in the product's marketing/ directory."""
    base = product_marketing_dir(slug)
    path = base / filename
    path.write_text(content, encoding="utf-8")
    return path


def build_context_summary() -> str:
    """Build a shared context string for the crew (recent logs, active product, backlog)."""
    parts = []
    backlog = load_backlog()
    active = backlog.get("active_product")
    if active:
        parts.append(f"Active product: {active}")
        spec = read_spec(active)
        if spec:
            parts.append(f"Product spec:\n{spec[:2000]}{'...' if len(spec) > 2000 else ''}")
    tasks = backlog.get("tasks", [])
    todo = [t for t in tasks if t["status"] in ("todo", "in_progress")]
    if todo:
        parts.append("Backlog (todo/in_progress):")
        for t in todo[:15]:
            parts.append(f"  - [{t['id']}] {t['title']} (-> {t['assigned_to']}, {t['status']})")
    for agent in ("ceo", "engineer", "marketing"):
        log = read_log(agent, max_entries=3)
        if log:
            parts.append(f"Recent {agent} log:\n{log[:800]}{'...' if len(log) > 800 else ''}")
    return "\n\n".join(parts)
