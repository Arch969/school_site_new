(function(){
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = document.querySelectorAll('.ku-trust .ku-trust__reveal');

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
})();
