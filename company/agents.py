"""CEO, Engineer, and Marketing agents for the autonomous company."""

from crewai import Agent

from company.file_tools import (
    add_task_to_backlog,
    append_to_agent_log,
    get_tasks_for_agent,
    read_backlog,
    read_product_spec,
    read_recent_logs,
    set_active_product,
    update_task_status,
    write_engineering_file,
    write_marketing_file,
    write_product_spec,
)
from company.llm_config import get_ceo_llm, get_engineer_llm, get_marketing_llm
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
]
ENGINEER_FILE_TOOLS = [
    read_backlog,
    get_tasks_for_agent,
    update_task_status,
    read_product_spec,
    write_engineering_file,
    append_to_agent_log,
    read_recent_logs,
]
MARKETING_FILE_TOOLS = [
    read_backlog,
    read_product_spec,
    write_marketing_file,
    append_to_agent_log,
    read_recent_logs,
]

# Web research for CEO and Marketing
WEB_TOOLS = [web_search_and_summarize]


def create_ceo_agent() -> Agent:
    """CEO: visionary, critic, ideation. Uses web research for market validation."""
    return Agent(
        role="CEO",
        goal="Come up with strong business ideas, define product vision, and critique what we are building. Ensure we build products that matter.",
        backstory="""You are the CEO of a small product company. You are a visionary who spots opportunities
        and defines clear product direction. You critique the work of the Engineer and Marketing teams
        to ensure quality and alignment with the vision. You use web research to validate ideas and
        understand the market. You communicate by writing product specs, adding tasks to the backlog,
        and logging your decisions. You set the active product and assign work to Engineer and Marketing.""",
        llm=get_ceo_llm(),
        tools=CEO_FILE_TOOLS + WEB_TOOLS,
        verbose=True,
        allow_delegation=False,
    )


def create_engineer_agent() -> Agent:
    """Engineer: implements CEO plans and Marketing requests, writes code and tests."""
    return Agent(
        role="Engineer",
        goal="Take assignments from the CEO and Marketing, implement them as code and tests, and ensure the best possible product quality.",
        backstory="""You are a skilled software engineer. You read the backlog for tasks assigned to you,
        implement features and fixes, write tests, and update task status. You work from product specs
        and ensure your code is clean, tested, and maintainable. You log your progress and decisions.
        You only write code within the product's engineering/ directory.""",
        llm=get_engineer_llm(),
        tools=ENGINEER_FILE_TOOLS,
        verbose=True,
        allow_delegation=False,
    )


def create_marketing_agent() -> Agent:
    """Marketing: growth-focused, creates campaigns and copy to drive traffic."""
    return Agent(
        role="Marketing",
        goal="Always think about how to get more people to visit and use our products. Create campaigns, landing pages, and growth experiments.",
        backstory="""You are a growth-focused marketer. You read product specs and engineering outputs,
        then create marketing assets: landing page copy, email drafts, social posts, and growth experiments.
        You use web research for market trends and competitor analysis. You write files into the product's
        marketing/ directory and log your reasoning. Your focus is always on driving traffic and engagement.""",
        llm=get_marketing_llm(),
        tools=MARKETING_FILE_TOOLS + WEB_TOOLS,
        verbose=True,
        allow_delegation=False,
    )
