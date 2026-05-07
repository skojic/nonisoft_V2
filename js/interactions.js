// ============================================
// INTERACTIONS & EFFECTS
// ============================================

// Smooth scroll interceptor for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add interactive glow effect to buttons
const buttons = document.querySelectorAll('.primary-cta, .card-link');

buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        button.style.setProperty('--mouse-x', x + 'px');
        button.style.setProperty('--mouse-y', y + 'px');
    });
});

// Service cards hover animation
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', () => {
        card.style.zIndex = '1';
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and other elements
document.querySelectorAll('.service-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'S' to scroll to services
    if (e.key === 's' || e.key === 'S') {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Press 'C' to scroll to contact
    if (e.key === 'c' || e.key === 'C') {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Press 'A' to scroll to about
    if (e.key === 'a' || e.key === 'A') {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// CTA Button click handler
document.querySelectorAll('.primary-cta').forEach(button => {
    button.addEventListener('click', () => {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';

        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add active state to nav links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href').includes(current)) {
            link.style.color = 'var(--electric-cobalt)';
        }
    });
});

// Mobile menu toggle (if needed)
function handleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');

    if (window.innerWidth <= 768) {
        // Mobile menu handling
        navLinks.style.display = navLinks.style.display === 'none' ? 'flex' : 'none';
    }
}

// Top trends ticker updates
function updateTrendTicker() {
    const adoption = document.getElementById('trend-adoption');
    const automation = document.getElementById('trend-automation');
    const reduction = document.getElementById('trend-reduction');
    const infra = document.getElementById('trend-infra');
    const accuracy = document.getElementById('trend-accuracy');
    const uptime = document.getElementById('trend-uptime');
    const speed = document.getElementById('trend-speed');

    if (!adoption || !automation || !reduction || !infra || !accuracy || !uptime || !speed) {
        return;
    }

    const nudge = (base, min, max, step) => {
        const delta = (Math.random() * 2 - 1) * step;
        const next = Math.max(min, Math.min(max, base + delta));
        return Math.round(next);
    };

    const nudgeDecimal = (base, min, max, step) => {
        const delta = (Math.random() * 2 - 1) * step;
        const next = Math.max(min, Math.min(max, base + delta));
        return next.toFixed(1);
    };

    const currentAdoption = parseInt(adoption.textContent, 10) || 78;
    const currentAutomation = parseInt(automation.textContent, 10) || 64;
    const currentReduction = parseInt(reduction.textContent, 10) || 32;
    const currentInfra = parseInt(infra.textContent, 10) || 94;
    const currentAccuracy = parseInt(accuracy.textContent, 10) || 97;
    const currentUptime = parseFloat(uptime.textContent, 10) || 99.8;
    const currentSpeed = parseFloat(speed.textContent, 10) || 2.4;

    adoption.textContent = `${nudge(currentAdoption, 55, 93, 3)}%`;
    automation.textContent = `${nudge(currentAutomation, 40, 89, 4)}%`;
    reduction.textContent = `${nudge(currentReduction, 18, 56, 3)}%`;
    infra.textContent = `${nudge(currentInfra, 89, 99, 2)}%`;
    accuracy.textContent = `${nudge(currentAccuracy, 94, 99, 1)}%`;
    uptime.textContent = `${nudgeDecimal(currentUptime, 99.5, 99.99, 0.1)}%`;
    speed.textContent = `${nudgeDecimal(currentSpeed, 1.8, 3.5, 0.3)}ms`;
}

// AI business savings calculator
function initSavingsCalculator() {
    const industryInput = document.getElementById('calc-industry');
    const revenueInput = document.getElementById('calc-revenue');
    const hoursInput = document.getElementById('calc-hours');
    const teamInput = document.getElementById('calc-team');

    if (!industryInput || !revenueInput || !hoursInput || !teamInput) {
        return;
    }

    const industryHint = document.getElementById('calc-industry-hint');
    const revenueValue = document.getElementById('calc-revenue-value');
    const hoursValue = document.getElementById('calc-hours-value');
    const teamValue = document.getElementById('calc-team-value');
    const resultSavings = document.getElementById('result-savings');
    const resultProductivity = document.getElementById('result-productivity');
    const resultRoi = document.getElementById('result-roi');

    const INDUSTRY_MODELS = {
        saas: {
            hint: 'Balanced model with strong automation and support efficiency gains.',
            baseRate: 0.035,
            teamFactor: 0.95,
            hourFactor: 1.0,
            productivityBase: 11,
            implementationMultiplier: 1.0,
        },
        ecommerce: {
            hint: 'Optimized for merchandising, support workflows, and demand forecasting.',
            baseRate: 0.042,
            teamFactor: 1.05,
            hourFactor: 1.08,
            productivityBase: 12,
            implementationMultiplier: 0.95,
        },
        logistics: {
            hint: 'Prioritizes routing, inventory flow, and scheduling optimization impact.',
            baseRate: 0.047,
            teamFactor: 1.12,
            hourFactor: 1.16,
            productivityBase: 13,
            implementationMultiplier: 1.08,
        },
        healthcare: {
            hint: 'Focuses on documentation reduction and clinical operations support.',
            baseRate: 0.031,
            teamFactor: 0.88,
            hourFactor: 0.95,
            productivityBase: 9,
            implementationMultiplier: 1.22,
        },
        finance: {
            hint: 'Emphasizes compliance automation, risk analysis, and process acceleration.',
            baseRate: 0.038,
            teamFactor: 0.92,
            hourFactor: 0.98,
            productivityBase: 10,
            implementationMultiplier: 1.18,
        },
        manufacturing: {
            hint: 'Designed around quality control, predictive maintenance, and planning gains.',
            baseRate: 0.045,
            teamFactor: 1.1,
            hourFactor: 1.2,
            productivityBase: 12,
            implementationMultiplier: 1.12,
        },
    };

    const usd = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    });

    const render = () => {
        const industryKey = industryInput.value;
        const industry = INDUSTRY_MODELS[industryKey] || INDUSTRY_MODELS.saas;
        const revenue = parseInt(revenueInput.value, 10);
        const hours = parseInt(hoursInput.value, 10);
        const team = parseInt(teamInput.value, 10);

        if (industryHint) {
            industryHint.textContent = industry.hint;
        }

        revenueValue.textContent = usd.format(revenue);
        hoursValue.textContent = `${hours.toLocaleString()} hrs`;
        teamValue.textContent = `${team} people`;

        const annualizedRevenue = revenue * 12;
        const costSavingsRate = industry.baseRate + Math.min(0.12, (team / 1400) * industry.teamFactor + (hours / 52000) * industry.hourFactor);
        const monthlySavings = Math.round((annualizedRevenue * costSavingsRate) / 12 + team * 220 * industry.teamFactor + hours * 2.8 * industry.hourFactor);

        const productivityLift = Math.round(Math.min(46, industry.productivityBase + team * 0.22 * industry.teamFactor + (hours / 90) * industry.hourFactor));
        const implementationCost = Math.max(12000, Math.round((team * 1150 + hours * 7) * industry.implementationMultiplier));
        const roiMonths = Math.max(2, Math.round(implementationCost / Math.max(1, monthlySavings)));

        resultSavings.textContent = usd.format(monthlySavings);
        resultProductivity.textContent = `${productivityLift}%`;
        resultRoi.textContent = `${roiMonths} months`;
    };

    [industryInput, revenueInput, hoursInput, teamInput].forEach((input) => {
        input.addEventListener('input', render);
        input.addEventListener('change', render);
    });

    render();
}

setInterval(updateTrendTicker, 3500);
initSavingsCalculator();

// Initial animation trigger
window.addEventListener('load', () => {
    document.querySelectorAll('.service-card, .stat-item').forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
