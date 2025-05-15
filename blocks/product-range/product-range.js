export default function decorate(block) {
  // Create container
  const rangeDiv = document.createElement('div');
  rangeDiv.className = 'df-product-range';

  // Extract content from block
  const headingText = block.querySelector('h1, h2')?.textContent || 'EXPLORE THE RANGE';
  const subheadingText = block.querySelector('p')?.textContent || 'TO CREATE INDULGENT RECIPES';

  // Get product images
  const productImages = Array.from(block.querySelectorAll('img'));

  // Get CTA button info
  const ctaLink = block.querySelector('a')?.getAttribute('href') || '/products';
  const ctaText = block.querySelector('a')?.textContent || 'Explore Full Range';

  // Build HTML structure
  rangeDiv.innerHTML = `
    <h2 class="df-range-heading">${headingText}</h2>
    <p class="df-range-subheading">${subheadingText}</p>

    <div class="df-product-display">
      ${productImages.map(img => `
        <div class="df-product-item">
          <img src="${img.src}" alt="${img.alt || 'Dark Fantasy product'}">
        </div>
      `).join('')}
    </div>

    <a href="${ctaLink}" class="df-cta-button">${ctaText}</a>
  `;

  // Replace block content
  block.textContent = '';
  block.append(rangeDiv);
}
