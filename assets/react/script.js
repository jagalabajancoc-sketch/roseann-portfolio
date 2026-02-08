// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
const animateOnScroll = document.querySelectorAll('.skill-category, .work-item, .stat-item');
animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
// Add confirmation for external links
document.addEventListener('DOMContentLoaded', () => {
    // Get all links
    const allLinks = document.querySelectorAll('a[href]');
    
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Check if it's an external link (starts with http/https or mailto)
        const isExternal = href && (href.startsWith('http') || href.startsWith('mailto') || href.includes('mail.google.com'));
        
        // Skip internal navigation links
        const isInternalNav = href && (href.endsWith('.html') || href === '#');
        
        if (isExternal && !isInternalNav) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Determine the platform name
                let platform = 'this link';
                if (href.includes('facebook.com')) {
                    platform = 'Facebook';
                } else if (href.includes('linkedin.com')) {
                    platform = 'LinkedIn';
                } else if (href.includes('mail.google.com') || href.includes('contacts.google.com')) {
                    platform = 'Email';
                }
                
                // Show confirmation dialog
                const confirmed = confirm(`You are about to leave this site and visit ${platform}. Do you want to proceed?`);
                
                if (confirmed) {
                    window.open(href, link.target || '_self');
                }
            });
        }
    });
});

// Theme Toggle Functionality
const initTheme = () => {
    // Check for saved theme preference or default to 'dark'
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
};

const updateThemeIcon = (theme) => {
    const icon = document.querySelector('.theme-toggle-icon');
    if (icon) {
        icon.textContent = theme === 'light' ? '☀️' : '🌙';
    }
};

const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
};

// Initialize theme on page load
initTheme();

// Add click event to theme toggle button
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}
