const animatedElements = document.querySelectorAll('.animate-up');

// Create starfield
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

// Animation sequence
function startAnimations() {
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
    }, 300);
  }, 500);
}

// Initialize
function init() {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
  window.addEventListener('beforeunload', () => window.scrollTo(0, 0));
  startAnimations();
}

window.addEventListener('load', init);