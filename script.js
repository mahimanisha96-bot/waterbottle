// DOM Elements
const navbar = document.querySelector('.header');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.querySelector('.back-to-top');
const customizeBtn = document.getElementById('customize-now');
const customizeModal = document.getElementById('customizeModal');
const closeModal = document.querySelector('.close-modal');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');
const modalSubmit = document.getElementById('modal-submit');
const sizeOptions = document.querySelectorAll('.size-option');
const colorOptions = document.querySelectorAll('.color-option');
const prevDesignBtn = document.getElementById('prev-design');
const nextDesignBtn = document.getElementById('next-design');
const bottleBody = document.querySelector('.bottle-body');
const bottleLabel = document.querySelector('.label-text');

// Sticky Navbar on Scroll
window.addEventListener('scroll', () => {
    // Sticky navbar
    if (window.scrollY > 100) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
    
    // Back to top button
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
    
    // Active nav link based on scroll position
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Bottle Size Selection
sizeOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove active class from all size options
        sizeOptions.forEach(opt => opt.classList.remove('active'));
        
        // Add active class to clicked option
        option.classList.add('active');
        
        // Update bottle preview based on selected size
        const size = option.textContent;
        updateBottleSize(size);
    });
});

// Update bottle size in preview
function updateBottleSize(size) {
    const bottle = document.querySelector('.bottle');
    
    switch(size) {
        case '250ml':
            bottle.style.height = '300px';
            bottleBody.style.height = '220px';
            break;
        case '500ml':
            bottle.style.height = '400px';
            bottleBody.style.height = '320px';
            break;
        case '750ml':
            bottle.style.height = '450px';
            bottleBody.style.height = '370px';
            break;
        case '1L':
            bottle.style.height = '500px';
            bottleBody.style.height = '420px';
            break;
        case '2L':
            bottle.style.height = '550px';
            bottleBody.style.height = '470px';
            break;
    }
}

// Bottle Color Selection
colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Get color from option
        const color = window.getComputedStyle(option).backgroundColor;
        
        // Apply color to bottle body
        bottleBody.style.backgroundColor = color;
    });
});

// Bottle Design Navigation
let designIndex = 0;
const designs = [
    { color: '#3498db', label: 'Your Logo Here' },
    { color: '#2ecc71', label: 'Premium Quality' },
    { color: '#e74c3c', label: 'Brand Identity' },
    { color: '#f1c40f', label: 'Custom Design' },
    { color: '#9b59b6', label: 'Event Special' }
];

// Initialize with first design
updateBottleDesign();

// Previous design button
prevDesignBtn.addEventListener('click', () => {
    designIndex = (designIndex - 1 + designs.length) % designs.length;
    updateBottleDesign();
});

// Next design button
nextDesignBtn.addEventListener('click', () => {
    designIndex = (designIndex + 1) % designs.length;
    updateBottleDesign();
});

// Update bottle design
function updateBottleDesign() {
    const design = designs[designIndex];
    bottleBody.style.backgroundColor = design.color;
    bottleLabel.textContent = design.label;
}

// Customize Now Button - Open Modal
customizeBtn.addEventListener('click', () => {
    customizeModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

// Close Modal
closeModal.addEventListener('click', () => {
    customizeModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === customizeModal) {
        customizeModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Contact Form Validation
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Reset previous error messages
    clearErrors();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const requirement = document.getElementById('requirement').value;
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Name validation
    if (!name) {
        showError('name-error', 'Name is required');
        isValid = false;
    } else if (name.length < 2) {
        showError('name-error', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Email validation
    if (!email) {
        showError('email-error', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email-error', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Phone validation (optional but if provided, validate)
    if (phone && !isValidPhone(phone)) {
        showError('phone-error', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Requirement validation
    if (!requirement) {
        showError('requirement-error', 'Please select a requirement');
        isValid = false;
    }
    
    // Message validation
    if (!message) {
        showError('message-error', 'Please enter your message');
        isValid = false;
    } else if (message.length < 10) {
        showError('message-error', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    // If form is valid, submit
    if (isValid) {
        // In a real application, you would send the data to a server here
        alert('Thank you for your inquiry! We will contact you within 24 hours.');
        contactForm.reset();
    }
});

// Newsletter Form Submission
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (!email) {
        alert('Please enter your email address');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // In a real application, you would send the data to a server here
    alert('Thank you for subscribing to our newsletter!');
    emailInput.value = '';
});

// Modal Form Submission
modalSubmit.addEventListener('click', () => {
    const name = document.getElementById('modal-name').value.trim();
    const email = document.getElementById('modal-email').value.trim();
    const purpose = document.getElementById('modal-purpose').value;
    
    if (!name || !email || !purpose) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // In a real application, you would send the data to a server here
    alert('Thank you! Our team will contact you within 24 hours to discuss your custom water bottle project.');
    
    // Close modal and reset form
    customizeModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('modal-name').value = '';
    document.getElementById('modal-email').value = '';
    document.getElementById('modal-purpose').value = '';
});

// Helper Functions
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer (if needed)
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Add smooth scrolling to back to top button
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
