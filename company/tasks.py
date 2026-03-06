"""CrewAI tasks and crew for the autonomous company."""

from crewai import Crew, Process, Task

from company.agents import (
    create_ceo_agent,
    create_engineer_agent,
    create_marketing_agent,
)


def create_ideation_task(ceo_agent, context: str) -> Task:
    """CEO: ideation, critique, and backlog management."""
    return Task(
        description=f"""You are the CEO. Review the current company state and decide what to do next.

Context from the company state:
{context}

Your responsibilities:
1. If there is no active product or the current product needs a new direction: propose a product idea, write a spec (use write_product_spec), set it as active (set_active_product), and add tasks for the Engineer and Marketing (add_task_to_backlog).
2. If there is an active product: critique the current direction. Read recent logs from Engineer and Marketing. If their work is off-track, add corrective tasks. If it looks good, add follow-up tasks to improve or expand.
3. Use web_search_and_summarize for market research when validating ideas or understanding competitors.
4. Always append_to_agent_log(agent='ceo', content=...) to record your decisions and rationale.

Be decisive. Prioritize one clear product at a time. Assign tasks to 'engineer' or 'marketing' with clear titles and descriptions. IMPORTANT: Do NOT call multiple tools in a single turn. Call ONE tool, wait for the observation, then proceed.""",
        expected_output="A brief summary of what you decided: product direction, tasks added, and key critique points. Logged to ceo.md.",
        agent=ceo_agent,
        context=[],
    )


def create_engineering_task(engineer_agent, context: str) -> Task:
    """Engineer: implement backlog tasks, write code and tests."""
    name = engineer_agent.role
    return Task(
        description=f"""You are {name}. Implement tasks assigned to 'engineer' in the backlog.

Context from the company state:
{context}

Your responsibilities:
1. Call get_tasks_for_agent(assigned_to='engineer', status='todo') to get available tasks.
2. IMPORTANT: If there are multiple engineers working in parallel, check the latest backlog again or pick a task that isn't already being worked on.
3. For EACH task, you MUST follow this EXACT sequence one by one:
    a. update_task_status(task_id, 'in_progress')
    b. Read the product spec to understand requirements.
    c. Implement the work by calling write_engineering_file(product_slug, filename, content) for EACH file you create.
    d. update_task_status(task_id, 'done')
4. IMPORTANT: Do NOT try to output multiple files or status updates in a single turn. Call ONE tool, wait for the observation, then call the next tool.
5. Write clean, tested code. Prefer small, focused files.
6. Append to your log (append_to_agent_log(agent='engineer', content=...)) AFTER you finish each task or if you get blocked.

If there are no tasks, summarize that and suggest what the CEO might add. Still log your check.""",
        expected_output=f"A summary of tasks completed by {name}. Code written to company_state/products/<slug>/engineering/. Logged to engineer.md.",
        agent=engineer_agent,
        context=[],
    )


def create_marketing_task(marketing_agent, context: str) -> Task:
    """Marketing: create campaigns and growth assets."""
    return Task(
        description=f"""You are the Marketing lead. Create assets to drive traffic and engagement.

Context from the company state:
{context}

Your responsibilities:
1. Check get_tasks_for_agent(assigned_to='marketing', status='todo') for marketing tasks.
2. Read the active product spec. Create marketing assets: landing page copy, email drafts, social posts, growth experiments. Use write_marketing_file to save them.
3. Use web_search_and_summarize for market trends, competitor positioning, or audience research when helpful.
4. Append to your log (append_to_agent_log(agent='marketing', content=...)) with what you created and why.

If there are no tasks, still create at least one useful marketing asset (e.g. landing_page.md) for the active product if one exists. Focus on how to get more people to visit and use the product. IMPORTANT: Do NOT call multiple tools in a single turn. Call ONE tool, wait for the observation, then proceed.""",
        expected_output="A summary of marketing assets created. Files in company_state/products/<slug>/marketing/. Logged to marketing.md.",
        agent=marketing_agent,
        context=[],
    )


def create_summary_task(ceo_agent, context: str) -> Task:
    """CEO: Final summary of the cycle's progress."""
    return Task(
        description=f"""You are the CEO. Review the work done by the Engineers and Marketing in this cycle.
        
Context:
{context}

Provide a high-level summary of the achievements in this cycle and what the focus should be for the next cycle.
        """,
        expected_output="A final high-level summary of the cycle's progress and next steps.",
        agent=ceo_agent,
        context=[],
    )


def create_company_crew(context: str) -> Crew:
    """Create and return a Crew with CEO, two Engineers, and Marketing tasks."""
    ceo = create_ceo_agent()
    engineer1 = create_engineer_agent(name="Engineer 1")
    engineer2 = create_engineer_agent(name="Engineer 2")
    marketing = create_marketing_agent()

    ideation = create_ideation_task(ceo, context)
    
    # Enable async_execution for parallel work
    engineering1 = create_engineering_task(engineer1, context)
    engineering1.async_execution = True
    
    engineering2 = create_engineering_task(engineer2, context)
    engineering2.async_execution = True
    
    marketing_task = create_marketing_task(marketing, context)
    marketing_task.async_execution = True
    
    summary = create_summary_task(ceo, context)

    # When async_execution is True, the crew will start these tasks concurrently.
    # We end with a synchronous summary task to synchronize the parallel tasks.
    return Crew(
        agents=[ceo, engineer1, engineer2, marketing],
        tasks=[ideation, engineering1, engineering2, marketing_task, summary],
        process=Process.sequential,
        verbose=True,
    )
