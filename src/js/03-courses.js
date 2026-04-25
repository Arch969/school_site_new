(function(){
  const section = document.querySelector('.ku-courses');
  if (!section) return;

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
