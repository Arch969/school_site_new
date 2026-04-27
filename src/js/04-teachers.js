(function(){
  const section = document.querySelector('.ku-teachers');
  if (!section) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = section.querySelectorAll('.ku-teachers__reveal');
  const layout = section.querySelector('.ku-teachers__layout');
  const cards = Array.from(section.querySelectorAll('.ku-teacher-card'));
  const dotsRoot = section.querySelector('.ku-teachers__dots-nav');
  let activeIndex = 0;
  let scrollTicking = false;

  function isMobileSlider() {
    return window.innerWidth <= 860;
  }

  function getStep() {
    if (!layout || !cards.length) return 0;
    const style = window.getComputedStyle(layout);
    const gap = Number.parseFloat(style.columnGap || style.gap || '0') || 0;
    return cards[0].offsetWidth + gap;
  }

  function updateActiveDot() {
    if (!dotsRoot) return;
    const dots = dotsRoot.querySelectorAll('.ku-teachers__dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('is-active', index === activeIndex);
    });
  }

  function moveTo(index) {
    if (!layout || !cards.length) return;
    const maxIndex = Math.max(0, cards.length - 1);
    activeIndex = Math.max(0, Math.min(index, maxIndex));
    const step = getStep();
    layout.scrollTo({
      left: activeIndex * step,
      behavior: reduce ? 'auto' : 'smooth'
    });
    updateActiveDot();
  }

  function syncFromScroll() {
    if (!layout || !cards.length) return;
    const step = getStep();
    if (!step) return;
    activeIndex = Math.max(0, Math.min(cards.length - 1, Math.round(layout.scrollLeft / step)));
    updateActiveDot();
  }

  function renderDots() {
    if (!dotsRoot) return;

    if (!isMobileSlider()) {
      dotsRoot.hidden = true;
      dotsRoot.innerHTML = '';
      return;
    }

    dotsRoot.hidden = cards.length <= 1;
    dotsRoot.innerHTML = '';

    cards.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'ku-teachers__dot' + (index === activeIndex ? ' is-active' : '');
      dot.setAttribute('aria-label', 'Перейти к преподавателю ' + (index + 1));
      dot.addEventListener('click', () => moveTo(index));
      dotsRoot.appendChild(dot);
    });
  }

  function handleScroll() {
    if (!isMobileSlider() || scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(() => {
      syncFromScroll();
      scrollTicking = false;
    });
  }

  function handleResize() {
    renderDots();
    if (!isMobileSlider() || !layout) return;
    moveTo(activeIndex);
  }

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
    items.forEach((el) => el.classList.add('is-visible'));
  }

  if (layout && dotsRoot && cards.length) {
    layout.addEventListener('scroll', handleScroll, { passive:true });
    window.addEventListener('resize', handleResize);
    renderDots();
    updateActiveDot();
  }
})();
