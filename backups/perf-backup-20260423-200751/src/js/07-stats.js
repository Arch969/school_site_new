(function(){
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = document.querySelectorAll('.ku-stats .ku-stats__reveal');

  function formatNumber(value){
    return Math.floor(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');

          const counters = entry.target.querySelectorAll('[data-count]');
          counters.forEach((counter) => {
            const target = parseInt(counter.getAttribute('data-count'), 10);
            const duration = 1200;
            const start = performance.now();

            function tick(now){
              const progress = Math.min((now - start) / duration, 1);
              counter.textContent = formatNumber(progress * target);
              if (progress < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
          });

          observer.unobserve(entry.target);
        }
      });
    }, { threshold:.18, rootMargin:'0px 0px -8% 0px' });

    items.forEach((el, index) => {
      el.style.transitionDelay = (index * 80) + 'ms';
      io.observe(el);
    });
  } else {
    items.forEach(el => {
      el.classList.add('is-visible');
      el.querySelectorAll('[data-count]').forEach((counter) => {
        counter.textContent = formatNumber(parseInt(counter.getAttribute('data-count'), 10));
      });
    });
  }
})();
