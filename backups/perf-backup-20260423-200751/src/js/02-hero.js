(function(){
  const visual = document.getElementById('kuHeroVisual');
  if (visual && window.innerWidth > 980 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    visual.addEventListener('mousemove', function(e){
      const rect = visual.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const ry = (px - .5) * 7;
      const rx = (.5 - py) * 7;
      visual.style.transform = 'perspective(1000px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
    });
    visual.addEventListener('mouseleave', function(){
      visual.style.transform = '';
    });
  }

  document.querySelectorAll('.ku-hero [data-scroll]').forEach(function(link){
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
