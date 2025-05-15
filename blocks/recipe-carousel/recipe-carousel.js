export default function decorate(block) {
  // Create container
  const carouselSection = document.createElement('section');
  carouselSection.className = 'df-recipe-section';

  // Extract content
  const heading = block.querySelector('h2')?.textContent || 'Brighten your day with Dark Fantasy';
  const subheading = block.querySelector('p')?.textContent || 'Create indulgent recipes, post it with #darkfantasycreations and get featured on our website!';

  // Extract recipe cards data
  const recipeCards = [];
  const recipeRows = Array.from(block.querySelectorAll('.block > div > div'));

  recipeRows.forEach(row => {
    const image = row.querySelector('img');
    const title = row.querySelector('h3')?.textContent;
    const difficulty = row.querySelector('.difficulty')?.textContent || 'Easy';
    const time = row.querySelector('.time')?.textContent || '30 mins';

    if (image && title) {
      recipeCards.push({ image, title, difficulty, time });
    }
  });

  // Get CTA button info
  const ctaLink = block.querySelector('a')?.getAttribute('href') || '/recipes';
  const ctaText = block.querySelector('a')?.textContent || 'View All';

  // Build HTML structure
  carouselSection.innerHTML = `
    <h2 class="df-recipe-heading">${heading}</h2>
    <p class="df-recipe-subheading">${subheading}</p>

    <div class="df-recipe-carousel">
      <div class="df-recipe-slider">
        ${recipeCards.map(card => `
          <div class="df-recipe-card">
            <img class="df-recipe-image" src="${card.image.src}" alt="${card.image.alt || card.title}">
            <div class="df-recipe-info">
              <span class="df-recipe-difficulty">${card.difficulty}</span>
              <h3 class="df-recipe-title">${card.title}</h3>
              <p class="df-recipe-time">Time: ${card.time}</p>
            </div>
          </div>
        `).join('')}
      </div>

      <button class="df-slider-arrow df-slider-prev" aria-label="Previous slide">❮</button>
      <button class="df-slider-arrow df-slider-next" aria-label="Next slide">❯</button>

      <div class="df-slider-dots">
        ${Array(Math.ceil(recipeCards.length / 3)).fill(0).map((_, i) =>
          `<button class="df-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></button>`
        ).join('')}
      </div>
    </div>

    <a href="${ctaLink}" class="df-view-all-btn">${ctaText}</a>
  `;

  // Replace block content
  block.textContent = '';
  block.append(carouselSection);

  // Initialize carousel functionality
  initCarousel(carouselSection);
}

function initCarousel(section) {
  const slider = section.querySelector('.df-recipe-slider');
  const prevBtn = section.querySelector('.df-slider-prev');
  const nextBtn = section.querySelector('.df-slider-next');
  const dots = section.querySelectorAll('.df-dot');

  let currentIndex = 0;
  const slideCount = dots.length;

  // Handle next/prev buttons
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlider();
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSlider();
  });

  // Handle dots navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateSlider();
    });
  });

  function updateSlider() {
    // Update slider position
    const offset = -currentIndex * 100;
    slider.style.transform = `translateX(${offset}%)`;

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  // Initialize slider position
  updateSlider();
}
