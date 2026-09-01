// Wait for the HTML document to fully load before running scripts
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MOBILE HAMBURGER MENU LOGIC
    // ---------------------------------------------------------
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            // Toggle the 'active' class to show/hide the menu dropdown
            navLinks.classList.toggle('active');
            
            // Optional: Animate hamburger into an 'X' (you can add CSS for this)
            hamburger.classList.toggle('toggle'); 
        });
    }

    // 2. MENU CATEGORY FILTERING (Only applies if on the Menu page)
    // ---------------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove 'active' class from all buttons
                filterBtns.forEach(button => button.classList.remove('active'));
                // Add 'active' class to the clicked button
                btn.classList.add('active');

                // Get the category from the custom 'data-filter' attribute
                const filterValue = btn.getAttribute('data-filter');

                // Loop through all menu cards
                menuItems.forEach(item => {
                    // Check if the item's category matches the filter or if filter is 'all'
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block'; // Show item
                        // Add a tiny delay for a smooth fade-in effect via CSS (optional refinement)
                        setTimeout(() => item.style.opacity = '1', 50);
                    } else {
                        item.style.display = 'none'; // Hide item
                        item.style.opacity = '0';
                    }
                });
            });
        });
    }

    // 3. CONTACT FORM VALIDATION (Only applies if on the Contact page)
    // ---------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload on submit
            
            let isValid = true;
            
            // Get form fields and their respective error message spans
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const messageError = document.getElementById('messageError');

            // Reset errors initially
            nameError.style.display = 'none';
            emailError.style.display = 'none';
            messageError.style.display = 'none';

            // Validate Name (Cannot be empty)
            if (name.value.trim() === '') {
                nameError.textContent = 'Name is required';
                nameError.style.display = 'block';
                isValid = false;
            }

            // Validate Email (Regex for correct format)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === '') {
                emailError.textContent = 'Email is required';
                emailError.style.display = 'block';
                isValid = false;
            } else if (!emailRegex.test(email.value.trim())) {
                emailError.textContent = 'Please enter a valid email address';
                emailError.style.display = 'block';
                isValid = false;
            }

            // Validate Message (Cannot be empty)
            if (message.value.trim() === '') {
                messageError.textContent = 'Message is required';
                messageError.style.display = 'block';
                isValid = false;
            }

            // If everything is valid, simulate form submission success
            if (isValid) {
                alert('Thank you for reaching out! We will get back to you soon.');
                contactForm.reset(); // Clear the form
            }
        });
    }

    // 4. SCROLL-REVEAL ANIMATIONS (Using Intersection Observer)
    // ---------------------------------------------------------
    // This watches elements as you scroll down and fades them in
    const revealElements = document.querySelectorAll('.reveal');
    
    // Configuration for the observer
    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible in viewport
        rootMargin: "0px 0px -50px 0px" // Triggers slightly before the item actually hits the bottom
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is not intersecting the viewport, do nothing
            if (!entry.isIntersecting) return;
            
            // Add the 'active' class which triggers the CSS transition
            entry.target.classList.add('active');
            
            // Stop observing the element once it's revealed so it stays visible
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    // Apply the observer to all elements with the '.reveal' class
    revealElements.forEach(el => revealOnScroll.observe(el));

});
