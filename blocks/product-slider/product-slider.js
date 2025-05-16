export default function decorate(block) {
  const tabs = block.querySelectorAll('.tab-button');
  const panels = block.querySelectorAll('.tab-panel');

  // Activate the first tab and panel by default
  if (tabs.length > 0) tabs[0].classList.add('active');
  if (panels.length > 0) panels[0].classList.add('active');

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and panels
      tabs.forEach((t) => t.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));

      // Add active class to the clicked tab and corresponding panel
      tab.classList.add('active');
      panels[index]?.classList.add('active');
    });
  });
}
