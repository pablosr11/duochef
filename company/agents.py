"""CEO, Engineer, and Marketing agents for the autonomous company."""

from crewai import Agent

from company.file_tools import (
    add_task_to_backlog,
    append_to_agent_log,
    get_tasks_for_agent,
    read_backlog,
    read_engineering_file,
    read_marketing_file,
    read_product_spec,
    read_recent_logs,
    set_active_product,
    update_task_status,
    write_engineering_file,
    write_marketing_file,
    write_product_spec,
)
from company.git_tools import git_push_to_remote, git_set_remote
from company.llm_config import (
    get_ceo_llm,
    get_engineer_llm,
    get_marketing_llm,
    get_qa_llm,
)
from company.web_tools import web_search_and_summarize

# Shared file tools for all agents
CEO_FILE_TOOLS = [
    read_backlog,
    add_task_to_backlog,
    write_product_spec,
    set_active_product,
    append_to_agent_log,
    read_recent_logs,
    read_product_spec,
    read_engineering_file, # CEO can review
    read_marketing_file,
]
ENGINEER_FILE_TOOLS = [
    read_backlog,
    get_tasks_for_agent,
    update_task_status,
    read_product_spec,
    read_engineering_file,
    write_engineering_file,
    append_to_agent_log,
    read_recent_logs,
    git_push_to_remote,
    git_set_remote,
]
MARKETING_FILE_TOOLS = [
    read_backlog,
    read_product_spec,
    read_marketing_file,
    write_marketing_file,
    append_to_agent_log,
    read_recent_logs,
    git_push_to_remote,
]
QA_FILE_TOOLS = [
    read_backlog,
    get_tasks_for_agent,
    update_task_status,
    read_product_spec,
    read_engineering_file,
    read_marketing_file,
    append_to_agent_log,
    read_recent_logs,
]

# Web research for CEO, Marketing, and QA
WEB_TOOLS = [web_search_and_summarize]


def create_ceo_agent() -> Agent:
    """CEO: Strategic lead, prioritizes shipping over investigation."""
    return Agent(
        role="CEO",
        goal="Lead the company to a successful product launch. Prioritize shipping functional code and live assets over content volume or market research.",
        backstory="""You are a high-stakes startup CEO. You believe that 
        'Shipping is the only feature.' You keep the team focused on the core 
        product engine and waitlist. You are allergic to repetitive brainstorming and 
        will delete or consolidate tasks that don't directly lead to a better app or website.
        You measure success by the number of bugs fixed and live links working.""",
        llm=get_ceo_llm(),
        tools=CEO_FILE_TOOLS + WEB_TOOLS,
        verbose=True,
        allow_delegation=True,
    )


def create_engineer_agent(name: str = "Engineer") -> Agent:
    """Engineer: Implementation lead, focuses on robust product plumbing."""
    return Agent(
        role=f"{name}",
        goal="Build the technical foundation of the product. Prioritize the app engine, persistence, and deployment scripts over lesson content.",
        backstory=f"""You are {name}, a Senior Full-Stack Engineer who hates bloat. 
        You follow the product spec strictly. If the app doesn't build, 
        you don't write new recipes. You prioritize the 'Interactive Engine' 
        and 'Waitlist logic' as the #1 technical goals. You use small, 
        modular files and document how to run your code.""",
        llm=get_engineer_llm(),
        tools=ENGINEER_FILE_TOOLS,
        verbose=True,
        allow_delegation=False,
    )


def create_marketing_agent() -> Agent:
    """Marketing: Growth lead, focuses on live assets and conversion."""
    return Agent(
        role="Marketing",
        goal="Drive signups for the active product. Prioritize live landing page assets and waitlist conversion over strategy documents.",
        backstory="""You are a growth-focused marketer. You believe in 
        'Direct Response.' If it's not a live HTML file or a tracked ad, 
        it doesn't exist. You spend less time 'researching' and more time 
        improving the copy on the actual landing page. Your KPI is the 
        functionality and clarity of the waitlist.""",
        llm=get_marketing_llm(),
        tools=MARKETING_FILE_TOOLS + WEB_TOOLS,
        verbose=True,
        allow_delegation=False,
    )


def create_qa_agent() -> Agent:
    """QA: Verification lead, focuses on 'The Definition of Done'."""
    return Agent(
        role="QA",
        goal="Verify that every shipped feature actually works for the end-user. Be the gatekeeper of quality.",
        backstory="""You are a meticulous QA Engineer. Your only metric for 
        success is a bug-free production site. You read the spec and 
        peer-review code/copy. If a feature is broken, you add a corrective 
        engineering task immediately. You don't tolerate 'finishing touches' 
        placeholders on live sites.""",
        llm=get_qa_llm(),
        tools=QA_FILE_TOOLS + WEB_TOOLS,
        verbose=True,
        allow_delegation=False,
    )
