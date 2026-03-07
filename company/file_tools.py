"""CrewAI tools wrapping state_io for file-based communication."""

from crewai.tools import tool

from company import state_io


@tool("Read backlog")
def read_backlog() -> str:
    """Read the current task backlog (tasks, active product)."""
    data = state_io.load_backlog()
    tasks = data.get("tasks", [])
    active = data.get("active_product", "none")
    lines = [f"Active product: {active}", ""]
    for t in tasks:
        lines.append(f"[{t['id']}] {t['title']} -> {t['assigned_to']} ({t['status']})")
        lines.append(f"  {t.get('description', '')[:200]}")
    return "\n".join(lines) if lines else "Backlog is empty."


@tool("Add task to backlog")
def add_task_to_backlog(
    title: str,
    description: str,
    assigned_to: str,
    product_slug: str | None = None,
) -> str:
    """Add a new task to the backlog. assigned_to must be 'engineer' or 'marketing'."""
    if assigned_to not in ("engineer", "marketing"):
        return f"assigned_to must be 'engineer' or 'marketing', got '{assigned_to}'"
    task = state_io.add_task(title, description, assigned_to, product_slug=product_slug)
    return f"Added task {task['id']}: {title} (-> {assigned_to})"


@tool("Update task status")
def update_task_status(task_id: int, status: str) -> str:
    """Update a task's status. status: todo, in_progress, done."""
    if status not in ("todo", "in_progress", "done"):
        return f"status must be todo, in_progress, or done, got '{status}'"
    ok = state_io.update_task_status(task_id, status)
    return f"Task {task_id} -> {status}" if ok else f"Task {task_id} not found"


@tool("Read product spec")
def read_product_spec(product_slug: str) -> str:
    """Read the product specification for a given product slug."""
    content = state_io.read_spec(product_slug)
    return content or f"No spec found for '{product_slug}'"


@tool("Write product spec")
def write_product_spec(product_slug: str, content: str) -> str:
    """Write or overwrite the product specification."""
    state_io.write_spec(product_slug, content)
    return f"Wrote spec for {product_slug}"


@tool("Set active product")
def set_active_product(product_slug: str | None) -> str:
    """Set the currently active product. Pass None or empty to clear."""
    state_io.set_active_product(product_slug or None)
    return f"Active product set to {product_slug or 'none'}"


@tool("Write engineering file")
def write_engineering_file(product_slug: str, filename: str, content: str) -> str:
    """Write a code or test file in the product's engineering/ directory."""
    path = state_io.write_engineering_file(product_slug, filename, content)
    return f"Wrote {path}"


@tool("Write marketing file")
def write_marketing_file(product_slug: str, filename: str, content: str) -> str:
    """Write a marketing asset (copy, campaign, etc.) in the product's marketing/ directory."""
    path = state_io.write_marketing_file(product_slug, filename, content)
    return f"Wrote {path}"


@tool("Append to agent log")
def append_to_agent_log(agent: str, content: str) -> str:
    """Append an entry to an agent's log. agent: ceo, marketing, or an engineer identifier like engineer_1."""
    # Sanitize name: lowercase and replace spaces with underscores
    log_name = agent.lower().replace(" ", "_")
    state_io.append_log(log_name, content)
    return f"Logged to {log_name}.md"


@tool("Read recent logs")
def read_recent_logs(agent: str, max_entries: int = 5) -> str:
    """Read recent log entries for an agent. agent: identifier like ceo, marketing, or engineer_1."""
    log_name = agent.lower().replace(" ", "_")
    return state_io.read_log(log_name, max_entries=max_entries) or "No logs yet."


@tool("Read engineering file")
def read_engineering_file(product_slug: str, filename: str) -> str:
    """Read a code or test file from the product's engineering/ directory."""
    try:
        content = state_io.read_engineering_file(product_slug, filename)
        return content or f"File {filename} is empty."
    except Exception as e:
        return f"Error reading {filename}: {str(e)}"


@tool("Read marketing file")
def read_marketing_file(product_slug: str, filename: str) -> str:
    """Read a marketing asset from the product's marketing/ directory."""
    try:
        content = state_io.read_marketing_file(product_slug, filename)
        return content or f"File {filename} is empty."
    except Exception as e:
        return f"Error reading {filename}: {str(e)}"


@tool("Get tasks for agent")
def get_tasks_for_agent(assigned_to: str, status: str | None = None) -> str:
    """Get tasks assigned to engineer, marketing, or qa, optionally filtered by status."""
    tasks = state_io.get_tasks_for(assigned_to, status)
    if not tasks:
        return f"No tasks for {assigned_to}" + (f" with status {status}" if status else "")
    lines = []
    for t in tasks:
        lines.append(f"[{t['id']}] {t['title']} - {t['status']}")
        lines.append(f"  {t.get('description', '')}")
    return "\n".join(lines)
