document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const mainNav = document.getElementById('main-nav');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // News Ticker Animation Reset
    const ticker = document.querySelector('.ticker ul');
    
    // Reset animation to prevent empty space
    ticker.addEventListener('animationiteration', function() {
        this.style.animation = 'none';
        void this.offsetWidth; // Trigger reflow
        this.style.animation = 'ticker 20s linear infinite';
    });
    
    // Category Filtering (for category.html)
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat');
    
    if (category) {
        // Highlight active category in navigation
        const navItems = document.querySelectorAll('.main-nav li');
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.querySelector('a').textContent.toLowerCase() === category.toLowerCase()) {
                item.classList.add('active');
            }
        });
        
        // Update page title
        document.title = `${category.charAt(0).toUpperCase() + category.slice(1)} News | NewsPortal`;
        
        // Update category header
        const categoryHeader = document.querySelector('.category-header h2');
        if (categoryHeader) {
            categoryHeader.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} News`;
        }
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            // Simple validation
            if (emailInput.value && emailInput.value.includes('@')) {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Lazy Loading Images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Ad Management
    function loadAds() {
        // This would be replaced with actual ad loading code
        console.log('Loading advertisements...');
        
        // Example: Rotate ads every 30 seconds
        setInterval(() => {
            const adBanners = document.querySelectorAll('.ad-banner img');
            adBanners.forEach(banner => {
                // In a real implementation, this would fetch new ad content
                banner.style.opacity = '0.8';
                setTimeout(() => {
                    banner.style.opacity = '1';
                }, 300);
            });
        }, 30000);
    }
    
    // Initialize ad loading
    loadAds();
});
