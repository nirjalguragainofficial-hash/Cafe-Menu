// Wait for the HTML document to fully load before running scripts
document.addEventListener('DOMContentLoaded', () => {
    
// ==========================================
// 1. MOBILE NAVIGATION TOGGLE
// ==========================================
// Opens and closes the mobile dropdown menu when hamburger icon is clicked
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // If navigation elements are not on this page, exit early
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', function () {
        // Toggle dropdown open/closed
        navLinks.classList.toggle('active');

        // Animate hamburger bars into an X when menu is open
        hamburger.classList.toggle('active');
    });
}

    initMobileNav();

// ==========================================
// 2. MENU CATEGORY FILTERING
// ==========================================
// Shows or hides menu items based on chosen category
function filterItemsByCategory(selectedCategory, menuItems) {
    menuItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        const matchesCategory = (selectedCategory === 'all' || itemCategory === selectedCategory);

        if (matchesCategory) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
            }, 50);
        } else {
            item.style.display = 'none';
            item.style.opacity = '0';
        }
    });
}

// Sets up click listeners on filter buttons
function initMenuFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    // Only run if we are on the menu page
    if (filterBtns.length === 0) return;

    filterBtns.forEach(button => {
        button.addEventListener('click', function () {
            // Highlight active button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter the items
            const selectedCategory = button.getAttribute('data-filter');
            filterItemsByCategory(selectedCategory, menuItems);
        });
    });
}

    initMenuFilter();

// ==========================================
// 3. CONTACT FORM VALIDATION
// ==========================================
// Helper function to check valid email format
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Display error text for a specific field
function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Hide error message
function clearError(errorElement) {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

// Handles contact form validation and submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Clear previous error messages
        clearError(nameError);
        clearError(emailError);
        clearError(messageError);

        let formIsValid = true;

        // Validate name
        if (nameInput.value.trim() === '') {
            showError(nameError, 'Name is required');
            formIsValid = false;
        }

        // Validate email
        const emailValue = emailInput.value.trim();
        if (emailValue === '') {
            showError(emailError, 'Email is required');
            formIsValid = false;
        } else if (!isValidEmail(emailValue)) {
            showError(emailError, 'Please enter a valid email address');
            formIsValid = false;
        }

        // Validate message
        if (messageInput.value.trim() === '') {
            showError(messageError, 'Message is required');
            formIsValid = false;
        }

        // If all fields are valid, show confirmation and reset form
        if (formIsValid) {
            alert('Thank you for reaching out! We will get back to you soon.');
            contactForm.reset();
        }
    });
}

    initContactForm();

// ==========================================
// 4. SCROLL-REVEAL ANIMATION
// ==========================================
// Watches elements as the user scrolls and fades them in when visible
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    // No reveal elements on this page, so exit early
    if (revealElements.length === 0) return;

    // Observer settings:
    // - trigger when 15% of the element comes into view
    // - offset by 50px from the bottom so it fires slightly before fully visible
    const observerSettings = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    // This function runs every time an observed element enters or leaves the screen
    function onElementVisible(entries, observer) {
        entries.forEach(function (entry) {
            // Skip elements that are not yet visible
            if (!entry.isIntersecting) return;

            // Add 'active' class to trigger the CSS fade-in animation
            entry.target.classList.add('active');

            // Stop watching this element — it only needs to animate once
            observer.unobserve(entry.target);
        });
    }

    const scrollObserver = new IntersectionObserver(onElementVisible, observerSettings);

    // Start watching every element that has the 'reveal' class
    revealElements.forEach(function (element) {
        scrollObserver.observe(element);
    });
}

    initScrollReveal();

// ==========================================
// 5. BACK TO TOP BUTTON
// ==========================================
// Shows a floating button when the user scrolls down, scrolls back to top on click
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    // Show button after scrolling 300px
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    // Smooth scroll to top on click
    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

    initBackToTop();

});
