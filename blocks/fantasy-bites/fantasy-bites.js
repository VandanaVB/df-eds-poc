// /blocks/fantasy-bites/fantasy-bites.js

export default function decorate(block) {
  // Create main container
  const container = document.createElement('div');
  container.className = 'fantasy-bites-container';

  // Extract authored content from block
  const extractContent = () => {
    const rows = block.querySelectorAll(':scope > div');

    return {
      heading: rows[0]?.querySelector('div:nth-child(2)')?.textContent || 'Bites of Fantasy',
      ctaText: rows[1]?.querySelector('div:nth-child(2)')?.textContent || 'View range',
      ctaLink: rows[2]?.querySelector('div:nth-child(2) a')?.getAttribute('href') || '#',
      allTabLabel: rows[3]?.querySelector('div:nth-child(2)')?.textContent || 'All',
      dessertsTabLabel: rows[4]?.querySelector('div:nth-child(2)')?.textContent || 'Desserts',
      fillsTabLabel: rows[5]?.querySelector('div:nth-child(2)')?.textContent || 'Fills',
      moreTabLabel: rows[6]?.querySelector('div:nth-child(2)')?.textContent || 'More',
      allProducts: extractProducts(rows[7]),
      dessertsProducts: extractProducts(rows[8]),
      fillsProducts: extractProducts(rows[9]),
      moreProducts: extractProducts(rows[10]),
    };
  };

  // Helper function to extract products from content fragments
  function extractProducts(row) {
    if (!row) return [];

    const links = row.querySelectorAll('div:nth-child(2) a');
    return [...links].map((link) => {
      return {
        title: link.dataset.title || link.textContent || 'Product',
        image: link.dataset.image || link.href,
        link: link.href,
        category: link.dataset.category || ''
      };
    });
  }

  // Get content
  const content = extractContent();

  // Create heading
  const heading = document.createElement('h2');
  heading.className = 'fantasy-bites-heading';
  heading.textContent = content.heading;
  container.appendChild(heading);

  // Create tabs
  const tabs = document.createElement('div');
  tabs.className = 'fantasy-bites-tabs';

  const tabData = [
    { id: 'all', label: content.allTabLabel, products: content.allProducts },
    { id: 'desserts', label: content.dessertsTabLabel, products: content.dessertsProducts },
    { id: 'fills', label: content.fillsTabLabel, products: content.fillsProducts },
    { id: 'more', label: content.moreTabLabel, products: content.moreProducts }
  ];

  tabData.forEach((tab, index) => {
    const tabElement = document.createElement('div');
    tabElement.className = `fantasy-bites-tab ${index === 0 ? 'active' : ''}`;
    tabElement.textContent = tab.label;
    tabElement.dataset.tab = tab.id;
    tabs.appendChild(tabElement);
  });

  container.appendChild(tabs);

  // Create gallery container
  const galleryContainer = document.createElement('div');
  galleryContainer.className = 'fantasy-bites-gallery-container';

  // Add navigation arrows
  const leftArrow = document.createElement('div');
  leftArrow.className = 'fantasy-bites-arrow fantasy-bites-left-arrow';
  leftArrow.innerHTML = '&#10094;';
  galleryContainer.appendChild(leftArrow);

  const rightArrow = document.createElement('div');
  rightArrow.className = 'fantasy-bites-arrow fantasy-bites-right-arrow';
  rightArrow.innerHTML = '&#10095;';
  galleryContainer.appendChild(rightArrow);

  // Create galleries for each tab
  tabData.forEach((tab, index) => {
    const gallery = document.createElement('div');
    gallery.className = `fantasy-bites-gallery ${index === 0 ? 'active' : ''}`;
    gallery.dataset.tab = tab.id;

    tab.products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.className = 'fantasy-bites-product';

      const img = document.createElement('img');
      img.className = 'fantasy-bites-product-image';
      img.src = product.image;
      img.alt = product.title;
      img.loading = 'lazy';

      productElement.appendChild(img);
      gallery.appendChild(productElement);
    });

    galleryContainer.appendChild(gallery);
  });

  container.appendChild(galleryContainer);

  // Create indicator dots
  const dots = document.createElement('div');
  dots.className = 'fantasy-bites-dots';

  // Create 5 dots (as shown in the reference image)
  for (let i = 0; i < 5; i++) {
    const dot = document.createElement('div');
    dot.className = `fantasy-bites-dot ${i === 0 ? 'active' : ''}`;
    dot.dataset.index = i;
    dots.appendChild(dot);
  }

  container.appendChild(dots);

  // Create CTA button
  const cta = document.createElement('a');
  cta.className = 'fantasy-bites-cta';
  cta.href = content.ctaLink;
  cta.textContent = content.ctaText;
  container.appendChild(cta);

  // Clear original block content and append new structure
  block.textContent = '';
  block.appendChild(container);

  // Initialize the functionality
  initTabsAndCarousel(block);
}

