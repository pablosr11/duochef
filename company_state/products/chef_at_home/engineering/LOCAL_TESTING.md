# Local Testing Instructions for ChefAtHome

## Prerequisites
- Node.js installed
- Access to the local database or JSON file for waitlist persistence

## Running the App
1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Start the application with `npm start`.

## Testing the Interactive Engine
- To test the interactive engine, ensure that the lesson files are correctly placed in the `engineering/` directory.
- Use the command `npm test` to run all tests.

## Waitlist Persistence
- Ensure that the waitlist email collection feature is functional in the local environment, writing to a local JSON file or simple database.
- Test the waitlist submission by filling out the form and checking the local storage.