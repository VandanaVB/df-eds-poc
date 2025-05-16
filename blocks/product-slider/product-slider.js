export default function decorate(block) {
  const tabItems = [...block.querySelectorAll('[data-aue-model="product-tab"]')];
  if (!tabItems.length) return;

  // Create tab nav and panels container
  const tabNav = document.createElement('div');
  tabNav.className = 'tab-nav';
  const panels = document.createElement('div');
  panels.className = 'tab-panels';

  tabItems.forEach((item, i) => {
    const labelEl = item.querySelector('[data-aue-prop="tabLabel"]');
    const imgEl = item.querySelector('img');

    const label = labelEl?.textContent?.trim() || `Tab ${i + 1}`;
    const imgSrc = imgEl?.getAttribute('src') || '';
    const imgAlt = imgEl?.getAttribute('alt') || '';

    // Create tab button
    const btn = document.createElement('button');
    btn.className = 'tab-button';
    btn.textContent = label;
    if (i === 0) btn.classList.add('active');
    tabNav.appendChild(btn);

    // Create tab panel
    const panel = document.createElement('div');
    panel.className = 'tab-panel';
    if (i === 0) panel.classList.add('active');

    if (imgSrc) {
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = imgAlt;
      img.className = 'product-image';
      panel.appendChild(img);
    }
    panels.appendChild(panel);

    // Event binding
    btn.addEventListener('click', () => {
      tabNav.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
      panels.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      panel.classList.add('active');
    });

    // Remove original rendered item
    item.remove();
  });

  // Add tab nav & panels to block
  block.appendChild(tabNav);
  block.appendChild(panels);
}
