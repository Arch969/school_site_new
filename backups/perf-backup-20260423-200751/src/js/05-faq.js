(function(){
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* reveal */
  const items = document.querySelectorAll('.ku-faq .ku-faq__reveal');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold:.14, rootMargin:'0px 0px -8% 0px' });

    items.forEach((el, index) => {
      el.style.transitionDelay = (index * 70) + 'ms';
      io.observe(el);
    });
  } else {
    items.forEach(el => el.classList.add('is-visible'));
  }

  /* accordion */
  const faqItems = document.querySelectorAll('.ku-faq-item');
  faqItems.forEach((item) => {
    const button = item.querySelector('.ku-faq-item__button');
    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      faqItems.forEach((el) => el.classList.remove('is-open'));
      if (!isOpen) item.classList.add('is-open');
    });
  });

  /* smooth scroll */
  document.querySelectorAll('.ku-faq [data-scroll]').forEach((link) => {
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
