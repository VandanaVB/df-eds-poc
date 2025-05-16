export default function decorate(block) {
  const tabBlocks = [...block.querySelectorAll('.product-tab')];
  if (!tabBlocks.length) return;

  const tabNav = document.createElement('div');
  tabNav.className = 'tab-nav';

  const panelsContainer = document.createElement('div');
  panelsContainer.className = 'tab-panels';

  tabBlocks.forEach((tabBlock, i) => {
    const heading = tabBlock.querySelector('h3');
    const tabLabel = heading?.textContent?.trim() || `Tab ${i + 1}`;
    heading?.remove(); // remove label from inside panel

    // Create tab button
    const button = document.createElement('button');
    button.className = 'tab-button';
    button.textContent = tabLabel;
    if (i === 0) button.classList.add('active');

    // Setup panel
    const panel = document.createElement('div');
    panel.className = 'tab-panel';
    panel.append(...tabBlock.childNodes); // move content from tab
    if (i === 0) panel.classList.add('active');

    // Add behavior
    button.addEventListener('click', () => {
      tabNav.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
      panelsContainer.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      button.classList.add('active');
      panel.classList.add('active');
    });

    tabNav.appendChild(button);
    panelsContainer.appendChild(panel);
    tabBlock.remove(); // remove original tab
  });

  // Append tab UI
  block.prepend(tabNav);
  block.append(panelsContainer);
}