function initTabsAndCarousel(block) {
  const tabs = block.querySelectorAll('.fantasy-bites-tab');
  const galleries = block.querySelectorAll('.fantasy-bites-gallery');
  const dots = block.querySelectorAll('.fantasy-bites-dot');
  const leftArrow = block.querySelector('.fantasy-bites-left-arrow');
  const rightArrow = block.querySelector('.fantasy-bites-right-arrow');

  let autoScrollIntervals = {};
  let currentSlideIndexes = {
    all: 0,
    desserts: 0,
    fills: 0,
    more: 0
  };

  // Tab switching functionality
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.dataset.tab;

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Show corresponding gallery
      galleries.forEach(gallery => {
        gallery.classList.remove('active');
        if (gallery.dataset.tab === tabId) {
          gallery.classList.add('active');

          // Update dots based on current slide for this tab
          updateDots(currentSlideIndexes[tabId]);

          // Stop auto-scrolling for all galleries and restart for active one
          restartAutoScroll(tabId);
        }
      });
    });
  });

  // Initialize dot click handlers
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      const activeGallery = block.querySelector('.fantasy-bites-gallery.active');
      if (!activeGallery) return;

      const tabId = activeGallery.dataset.tab;
      const products = activeGallery.querySelectorAll('.fantasy-bites-product');
      if (index >= products.length) return;

      // Update current index
      currentSlideIndexes[tabId] = index;

      // Scroll to product
      scrollToProduct(activeGallery, products[index]);

      // Update dots
      updateDots(index);

      // Restart auto-scroll
      restartAutoScroll(tabId);
    });
  });

  // Initialize arrow handlers
  leftArrow.addEventListener('click', () => {
    const activeGallery = block.querySelector('.fantasy-bites-gallery.active');
    if (!activeGallery) return;

    const tabId = activeGallery.dataset.tab;
    const products = activeGallery.querySelectorAll('.fantasy-bites-product');

    // Decrement index with wrap-around
    currentSlideIndexes[tabId] = (currentSlideIndexes[tabId] - 1 + products.length) % products.length;

    // Scroll to product
    scrollToProduct(activeGallery, products[currentSlideIndexes[tabId]]);

    // Update dots
    updateDots(currentSlideIndexes[tabId] % dots.length);

    // Restart auto-scroll
    restartAutoScroll(tabId);
  });

  rightArrow.addEventListener('click', () => {
    const activeGallery = block.querySelector('.fantasy-bites-gallery.active');
    if (!activeGallery) return;

    const tabId = activeGallery.dataset.tab;
    const products = activeGallery.querySelectorAll('.fantasy-bites-product');

    // Increment index with wrap-around
    currentSlideIndexes[tabId] = (currentSlideIndexes[tabId] + 1) % products.length;

    // Scroll to product
    scrollToProduct(activeGallery, products[currentSlideIndexes[tabId]]);

    // Update dots
    updateDots(currentSlideIndexes[tabId] % dots.length);

    // Restart auto-scroll
    restartAutoScroll(tabId);
  });

  // Helper function to update dots
  function updateDots(activeIndex) {
    // Ensure activeIndex is within bounds of dots
    const normalizedIndex = activeIndex % dots.length;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === normalizedIndex);
    });
  }

  // Helper function to scroll to a product
  function scrollToProduct(gallery, product) {
    if (!product) return;

    // Calculate scroll position
    const scrollPosition = product.offsetLeft - gallery.offsetLeft -
      (gallery.clientWidth / 2) + (product.clientWidth / 2);

    // Scroll smoothly
    gallery.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }

  // Setup auto-scrolling for all galleries
  function setupAutoScroll() {
    // Stop any existing intervals
    Object.keys(autoScrollIntervals).forEach(key => {
      clearInterval(autoScrollIntervals[key]);
    });

    // For each gallery, set up auto-scrolling
    galleries.forEach(gallery => {
      const tabId = gallery.dataset.tab;
      const products = gallery.querySelectorAll('.fantasy-bites-product');

      if (products.length === 0) return;

      autoScrollIntervals[tabId] = setInterval(() => {
        if (!gallery.classList.contains('active')) return;

        // Increment index with wrap-around
        currentSlideIndexes[tabId] = (currentSlideIndexes[tabId] + 1) % products.length;

        // Scroll to product
        scrollToProduct(gallery, products[currentSlideIndexes[tabId]]);

        // Update dots
        updateDots(currentSlideIndexes[tabId] % dots.length);
      }, 3000);
    });
  }

  // Restart auto-scroll for a specific tab
  function restartAutoScroll(tabId) {
    if (autoScrollIntervals[tabId]) {
      clearInterval(autoScrollIntervals[tabId]);
    }

    const gallery = block.querySelector(`.fantasy-bites-gallery[data-tab="${tabId}"]`);
    const products = gallery.querySelectorAll('.fantasy-bites-product');

    if (products.length === 0) return;

    autoScrollIntervals[tabId] = setInterval(() => {
      if (!gallery.classList.contains('active')) return;

      // Increment index with wrap-around
      currentSlideIndexes[tabId] = (currentSlideIndexes[tabId] + 1) % products.length;

      // Scroll to product
      scrollToProduct(gallery, products[currentSlideIndexes[tabId]]);

      // Update dots
      updateDots(currentSlideIndexes[tabId] % dots.length);
    }, 3000);
  }

  // Initialize the auto-scrolling
  setupAutoScroll();

  // Pause auto-scrolling when hovering over gallery
  galleries.forEach(gallery => {
    gallery.addEventListener('mouseenter', () => {
      const tabId = gallery.dataset.tab;
      if (autoScrollIntervals[tabId]) {
        clearInterval(autoScrollIntervals[tabId]);
      }
    });

    gallery.addEventListener('mouseleave', () => {
      const tabId = gallery.dataset.tab;
      restartAutoScroll(tabId);
    });
  });
}
