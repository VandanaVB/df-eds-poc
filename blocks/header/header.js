export default function decorate(block) {
  const headerDiv = document.createElement('div');
  headerDiv.className = 'header';

  // Extract logo and menu items from block content
  const logo = block.querySelector('img') || { src: '/assets/logo.png', alt: 'Dark Fantasy' };
  const menuItems = Array.from(block.querySelectorAll('a')).map(link => ({
    text: link.textContent,
    url: link.href
  }));

  // Create header HTML
  headerDiv.innerHTML = `
    <div class="df-logo">
      <a href="/">
        <img src="${logo.src}" alt="${logo.alt}" />
      </a>
    </div>
    <nav class="df-nav">
      <ul>
        ${menuItems.map(item => `
          <li><a href="${item.url}">${item.text}</a></li>
        `).join('')}
      </ul>
    </nav>
    <div class="df-search-icon">
      <a href="/search"><span class="icon-search"></span></a>
    </div>
  `;

  // Replace block content with our header
  block.textContent = '';
  block.append(headerDiv);
}
