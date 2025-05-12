// blocks/header/header.js
export default function decorate(block) {
  // Create header structure
  const headerEl = document.createElement('header');
  headerEl.classList.add('site-header');
  
  // Logo
  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('logo-wrapper');
  
  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.setAttribute('data-block-edit', 'logo-link');
  
  const logoImg = document.createElement('img');
  logoImg.src = '/images/darkfantasy-logo.png'; 
  logoImg.alt = 'Dark Fantasy Creations';
  logoImg.setAttribute('data-block-edit', 'logo-image');
  
  logoLink.appendChild(logoImg);
  logoWrapper.appendChild(logoLink);
  
  // Site title that can be edited with Universal Editor
  const siteTitle = document.createElement('div');
  siteTitle.classList.add('site-title');
  siteTitle.setAttribute('data-block-edit', 'site-title');
  siteTitle.textContent = 'Dark Fantasy Creations';
  
  // Navigation
  const nav = document.createElement('nav');
  nav.classList.add('main-nav');
  
  const navList = document.createElement('ul');
  
  // Get navigation items from the block or use defaults
  const navItems = block.querySelectorAll(':scope > div') || [];
  
  if (navItems.length) {
    // Use navigation items from content
    navItems.forEach((row) => {
      const cols = row.children;
      const navItem = document.createElement('li');
      
      if (cols && cols[0]) {
        const link = document.createElement('a');
        link.href = cols[1] ? cols[1].textContent : '#';
        link.textContent = cols[0].textContent;
        link.setAttribute('data-block-edit', `nav-link-${cols[0].textContent.toLowerCase().replace(/\s+/g, '-')}`);
        navItem.appendChild(link);
        navList.appendChild(navItem);
      }
    });
  } else {
    // Default navigation if none is provided
    const defaultNavItems = [
      { text: 'Home', url: '/' },
      { text: 'Gallery', url: '/gallery' },
      { text: 'About', url: '/about' },
      { text: 'Contact', url: '/contact' }
    ];
    
    defaultNavItems.forEach(item => {
      const navItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = item.url;
      link.textContent = item.text;
      link.setAttribute('data-block-edit', `nav-link-${item.text.toLowerCase()}`);
      navItem.appendChild(link);
      navList.appendChild(navItem);
    });
  }
  
  // Mobile menu toggle
  const menuToggle = document.createElement('button');
  menuToggle.classList.add('menu-toggle');
  menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
  menuToggle.innerHTML = '<span></span><span></span><span></span>';
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
    menuToggle.classList.toggle('active');
  });
  
  nav.appendChild(navList);
  
  // Assemble the header
  headerEl.appendChild(logoWrapper);
  headerEl.appendChild(siteTitle);
  headerEl.appendChild(nav);
  headerEl.appendChild(menuToggle);
  
  // Replace the original block content with our new header
  block.innerHTML = '';
  block.appendChild(headerEl);
  
  // Add event listeners for scroll effects
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      headerEl.classList.add('scrolled');
    } else {
      headerEl.classList.remove('scrolled');
    }
  });
}