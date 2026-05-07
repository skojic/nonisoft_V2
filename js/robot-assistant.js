// ============================================
// HERO ROBOT ASSISTANT
// ============================================

(function initHeroRobot() {
    const robot = document.getElementById('hero-robot');
    const head = document.getElementById('robot-head');
    const leftPupil = document.getElementById('robot-pupil-left');
    const rightPupil = document.getElementById('robot-pupil-right');
    const speech = document.getElementById('robot-speech');
    const speechClientName = document.getElementById('speech-client-name');
    const speechAchievement = document.getElementById('speech-achievement');

    if (!robot || !head || !leftPupil || !rightPupil || !speech || !speechClientName || !speechAchievement) {
        return;
    }

    const clientAchievements = [
        {
            company: 'FJELLINJEN',
            achievement: 'Built intelligent chatbot for Norwegian road toll provider. Automated customer support reducing response time by 75%.'
        },
        {
            company: 'AUTOSYNC',
            achievement: 'Engineered automated road toll electronic solution with comprehensive financial invoice and payment handling. Seamlessly processes toll transactions and forced payment collection across Nordic toll roads.'
        },
        {
            company: 'AUTOSYNC',
            achievement: 'Engineered automated road toll electronic solution with comprehensive financial invoice and payment handling. Seamlessly processes toll transactions and forced payment collection across Nordic toll roads.'
        },
        {
            company: 'SENOR',
            achievement: 'Developed customer support agent system for Serbian enterprise. Improved issue resolution efficiency by 82%.'
        },
        {
            company: 'SENOR',
            achievement: 'Developed customer support agent system for Serbian enterprise. Improved issue resolution efficiency by 82%.'
        },
        {
            company: 'RFPIO',
            achievement: 'Delivered scalable web infrastructure. Enterprise-grade performance with 99.8% uptime SLA.'
        }
    ];

    let activeLine = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let talkIntervalId = null;
    let lastPointerMove = Date.now();

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    // Smooth intro after hero renders.
    requestAnimationFrame(() => {
        setTimeout(() => {
            robot.classList.add('is-visible');
            // Auto-cycle through client achievements
            startTalking();
        }, 420);
    });

    const rotateLine = () => {
        robot.classList.add('is-speaking');
        speech.classList.add('is-fading');
        setTimeout(() => {
            activeLine = (activeLine + 1) % clientAchievements.length;
            speechClientName.textContent = clientAchievements[activeLine].company;
            speechAchievement.textContent = clientAchievements[activeLine].achievement;
            speech.classList.remove('is-fading');

            // Schedule next rotation with dynamic timing
            if (talkIntervalId) {
                clearInterval(talkIntervalId);
            }
            const displayDuration = (clientAchievements[activeLine].company === 'AUTOSYNC' ||
                                     clientAchievements[activeLine].company === 'SENOR') ? 5600 : 2800;
            talkIntervalId = setInterval(rotateLine, displayDuration);
        }, 230);
    };

    const startTalking = () => {
        if (talkIntervalId) {
            return;
        }

        rotateLine();
    };

    const stopTalking = () => {
        if (talkIntervalId) {
            clearInterval(talkIntervalId);
            talkIntervalId = null;
        }

        robot.classList.remove('is-speaking');
        // Keep displaying achievement bubbles
    };

    // Keep touch users supported: tap to show next achievement
    robot.addEventListener('touchstart', () => {
        rotateLine();
    }, { passive: true });

    const handlePointer = (clientX, clientY) => {
        const rect = head.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = clientX - centerX;
        const dy = clientY - centerY;

        lastPointerMove = Date.now();
        targetX = clamp(dx / 28, -12, 12);
        targetY = clamp(dy / 30, -8, 8);
    };

    window.addEventListener('mousemove', (event) => {
        handlePointer(event.clientX, event.clientY);
    });

    window.addEventListener('touchmove', (event) => {
        if (event.touches && event.touches[0]) {
            handlePointer(event.touches[0].clientX, event.touches[0].clientY);
        }
    }, { passive: true });

    const animateFaceTracking = () => {
        // Idle scan behavior when pointer is inactive creates a unique assistant motion language.
        if (Date.now() - lastPointerMove > 2000) {
            targetX = Math.sin(Date.now() * 0.001) * 4;
            targetY = Math.cos(Date.now() * 0.0013) * 2;
        }

        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;

        head.style.transform = `rotate(${currentX * 0.35}deg)`;

        const pupilX = clamp(currentX * 0.14, -1.8, 1.8);
        const pupilY = clamp(currentY * 0.12, -1.4, 1.4);
        const pupilTransform = `translate(${pupilX}px, ${pupilY}px)`;

        leftPupil.style.transform = pupilTransform;
        rightPupil.style.transform = pupilTransform;

        requestAnimationFrame(animateFaceTracking);
    };

    animateFaceTracking();
})();
