(function(){
  document.querySelectorAll('.ku-footer [data-scroll]').forEach(function(link){
    link.addEventListener('click', function(event){
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      const offset = href === '#top' ? 0 : 20;
      const top = window.pageYOffset + target.getBoundingClientRect().top - offset;
      window.scrollTo({ top:Math.max(0, top), behavior:'smooth' });
    });
  });
})();
