export default function decorate(block) {
  // Create container
  const tabsSection = document.createElement('section');
  tabsSection.className = 'df-tabs-section';

  // Extract content
  const heading = block.querySelector('h2, h3')?.textContent || 'Bites of Fantasy';

  // Extract categories
  let categories = ['All', 'Desserts', 'Fills', 'More'];
  const categoryEls = block.querySelectorAll('.category');
  if (categoryEls.length > 0) {
    categories = Array.from(categoryEls).map(el => el.textContent);
  }

  // Extract products
  const products = [];
  const productRows = Array.from(block.querySelectorAll('.product'));

  productRows.forEach(row => {
    const image = row.querySelector('img');
    const name = row.querySelector('.name')?.textContent || '';
    const category = row.querySelector('.category')?.textContent || 'All';

    if (image && name) {
      products.push({ image: image.src, alt: image.alt, name, category });
    }
  });

  // Get CTA button info
  const ctaLink = block.querySelector('a')?.getAttribute('href') || '/products';
  const ctaText = block.querySelector('a')?.textContent || 'View range';

  // Build HTML structure
  tabsSection.innerHTML = `
    <h2 class="df-tabs-title">${heading}</h2>

    <div class="df-tabs-nav">
      ${categories.map(cat => `
        <button class="df-tab-btn ${cat === 'All' ? 'active' : ''}" data-category="${cat}">${cat}</button>
      `).join('')}
    </div>

    <div class="df-products-container">
      ${products.map(product => `
        <div class="df-product-item" data-category="${product.category}">
          <img class="df-product-img" src="${product.image}" alt="${product.alt || product.name}">
          <h3 class="df-product-name">${product.name}</h3>
        </div>
      `).join('')}
    </div>

    <div class="df-slider-dots">
      ${Array(Math.ceil(products.length / 6)).fill(0).map((_, i) =>
        `<button class="df-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></button>`
      ).join('')}
    </div>

    <a href="${ctaLink}" class="df-view-range-btn">${ctaText}</a>
  `;

  // Replace block content
  block.textContent = '';
  block.append(tabsSection);

  // Initialize tab functionality
  initTabs(tabsSection);
}

function initTabs(section) {
  const tabButtons = section.querySelectorAll('.df-tab-btn');
  const productItems = section.querySelectorAll('.df-product-item');

  // Add click event to tab buttons
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active tab
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter products
      const category = button.dataset.category;
      filterProducts(productItems, category);
    });
  });

  // Initialize with "All" selected
  filterProducts(productItems, 'All');
}

function filterProducts(products, category) {
  products.forEach(item => {
    if (category === 'All' || item.dataset.category === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}
