# Local Testing Instructions

Welcome, **pablosr11@gmail.com**!

This document provides definitive instructions on how to run and test the ChefAtHome application and its marketing assets locally.

## 1. Running the Company Agents
The project is an autonomous 3-agent company. You can run the main loop to see them work:
```bash
./.venv/bin/python main.py
```
> **Note**: This requires an `OPENROUTER_API_KEY` in your `.env` file.

## 2. Testing the Landing Page & Waitlist
To test the landing page and the email collection, run the local dev server:
```bash
python3 server.py
```
1.  Open your browser and navigate to: **[http://localhost:8000](http://localhost:8000)**.
2.  Enter your email in the "Join Waitlist" section and click submit.
3.  Check `company_state/waitlist.json` to verify that your email has been saved.

## 3. Testing the Mobile (React Native/Expo) App
To run the ChefAtHome app locally:
```bash
cd company_state/products/chef_at_home/engineering
npm install
npx expo start
```
1.  **Follow the instructions** in the terminal to open the app (e.g., press `i` for iOS simulator, `a` for Android, or scan the QR code with the Expo Go app).
2.  **Verify** that you can navigate the Skill Tree and start a Level 0 lesson.
3.  **Note**: Ensure your `App.js` and `navigationSetup.js` are in place.

## 4. Reviewing Logs & Progress
You can monitor the "company's" internal progress by looking at these primary files:
- **CEO Decisions**: `company_state/logs/ceo.md`
- **Current Backlog**: `company_state/backlog.json`
- **Product Architecture**: `company_state/products/chef_at_home/spec.md`
- **Output Files**: Look in `company_state/products/chef_at_home/engineering/` and `company_state/products/chef_at_home/marketing/`.

## 4. Troubleshooting
If the server fails to start, ensure that port **8000** is not already in use. You can stop the server with `Ctrl+C`.
For any issues with the agent execution, check the `.env` file for correct model configurations and fallbacks.
