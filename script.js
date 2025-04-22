// Get all animated elements
const animatedElements = document.querySelectorAll('.animate-up');
const aboutImage = document.querySelector('.about-section .photo');
const aboutText = document.querySelector('.about-section .about-text');
let lastScrollPosition = 0;
let hasAnimatedAboutSection = false;

// Create starfield background
const starField = document.getElementById('starField');
const numberOfStars = 200;

for (let i = 0; i < numberOfStars; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.top = `${Math.random() * 100}vh`;
  star.style.left = `${Math.random() * 100}vw`;
  star.style.animationDuration = `${1 + Math.random() * 2}s`;
  star.style.animationDelay = `${Math.random() * 3}s`;
  starField.appendChild(star);
}

// Initial animations for intro elements
function startInitialAnimations() {
  // First show the image
  setTimeout(() => {
    animatedElements[0].classList.add('visible');
    
    // Then show the text container
    setTimeout(() => {
      animatedElements[1].classList.add('visible');
      
      // Animate first paragraph
      setTimeout(() => {
        const paragraphs = animatedElements[1].querySelectorAll('p');
        paragraphs[0].classList.add('visible');
        
        // Then animate second paragraph
        setTimeout(() => {
          paragraphs[1].classList.add('visible');
          
          // Finally show school info
          setTimeout(() => {
            animatedElements[2].classList.add('visible');
          }, 300);
        }, 300);
      }, 300);
    }, 200);
  }, 100);
}

// Handle about section animation
function handleAboutSectionAnimation() {
  const aboutSection = document.querySelector('.about-section');
  const rect = aboutSection.getBoundingClientRect();
  const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom >= 0;
  const isScrollingDown = window.scrollY > lastScrollPosition;

  if (isInView && isScrollingDown) {
    aboutImage.classList.add('visible');
    aboutText.classList.add('visible');
    hasAnimatedAboutSection = true;
  } else if (!isInView && hasAnimatedAboutSection) {
    // Reset animation if scrolled above the section
    aboutImage.classList.remove('visible');
    aboutText.classList.remove('visible');
    hasAnimatedAboutSection = false;
  }

  lastScrollPosition = window.scrollY;
}

// Initialize everything
function init() {
  // Reset scroll position
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
  window.addEventListener('beforeunload', () => window.scrollTo(0, 0));

  // Start animations
  startInitialAnimations();
  
  // Set up scroll listener for about section
  window.addEventListener('scroll', handleAboutSectionAnimation);
}

// Start when page loads
window.addEventListener('load', init);