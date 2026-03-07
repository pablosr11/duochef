# ChefAtHome Local Testing

This document outlines the steps for local testing of the ChefAtHome application and the marketing landing page.

## Landing Page

1.  **Prerequisites:** Ensure you have Node.js and npm installed.
2.  **Clone the repository:**  (Assuming the landing page is in the same repo, or a separate one, I'll need to clarify this with marketing).
3.  **Navigate to the landing page directory:** `cd <landing_page_directory>`
4.  **Install dependencies:** `npm install`
5.  **Run the landing page locally:** `npm start`
6.  **Access the landing page:** Open your web browser and go to `http://localhost:3000` (or the port specified by `npm start`).

## Waitlist Functionality

1.  **Check the landing page code:** Verify that the waitlist form submits data correctly.
2.  **Inspect the data storage:** Check where the waitlist data is stored (e.g., a local JSON file or a database).
3.  **Test the submission:** Submit a test email address to the waitlist form.
4.  **Verify the data:** Check the storage location to confirm that the test email address was saved.

## Troubleshooting

*   If the landing page doesn't load, check the console for errors.
*   If the waitlist form doesn't submit, check the network tab in your browser's developer tools to see if there are any errors.
*   If the data isn't saved, check the file permissions or database connection.

This document will be updated as needed.
