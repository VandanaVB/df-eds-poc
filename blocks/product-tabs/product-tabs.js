export default function decorate(block) {
  // Prefer window.ueData (if Universal Editor injects it), else use block.dataset with comma-separated values
  const heading = window.ueData?.heading || block.dataset.heading || 'Bites of Fantasy';

  // These should be arrays (multi fields)
  const categories = window.ueData?.categories ||
    (block.dataset.categories ? block.dataset.categories.split(',').map(s => s.trim()) : ['All', 'Desserts', 'Fills', 'More']);

  const productImages = window.ueData?.productImages ||
    (block.dataset.productImages ? block.dataset.productImages.split(',').map(s => s.trim()) : []);
  const productNames = window.ueData?.productNames ||
    (block.dataset.productNames ? block.dataset.productNames.split(',').map(s => s.trim()) : []);
  const productCategories = window.ueData?.productCategories ||
    (block.dataset.productCategories ? block.dataset.productCategories.split(',').map(s => s.trim()) : []);

  // Build HTML
  block.innerHTML = `
    <section class="df-product-tabs">
      <h2 class="df-tabs-heading">${heading}</h2>
      <div class="df-tabs-nav">
        ${categories.map(cat => `
          <button class="df-tab-btn${cat === 'All' ? ' active' : ''}" data-category="${cat}">${cat}</button>
        `).join('')}
      </div>
      <div class="df-products-grid">
        ${productImages.map((img, i) => `
          <div class="df-product-card" data-category="${productCategories[i] || 'All'}">
            <img src="${img}" alt="${productNames[i] || 'Product'}">
            <h3>${productNames[i] || ''}</h3>
          </div>
        `).join('')}
      </div>
    </section>
  `;

  // Filtering logic
  const tabButtons = block.querySelectorAll('.df-tab-btn');
  const productCards = block.querySelectorAll('.df-product-card');

  function filterProducts(category) {
    productCards.forEach(card => {
      const show = category === 'All' || card.dataset.category === category;
      card.style.display = show ? 'block' : 'none';
    });
  }

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      filterProducts(button.dataset.category);
    });
  });

  // Initialize with 'All'
  filterProducts('All');
}
