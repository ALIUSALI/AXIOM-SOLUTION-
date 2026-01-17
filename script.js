/**
 * AXIOM Digital Agency - Main JavaScript
 * Handles navigation, animations, and interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const header = document.getElementById('header');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const contactForm = document.getElementById('contactForm');
    const serviceCards = document.querySelectorAll('.service-card');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    /**
     * Initialize the website functionality
     */
    function init() {
        setupEventListeners();
        setupAnimations();
        setActivePage('home');
        
        // Initialize header scroll effect
        updateHeaderOnScroll();
    }
    
    /**
     * Set up all event listeners
     */
    function setupEventListeners() {
        // Header scroll effect
        window.addEventListener('scroll', updateHeaderOnScroll);
        
        // Mobile menu toggle
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        
        // Navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', handleNavigation);
        });
        
        // Contact form submission
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }
        
        // Service cards hover effects
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', enhanceCardHover);
            card.addEventListener('mouseleave', resetCardHover);
        });
        
        // Portfolio item interactions
        portfolioItems.forEach(item => {
            item.addEventListener('click', handlePortfolioClick);
        });
        
        // Window resize for responsive adjustments
        window.addEventListener('resize', handleResize);
    }
    
    /**
     * Set up scroll animations
     */
    function setupAnimations() {
        // Set initial state for animated elements
        const animatedElements = document.querySelectorAll('.service-card, .feature-card, .portfolio-item');
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        });
        
        // Trigger animations on scroll
        window.addEventListener('scroll', animateOnScroll);
        
        // Initial trigger
        setTimeout(animateOnScroll, 100);
    }
    
    /**
     * Handle window scroll for header effect
     */
    function updateHeaderOnScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    /**
     * Toggle mobile menu visibility
     */
    function toggleMobileMenu() {
        mainNav.classList.toggle('active');
        mobileMenuBtn.innerHTML = mainNav.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    }
    
    /**
     * Handle navigation between pages
     * @param {Event} e - Click event
     */
    function handleNavigation(e) {
        e.preventDefault();
        
        // Get target page ID from href
        const targetId = this.getAttribute('href').substring(1);
        
        // Set active page
        setActivePage(targetId);
        
        // Update active nav link
        updateActiveNavLink(this);
        
        // Close mobile menu if open
        closeMobileMenu();
        
        // Scroll to top of page (for mobile)
        window.scrollTo(0, 0);
    }
    
    /**
     * Set active page and show it
     * @param {string} pageId - ID of the page to show
     */
    function setActivePage(pageId) {
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
    }
    
    /**
     * Update active navigation link
     * @param {HTMLElement} clickedLink - The clicked navigation link
     */
    function updateActiveNavLink(clickedLink) {
        navLinks.forEach(navLink => {
            navLink.classList.remove('active');
        });
        clickedLink.classList.add('active');
    }
    
    /**
     * Close mobile menu
     */
    function closeMobileMenu() {
        if (mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
    
    /**
     * Handle contact form submission
     * @param {Event} e - Submit event
     */
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        // In a real implementation, you would send this data to a server
        // For this example, we'll show a success message
        showSuccessMessage(name, email, service);
        
        // Reset form
        contactForm.reset();
    }
    
    /**
     * Show success message after form submission
     * @param {string} name - User's name
     * @param {string} email - User's email
     * @param {string} service - Selected service
     */
    function showSuccessMessage(name, email, service) {
        // Create a more elegant success message
        const message = `Thank you, ${name}! Your message has been sent. We'll contact you at ${email} regarding ${service} soon.`;
        
        // You could replace this with a modal or toast notification
        alert(message);
    }
    
    /**
     * Enhance service card hover effect
     */
    function enhanceCardHover() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    }
    
    /**
     * Reset service card hover effect
     */
    function resetCardHover() {
        this.style.transform = 'translateY(-10px) scale(1)';
    }
    
    /**
     * Handle portfolio item click
     */
    function handlePortfolioClick() {
        const title = this.querySelector('h3').textContent;
        const message = `Viewing project: ${title}\n\nThis is a premium project showcase. Contact us to discuss similar solutions for your business.`;
        
        // In a real implementation, you might open a modal with project details
        alert(message);
    }
    
    /**
     * Animate elements when they come into view
     */
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .feature-card, .portfolio-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    /**
     * Handle window resize for responsive adjustments
     */
    function handleResize() {
        // Close mobile menu on resize if window is wide enough
        if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
            closeMobileMenu();
        }
    }
    
    // Initialize the website
    init();
});