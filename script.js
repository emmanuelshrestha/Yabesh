// =============================================
// GLOBAL VARIABLES
// =============================================
const starField = document.getElementById('starField');
const numberOfStars = 200;
const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
let lastScrollPosition = 0; // Single source of truth for scroll position
let isScrolling = false;

// =============================================
// STARFIELD BACKGROUND
// =============================================
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
// UP ARROW COMPONENT
// =============================================
function initUpArrow() {
  // Create arrow element
  const arrow = document.createElement('button');
  arrow.id = 'up-arrow';
  arrow.innerHTML = '↑';
  arrow.ariaLabel = 'Restart page';
  document.body.appendChild(arrow);

  // Scroll visibility handler
  window.addEventListener('scroll', () => {
    arrow.style.opacity = window.scrollY > 300 ? '1' : '0';
    arrow.style.pointerEvents = window.scrollY > 300 ? 'all' : 'none';
  });

  // Click handler (matches your logo functionality)
  arrow.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => location.reload(), 500);
  });
}

// =============================================
// PAGE INITIALIZATION
// =============================================
function init() {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
  startInitialAnimations();
  setupEventListeners();
  initUpArrow();
}


// =============================================
// ANIMATION FUNCTIONS
// =============================================
function startInitialAnimations() {
  const animatedElements = document.querySelectorAll('.intro-text .animate-up');
  
  setTimeout(() => animatedElements[0].classList.add('visible'), 100);
  setTimeout(() => {
    animatedElements[1].classList.add('visible');
    setTimeout(() => {
      const paragraphs = animatedElements[1].querySelectorAll('p');
      paragraphs[0].classList.add('visible');
      setTimeout(() => {
        paragraphs[1].classList.add('visible');
        setTimeout(() => {
          animatedElements[2].classList.add('visible');
        }, 300);
      }, 300);
    }, 300);
  }, 200);
}

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

function checkFooterAnimation(currentScroll) {
  const footerElements = document.querySelectorAll('.footer-animation-group > div');
  const footerSection = document.querySelector('.footer-section');
  const footerRect = footerSection.getBoundingClientRect();
  
  const footerInView = (
    footerRect.top < (window.innerHeight + 100) && 
    footerRect.bottom >= 0
  );

  footerElements.forEach(el => {
    if (footerInView) {
      el.classList.add('visible');
    } else if (currentScroll < lastScrollPosition) {
      el.classList.remove('visible');
    }
  });
}

// =============================================
// EVENT HANDLERS
// =============================================
function handleScrollEvents() {
  const currentScroll = window.scrollY;
  
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      handleAboutSectionAnimation(currentScroll);
      checkFooterAnimation(currentScroll);
      lastScrollPosition = currentScroll;
      isScrolling = false;
    });
    isScrolling = true;
  }
}

function setupInteractiveLines(e) {
  const centerY = window.innerHeight / 2;
  const centerX = window.innerWidth / 2;
  const maxAngle = 2;
  const baseLength = 500;
  const maxLengthIncrease = 70;

  const yOffset = e.clientY - centerY;
  const angle = Math.min(Math.abs(yOffset) * (maxAngle / centerY), maxAngle);
  const xOffset = e.clientX - centerX;
  const lengthIncrease = Math.min(Math.abs(xOffset) * (maxLengthIncrease / centerX), maxLengthIncrease);
  
  line1.style.transform = `translateX(-50%) rotate(${yOffset < 0 ? angle : -angle}deg)`;
  line2.style.transform = `translateX(-50%) rotate(${yOffset < 0 ? -angle : angle}deg)`;
  line1.style.width = `${baseLength + lengthIncrease}px`;
  line2.style.width = `${baseLength + lengthIncrease}px`;
}

function resetInteractiveLines() {
  line1.style.transform = 'translateX(-50%) rotate(0deg)';
  line2.style.transform = 'translateX(-50%) rotate(0deg)';
  line1.style.width = '500px';
  line2.style.width = '500px';
}

function setupEventListeners() {
  window.addEventListener('scroll', handleScrollEvents);
  document.addEventListener('mousemove', setupInteractiveLines);
  document.addEventListener('mouseleave', resetInteractiveLines);
}

// =============================================
// INITIALIZE
// =============================================
window.addEventListener('load', init);
window.addEventListener('beforeunload', () => window.scrollTo(0, 0));