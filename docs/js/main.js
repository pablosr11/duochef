// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }
});

// Waitlist form handling
document.getElementById('waitlist-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const submitBtn = document.getElementById('submit-btn');
    const responseMsg = document.getElementById('response-msg');

    // UI state
    submitBtn.disabled = true;
    submitBtn.innerText = 'Joining...';
    responseMsg.style.display = 'none';

    try {
        // NOTE: This endpoint works with the local server.py
        // For production GitHub Pages, you'll need to use a service like Formspree, 
        // a Cloudflare Worker, or a Google Form redirect.
        const response = await fetch('/waitlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        });

        const data = await response.json();

        if (data.status === 'success') {
            responseMsg.classList.add('success');
            responseMsg.style.color = 'var(--secondary-color)';
            responseMsg.innerText = "Welcome to the chef's table! We've added you to the waitlist.";
            document.getElementById('waitlist-form').reset();
        } else {
            throw new Error('Server returned an error');
        }
    } catch (error) {
        console.error('Error submitting waitlist:', error);

        // Friendly fallback for static environments like GitHub Pages
        responseMsg.classList.add('error');
        responseMsg.style.color = '#ff4b2b';
        responseMsg.innerText = "Heads up! The waitlist is currently only accepting signups via our local testing environment. We'll be live for the public very soon!";

        // DEBUG: If you see this on GitHub Pages, it's because there's no backend at /waitlist
    } finally {
        responseMsg.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.innerText = 'Join the Waitlist';
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
