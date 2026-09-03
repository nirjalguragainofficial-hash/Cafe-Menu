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

        // Toggle hamburger animation
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
