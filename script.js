const elements = document.querySelectorAll('.animate-up');

// Animate first and second together after a short delay
setTimeout(() => {
  elements[0]?.classList.add('visible');
  elements[1]?.classList.add('visible');
}, 500); // Adjust timing if needed

// Animate the remaining elements one by one
for (let i = 2; i < elements.length; i++) {
  setTimeout(() => {
    elements[i].classList.add('visible');
  }, 500 + (i - 1) * 500); // Starts after the first two
}

const starField = document.getElementById('starField');
const numberOfStars = 200;

for (let i = 0; i < numberOfStars; i++) {
  const star = document.createElement('div');
  star.className = 'star';

  const top = Math.random() * 100;
  const left = Math.random() * 100;
  star.style.top = `${top}vh`;
  star.style.left = `${left}vw`;

  const duration = 1 + Math.random() * 2;
  const delay = Math.random() * 3;
  star.style.animationDuration = `${duration}s`;
  star.style.animationDelay = `${delay}s`;

  starField.appendChild(star);
}

// prevent scroll restoration so reload always jumps to top
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// immediately scroll to top on load/reload
window.scrollTo(0, 0);

// also cover the case where the browser tries to restore scroll
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});


const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {threshold: 0.1});

elements.forEach(el => observer.observe(el));