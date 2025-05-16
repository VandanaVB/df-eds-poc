/* blocks/mobile-promotion/mobile-promotion.js */
export default function decorate(block) {
  const promoSection = document.createElement('div');
  promoSection.className = 'df-mobile-promo';

  // Extract content
  const heading = block.querySelector('h2')?.textContent || 'Mobile Exclusive Offers';
  const subheading = block.querySelector('p')?.textContent || 'Download our app for special deals';
  const badges = Array.from(block.querySelectorAll('img'));

  promoSection.innerHTML = `
    <div class="df-mobile-promo-content">
      <div class="df-mobile-promo-text">
        <h2 class="df-mobile-promo-heading">${heading}</h2>
        <p class="df-mobile-promo-subheading">${subheading}</p>
        <div class="df-app-badges">
          ${badges.map(badge => `
            <a href="${badge.parentElement.href || '#'}" class="df-app-badge">
              <img src="${badge.src}" alt="${badge.alt || 'App Download Badge'}">
            </a>
          `).join('')}
        </div>
      </div>
      <div class="df-mobile-promo-image">
        <!-- Add mobile mockup image if needed -->
      </div>
    </div>
  `;

  block.textContent = '';
  block.append(promoSection);
}
