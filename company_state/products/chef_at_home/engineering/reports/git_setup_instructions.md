# GitHub Remote Setup Instructions

## Purpose
This document outlines the steps to set up the GitHub remote for the ChefAtHome project.

## Steps
1. Obtain the GitHub repository URL from the CEO or check the .env file.
2. Open your terminal and navigate to the project directory.
3. Run the following command to set the remote:
   ```
   git remote add origin <GITHUB_REPO_URL>
   ```
4. Verify the remote has been added by running:
   ```
   git remote -v
   ```
5. Push the local code to GitHub:
   ```
   git push -u origin main
   ```

## Notes
- Ensure you have the necessary permissions to push to the repository.
- If you encounter any issues, please consult the team for assistance.