(function(){
  const header = document.getElementById('kuHeader');
  const burger = document.getElementById('kuHeaderBurger');
  const mobile = document.getElementById('kuHeaderMobile');
  const overlay = document.getElementById('kuHeaderOverlay');
  const closeBtn = document.getElementById('kuHeaderClose');

  function openMenu() {
    mobile.classList.add('is-open');
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobile.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (burger) burger.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  function handleScroll() {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive:true });

  document.querySelectorAll('.ku-header [data-scroll]').forEach((link) => {
    link.addEventListener('click', function(e){
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      closeMenu();

      const top = window.pageYOffset + target.getBoundingClientRect().top - 88;
      window.scrollTo({ top, behavior:'smooth' });
    });
  });
})();
