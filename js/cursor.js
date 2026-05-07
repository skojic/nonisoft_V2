// ============================================
// CUSTOM CURSOR
// ============================================

const cursor = document.getElementById('custom-cursor');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

// Update cursor position on mouse move
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Animate cursor with smooth trailing
function animateCursor() {
    // Smooth trailing effect
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Detect when hovering over interactive elements
document.addEventListener('mouseover', (e) => {
    const interactive = e.target.closest('a, button, .service-card, .nav-link, .contact-link, .card-link');
    if (interactive) {
        cursor.classList.add('active');
    }
});

document.addEventListener('mouseout', (e) => {
    const interactive = e.target.closest('a, button, .service-card, .nav-link, .contact-link, .card-link');
    if (interactive) {
        cursor.classList.remove('active');
    }
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
});
