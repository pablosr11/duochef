import json
import datetime
from pathlib import Path

BACKLOG_PATH = Path("/Users/ps/repos/agentic-business-organization/company_state/backlog.json")

def purge_backlog():
    # Only keep the product slug and a few basic tasks
    now = datetime.datetime.now(datetime.UTC).isoformat()
    
    clean_tasks = [
        {
            "id": 1,
            "title": "[ENGINEER] Launch functional React Native App locally",
            "description": "Ensure `npx expo start` works and the app can load and render a lesson at `engineering/lessons/lesson_boil_water.json`. Remove redundant engine files.",
            "assigned_to": "engineer",
            "status": "todo",
            "product_slug": "chef_at_home",
            "created_at": now
        },
        {
            "id": 2,
            "title": "[MARKETING] Deploy Landing Page to GitHub Pages",
            "description": "Push the `landing_page.html` and assets to a repository and enable GitHub Pages. Ensure the waitlist is functional and saves to a local waitlist.json on the server.",
            "assigned_to": "marketing",
            "status": "todo",
            "product_slug": "chef_at_home",
            "created_at": now
        },
        {
             "id": 3,
            "title": "[ENGINEER] Move 170+ JSON lessons to a /lessons subdirectory",
            "description": "Clean up the root engineering folder by moving all lesson JSON files into a dedicated subdirectory.",
            "assigned_to": "engineer",
            "status": "todo",
            "product_slug": "chef_at_home",
            "created_at": now
        }
    ]
    
    backlog_data = {
        "tasks": clean_tasks,
        "active_product": "chef_at_home",
        "next_id": 4
    }
    
    with open(BACKLOG_PATH, 'w') as f:
        json.dump(backlog_data, f, indent=2)
    
    print(f"Purged {BACKLOG_PATH}. Restarting with 3 core tasks.")

if __name__ == "__main__":
    purge_backlog()
