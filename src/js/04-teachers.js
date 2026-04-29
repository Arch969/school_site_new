(function(){
  const section = document.querySelector('.ku-teachers');
  if (!section) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = section.querySelectorAll('.ku-teachers__reveal');
  const viewport = section.querySelector('.ku-teachers__viewport');
  const cards = Array.from(section.querySelectorAll('.ku-teacher-card'));
  const dotsRoot = section.querySelector('.ku-teachers__dots-nav');
  const prevButton = section.querySelector('.ku-teachers__arrow--prev');
  const nextButton = section.querySelector('.ku-teachers__arrow--next');

  if (!viewport || !cards.length || !dotsRoot || !prevButton || !nextButton) return;

  let activeIndex = 0;
  let scrollTicking = false;

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function updateControls() {
    const dots = dotsRoot.querySelectorAll('.ku-teachers__dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('is-active', index === activeIndex);
      dot.setAttribute('aria-current', index === activeIndex ? 'true' : 'false');
    });

    prevButton.disabled = activeIndex <= 0;
    nextButton.disabled = activeIndex >= cards.length - 1;
  }

  function scrollToCard(index) {
    activeIndex = clamp(index, 0, cards.length - 1);
    viewport.scrollTo({
      left: cards[activeIndex].offsetLeft,
      behavior: reduce ? 'auto' : 'smooth'
    });
    updateControls();
  }

  function syncFromScroll() {
    const scrollLeft = viewport.scrollLeft;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft - scrollLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      activeIndex = closestIndex;
      updateControls();
    }
  }

  function handleScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(() => {
      syncFromScroll();
      scrollTicking = false;
    });
  }

  function renderDots() {
    dotsRoot.innerHTML = '';

    cards.forEach((card, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'ku-teachers__dot' + (index === activeIndex ? ' is-active' : '');
      dot.setAttribute('aria-label', 'Перейти к преподавателю ' + card.querySelector('.ku-teacher-card__name').textContent);
      dot.setAttribute('aria-current', index === activeIndex ? 'true' : 'false');
      dot.addEventListener('click', () => scrollToCard(index));
      dotsRoot.appendChild(dot);
    });
  }

  function handleResize() {
    scrollToCard(activeIndex);
  }

  prevButton.addEventListener('click', () => scrollToCard(activeIndex - 1));
  nextButton.addEventListener('click', () => scrollToCard(activeIndex + 1));
  viewport.addEventListener('scroll', handleScroll, { passive:true });
  window.addEventListener('resize', handleResize);

  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold:.16, rootMargin:'0px 0px -8% 0px' });

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = (index * 80) + 'ms';
      io.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  renderDots();
  updateControls();
})();
