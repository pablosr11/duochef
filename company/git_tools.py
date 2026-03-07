import os
import subprocess
from pathlib import Path

from crewai.tools import tool

@tool("Push to remote GitHub repository")
def git_push_to_remote(commit_message: str) -> str:
    """
    Stages all changes, commits with the given message, and pushes to 'origin'.
    Uses GITHUB_TOKEN and GITHUB_ACTOR if available for authentication.
    """
    # Use environment variables for separate bot identities
    bot_name = os.environ.get("GITHUB_BOT_NAME", "ChefAtHome-Agent")
    bot_email = os.environ.get("GITHUB_BOT_EMAIL", "agent@chefathome.internal")
    token = os.environ.get("GITHUB_TOKEN")

    try:
        # Config bot identity locally for this project
        subprocess.run(["git", "config", "user.name", bot_name], check=True)
        subprocess.run(["git", "config", "user.email", bot_email], check=True)

        # Add all changes
        subprocess.run(["git", "add", "."], check=True, capture_output=True, text=True)
        
        # Commit changes
        # check=False because it might fail if there's nothing to commit
        subprocess.run(["git", "commit", "-m", commit_message], check=False, capture_output=True, text=True)
        
        # Push to remote
        # If token is provided, we can ensure the remote URL uses it
        if token:
            remote_url = subprocess.run(["git", "remote", "get-url", "origin"], 
                                      check=True, capture_output=True, text=True).stdout.strip()
            # Basic attempt to inject token if it's a github URL and doesn't already have one
            if "github.com" in remote_url and "@" not in remote_url:
                auth_url = remote_url.replace("https://", f"https://{token}@")
                # Temporarily use auth_url for push
                result = subprocess.run(["git", "push", auth_url, "HEAD"], check=True, capture_output=True, text=True)
            else:
                result = subprocess.run(["git", "push", "origin", "HEAD"], check=True, capture_output=True, text=True)
        else:
            result = subprocess.run(["git", "push", "origin", "HEAD"], check=True, capture_output=True, text=True)

        return f"Successfully pushed to GitHub: {result.stdout or 'Done.'}"
    except subprocess.CalledProcessError as e:
        return f"Error during git operation: {e.stderr}"

@tool("Set or update remote URL")
def git_set_remote(remote_url: str) -> str:
    """Sets or updates the 'origin' remote URL for the current repository."""
    try:
        # Check if origin already exists
        result = subprocess.run(["git", "remote", "get-url", "origin"], check=False, capture_output=True, text=True)
        if result.returncode == 0:
            # Update remote
            subprocess.run(["git", "remote", "set-url", "origin", remote_url], check=True, capture_output=True, text=True)
            return f"Updated origin remote to: {remote_url}"
        else:
            # Add remote
            subprocess.run(["git", "remote", "add", "origin", remote_url], check=True, capture_output=True, text=True)
            return f"Added origin remote: {remote_url}"
    except subprocess.CalledProcessError as e:
        return f"Error setting remote: {e.stderr}"
