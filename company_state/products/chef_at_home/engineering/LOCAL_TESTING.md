# Local Testing Instructions for ChefAtHome

## Overview
This document outlines the steps required to run the ChefAtHome app and the marketing landing page on a local machine for testing purposes.

## Prerequisites
- Node.js installed on your machine
- Access to the project repository

## Steps to Run the App
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/chef_at_home.git
   cd chef_at_home
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open your browser and navigate to `http://localhost:3000` to view the app.

## Testing the Marketing Landing Page
1. Navigate to the marketing directory:
   ```bash
   cd marketing
   ```
2. Open the landing page in your browser:
   ```bash
   open landing_page.html
   ```

## Waitlist Persistence
- Ensure the waitlist email collection feature is functional in the local environment, writing to a local JSON file or simple database.

## Safety Disclaimer
- The app provides general educational guidance, not professional culinary training. Users must follow local food safety guidance.