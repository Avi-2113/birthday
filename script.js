// ========================================
// TYPING ANIMATION FOR MESSAGE SECTION
// ========================================

// The message that will be typed out
const message = "Dear Nandini, on this special day, I want you to know how much you mean to me. Your kindness, your smile, and your beautiful soul light up the world around you. You deserve all the happiness, love, and success that life has to offer. May this year bring you countless blessings and unforgettable moments. Happy Birthday! 🎉💖";

let charIndex = 0;
const typingSpeed = 50; // Speed in milliseconds (adjust for faster/slower typing)

// Function to create typing effect
function typeWriter() {
    const typingElement = document.getElementById('typingText');
    
    if (charIndex < message.length) {
        typingElement.innerHTML += message.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, typingSpeed);
    } else {
        // Remove the blinking cursor after typing is complete
        setTimeout(() => {
            typingElement.style.borderRight = 'none';
        }, 500);
    }
}

// Start typing animation when the message section is visible
function startTypingWhenVisible() {
    const messageSection = document.getElementById('message');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && charIndex === 0) {
                typeWriter();
                observer.unobserve(messageSection);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(messageSection);
}

// ========================================
// SMOOTH SCROLLING FUNCTION
// ========================================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ========================================
// FLOATING HEARTS BACKGROUND ANIMATION
// ========================================

function createFloatingHeart() {
    const heartsContainer = document.getElementById('floatingHearts');
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '💖';
    
    // Random horizontal position
    heart.style.left = Math.random() * 100 + '%';
    
    // Random animation delay
    heart.style.animationDelay = Math.random() * 5 + 's';
    
    // Random size
    const size = Math.random() * 20 + 15;
    heart.style.fontSize = size + 'px';
    
    heartsContainer.appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, 8000);
}

// Create hearts continuously
function startHeartAnimation() {
    setInterval(createFloatingHeart, 800);
}

// ========================================
// SURPRISE BUTTON INTERACTION
// ========================================

let surpriseClicked = false;

document.addEventListener('DOMContentLoaded', function() {
    const surpriseBtn = document.getElementById('surpriseBtn');
    const hiddenMessage = document.getElementById('hiddenMessage');

    surpriseBtn.addEventListener('click', function() {
        if (!surpriseClicked) {
            // Show hidden message
            hiddenMessage.classList.add('show');
            
            // Create confetti effect
            createConfetti();
            
            // Create heart burst
            createHeartBurst();
            
            // Change button text
            surpriseBtn.innerHTML = 'You\'re Special! ✨';
            
            surpriseClicked = true;
        }
    });
});

// ========================================
// CONFETTI ANIMATION
// ========================================

function createConfetti() {
    const colors = ['#FFD700', '#FF69B4', '#FF1493', '#DDA0DD', '#FFB347', '#98FB98'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random properties
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            // Random animation duration
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 20);
    }
}

// ========================================
// HEART BURST ANIMATION
// ========================================

function createHeartBurst() {
    const surpriseBtn = document.getElementById('surpriseBtn');
    const buttonRect = surpriseBtn.getBoundingClientRect();
    const centerX = buttonRect.left + buttonRect.width / 2;
    const centerY = buttonRect.top + buttonRect.height / 2;

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = '24px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        
        document.body.appendChild(heart);

        // Random direction
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 200;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        // Animate the heart
        let posX = centerX;
        let posY = centerY;
        let opacity = 1;
        let scale = 1;

        const animateHeart = () => {
            posX += vx * 0.016;
            posY += vy * 0.016;
            opacity -= 0.02;
            scale += 0.02;

            heart.style.left = posX + 'px';
            heart.style.top = posY + 'px';
            heart.style.opacity = opacity;
            heart.style.transform = `scale(${scale})`;

            if (opacity > 0) {
                requestAnimationFrame(animateHeart);
            } else {
                heart.remove();
            }
        };

        requestAnimationFrame(animateHeart);
    }
}

// ========================================
// FADE-IN ON SCROLL ANIMATION
// ========================================

function setupScrollAnimations() {
    const cards = document.querySelectorAll('.memory-card, .glass-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// ========================================
// INITIALIZE ALL FUNCTIONS ON PAGE LOAD
// ========================================

window.addEventListener('DOMContentLoaded', function() {
    // Start the typing animation when message section is visible
    startTypingWhenVisible();
    
    // Start floating hearts animation
    startHeartAnimation();
    
    // Setup scroll animations
    setupScrollAnimations();
    
    console.log('🎉 Birthday website loaded successfully!');
    console.log('💖 Made with love for Nandini');
});

// ========================================
// OPTIONAL: ADD SPARKLE EFFECT ON CURSOR
// ========================================

// Uncomment below to add sparkle trail effect on mouse movement
/*
document.addEventListener('mousemove', function(e) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.fontSize = '20px';
    sparkle.style.zIndex = '9999';
    sparkle.style.animation = 'fadeOut 1s ease forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
});

// Add fadeOut animation for sparkles
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(style);
*/
