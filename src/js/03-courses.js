(function(){
  const section = document.querySelector('.ku-courses');
  if (!section) return;

  const filters = Array.from(section.querySelectorAll('.ku-courses__filter'));
  const cards = Array.from(section.querySelectorAll('.ku-catalog-card'));

  function applyFilter(value){
    filters.forEach(function(button){
      const isActive = button.getAttribute('data-filter') === value;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    cards.forEach(function(card){
      if (value === 'all'){
        card.hidden = false;
        return;
      }

      const categories = (card.dataset.categories || '')
        .split(/\s+/)
        .filter(Boolean);

      card.hidden = !categories.includes(value);
    });
  }

  filters.forEach(function(button){
    button.setAttribute(
      'aria-pressed',
      button.classList.contains('is-active') ? 'true' : 'false'
    );

    button.addEventListener('click', function(){
      applyFilter(button.getAttribute('data-filter') || 'all');
    });
  });

  applyFilter('all');

  section.querySelectorAll('[data-scroll]').forEach(function(link){
    link.addEventListener('click', function(e){
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = window.pageYOffset + target.getBoundingClientRect().top - 20;
      window.scrollTo({ top, behavior:'smooth' });
    });
  });
})();
