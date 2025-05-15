/* blocks/social-gallery/social-gallery.js */
export default function decorate(block) {
  const gallerySection = document.createElement('div');
  gallerySection.className = 'df-social-gallery';

  // Extract content
  const hashtag = block.querySelector('h2')?.textContent || '#DarkFantasyCreations';
  const images = Array.from(block.querySelectorAll('img'));
  const ctaLink = block.querySelector('a')?.href || '#';
  const ctaText = block.querySelector('a')?.textContent || 'View More on Instagram';

  gallerySection.innerHTML = `
    <h2 class="df-social-gallery-heading">${hashtag}</h2>
    <div class="df-gallery-grid">
      ${images.map(img => `
        <div class="df-gallery-item">
          <img src="${img.src}" alt="${img.alt || 'Social media post'}">
        </div>
      `).join('')}
    </div>
    <a href="${ctaLink}" class="df-social-cta">${ctaText}</a>
  `;

  block.textContent = '';
  block.append(gallerySection);

  // Add lightbox functionality
  const galleryItems = gallerySection.querySelectorAll('.df-gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const lightbox = document.createElement('div');
      lightbox.className = 'df-lightbox';
      lightbox.innerHTML = `
        <div class="df-lightbox-content">
          <img src="${item.querySelector('img').src}" alt="${item.querySelector('img').alt}">
        </div>
      `;
      document.body.appendChild(lightbox);

      lightbox.addEventListener('click', () => {
        lightbox.remove();
      });
    });
  });
}
