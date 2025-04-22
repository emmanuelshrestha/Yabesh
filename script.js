// =============================================
// STARFIELD BACKGROUND
// =============================================
const starField = document.getElementById('starField');
const numberOfStars = 200;

// Create star elements with random positions and animations
for (let i = 0; i < numberOfStars; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.top = `${Math.random() * 100}vh`;
  star.style.left = `${Math.random() * 100}vw`;
  star.style.animationDuration = `${1 + Math.random() * 2}s`;
  star.style.animationDelay = `${Math.random() * 3}s`;
  starField.appendChild(star);
}

// =============================================
// PAGE INITIALIZATION
// =============================================
function init() {
  // Prevent scroll restoration on page refresh
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0); // Start at top of page
  
  // Start all animations
  startInitialAnimations();
  
  // Set up scroll event listeners
  window.addEventListener('scroll', handleScrollEvents);
}

// =============================================
// INTRO ANIMATIONS (Sequential appearance)
// =============================================
function startInitialAnimations() {
  const animatedElements = document.querySelectorAll('.intro-text .animate-up');
  
  // Animate elements one after another with delays
  setTimeout(() => animatedElements[0].classList.add('visible'), 100); // Image
  setTimeout(() => {
    animatedElements[1].classList.add('visible'); // Text container
    setTimeout(() => {
      const paragraphs = animatedElements[1].querySelectorAll('p');
      paragraphs[0].classList.add('visible'); // First paragraph
      setTimeout(() => {
        paragraphs[1].classList.add('visible'); // Second paragraph
        setTimeout(() => {
          animatedElements[2].classList.add('visible'); // School info
        }, 300);
      }, 300);
    }, 300);
  }, 200);
}

// =============================================
// SCROLL-BASED ANIMATIONS
// =============================================
let lastScrollPosition = 0;

function handleScrollEvents() {
  const currentScroll = window.scrollY;
  
  // Handle about section animation
  handleAboutSectionAnimation(currentScroll);
  
  // Handle footer animation
  checkFooterAnimation(currentScroll);
  
  lastScrollPosition = currentScroll;
}

// About section show/hide logic
function handleAboutSectionAnimation(currentScroll) {
  const aboutSection = document.querySelector('.about-section');
  const aboutImage = document.querySelector('.about-section .photo');
  const aboutText = document.querySelector('.about-section .about-text');
  const rect = aboutSection.getBoundingClientRect();
  
  const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom >= 0;
  const isScrollingDown = currentScroll > lastScrollPosition;

  if (isInView && isScrollingDown) {
    aboutImage.classList.add('visible');
    aboutText.classList.add('visible');
  } else if (!isInView && currentScroll < lastScrollPosition) {
    aboutImage.classList.remove('visible');
    aboutText.classList.remove('visible');
  }
}

// Footer elements animation
function checkFooterAnimation(currentScroll) {
  const footerElements = document.querySelectorAll('.footer-animation-group > div');
  const triggerPos = document.body.scrollHeight - window.innerHeight * 1.5;

  footerElements.forEach(el => {
    if (currentScroll > triggerPos && currentScroll > lastScrollPosition) {
      el.classList.add('visible'); // Animate in when scrolling down
    } else if (currentScroll < lastScrollPosition) {
      el.classList.remove('visible'); // Hide when scrolling up
    }
  });
}

// =============================================
// INTERACTIVE LINES (Mouse-controlled animation)
// =============================================
const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const centerY = window.innerHeight / 2;
const centerX = window.innerWidth / 2;
const maxAngle = 2; // Max rotation angle (degrees)
const baseLength = 600; // Starting length (px)
const maxLengthIncrease = 30; // Max additional length (px)

document.addEventListener('mousemove', (e) => {
  // Vertical rotation logic (existing)
  const yOffset = e.clientY - centerY;
  const angle = Math.min(Math.abs(yOffset) * (maxAngle / centerY), maxAngle);
  
  // Horizontal length logic (new)
  const xOffset = e.clientX - centerX;
  const lengthIncrease = Math.min(Math.abs(xOffset) * (maxLengthIncrease / centerX), maxLengthIncrease);
  
  // Apply both effects
  line1.style.transform = `translateX(-50%) rotate(${yOffset < 0 ? angle : -angle}deg)`;
  line2.style.transform = `translateX(-50%) rotate(${yOffset < 0 ? -angle : angle}deg)`;
  
  // Adjust line length (600px base + 0-30px increase)
  line1.style.width = `${baseLength + lengthIncrease}px`;
  line2.style.width = `${baseLength + lengthIncrease}px`;
});

// Reset lines when mouse leaves window
document.addEventListener('mouseleave', () => {
  line1.style.transform = 'translateX(-50%) rotate(0deg)';
  line2.style.transform = 'translateX(-50%) rotate(0deg)';
  line1.style.width = `${baseLength}px`; // Reset to 600px
  line2.style.width = `${baseLength}px`;
});

// =============================================
// START EVERYTHING WHEN PAGE LOADS
// =============================================
window.addEventListener('load', init);
window.addEventListener('beforeunload', () => window.scrollTo(0, 0));