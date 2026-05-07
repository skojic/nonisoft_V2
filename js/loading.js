// ============================================
// LOADING SCREEN & BOOT SEQUENCE
// ============================================

window.addEventListener('load', () => {
    // Simulate loading time before hiding the loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }, 3000); // 3 seconds total load time
});

// Alternative approach: hide loading screen when all resources are loaded
window.addEventListener('DOMContentLoaded', () => {
    // Optional: Add any additional setup here
});

// Hide loading screen if it takes too long (safety timeout)
setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
        loadingScreen.classList.add('hidden');
    }
}, 5000); // Maximum 5 seconds

// Add smooth scroll behavior enhancements
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
