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

    submitBtn.disabled = true;
    submitBtn.innerText = 'Joining...';
    responseMsg.style.display = 'none';

    try {
        // Try local backend first (for local testing)
        const response = await fetch('/waitlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        });

        const data = await response.json();

        if (data.status === 'success') {
            onSuccess();
            return;
        }
    } catch (error) {
        console.log('Local backend not found, trying Formspree fallback...');

        // FORMSPREE FALLBACK ($0 solution for static sites)
        // This allows the waitlist to work on GitHub Pages without a backend.
        try {
            const formResponse = await fetch('https://formspree.io/f/xzbnrven', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    _subject: "ChefAtHome Waitlist Signup",
                    message: "New user joined the waitlist via GitHub Pages."
                }),
            });

            if (formResponse.ok) {
                onSuccess();
                return;
            }
        } catch (fError) {
            console.error('Formspree failed:', fError);
        }
    }

    // If both fail
    responseMsg.style.color = '#ff4b2b';
    responseMsg.innerText = "Heads up! We're putting the finishing touches on our signup form. Please try again in 5 minutes!";
    responseMsg.style.display = 'block';
    submitBtn.disabled = false;
    submitBtn.innerText = 'Join the Waitlist';

    function onSuccess() {
        responseMsg.style.color = 'var(--secondary-color)';
        responseMsg.innerText = "Welcome to the chef's table! We've added you to the waitlist.";
        responseMsg.style.display = 'block';
        document.getElementById('waitlist-form').reset();
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
