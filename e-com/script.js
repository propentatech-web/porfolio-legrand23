document.addEventListener('DOMContentLoaded', () => {
  const tabLinks = document.querySelectorAll('.product-info .tab-link');

  function showPanel(section, panelId) {
    section.querySelectorAll('.tab-panel').forEach(panel => {
      panel.style.display = panel.id === panelId ? 'block' : 'none';
    });
    section.querySelectorAll('.tab-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${panelId}`);
    });
  }

  tabLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const section = link.closest('.product-info');
      if (!section) return;
      const panelId = link.getAttribute('href').slice(1);
      showPanel(section, panelId);
    });
  });

  document.querySelectorAll('.product-info').forEach(section => {
    const firstTab = section.querySelector('.tab-link');
    const firstPanel = section.querySelector('.tab-panel');
    if (firstTab && firstPanel) {
      showPanel(section, firstPanel.id);
    }
  });

  document.querySelectorAll('.buy-form').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const section = form.closest('.product-info');
      const productName = section ? section.querySelector('h3')?.textContent.trim() : 'Produit';
      const quantity = form.querySelector('input[type="number"]')?.value || '1';
      const selects = form.querySelectorAll('select');
      const color = selects[0]?.value || 'N/A';
      const size = selects[1]?.value || 'N/A';
      const option = selects[2]?.value || 'N/A';
      alert(`Commande simulée pour ${productName}\nQuantité : ${quantity}\nCouleur : ${color}\nTaille : ${size}\nOption : ${option}`);
    });
  });

  document.querySelectorAll('.product-info').forEach(section => {
    const details = section.querySelector('.product-details');
    if (!details) return;

    const visibleChildren = Array.from(details.children).slice(0, 3);
    const hiddenSection = document.createElement('div');
    hiddenSection.className = 'more-info';

    Array.from(details.children).slice(3).forEach(node => {
      hiddenSection.appendChild(node);
    });

    if (hiddenSection.children.length === 0) return;

    const toggleButton = document.createElement('button');
    toggleButton.type = 'button';
    toggleButton.className = 'toggle-more';
    toggleButton.textContent = 'Voir plus';
    details.appendChild(toggleButton);
    details.appendChild(hiddenSection);

    const reviews = section.querySelector('.reviews');
    const similar = section.querySelector('.similar-products');
    const collapsibleSections = [reviews, similar].filter(Boolean);
    collapsibleSections.forEach(el => el.classList.add('more-info'));

    toggleButton.addEventListener('click', () => {
      const isOpen = hiddenSection.classList.toggle('open');
      collapsibleSections.forEach(el => el.classList.toggle('open', isOpen));
      toggleButton.textContent = isOpen ? 'Voir moins' : 'Voir plus';
      if (isOpen) {
        hiddenSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
