(function(){
  const section = document.querySelector('.ku-projects');
  if (!section) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = section.querySelectorAll('.ku-projects__reveal');
  const viewport = section.querySelector('.ku-projects__viewport');
  const track = section.querySelector('.ku-projects__track');
  const cards = Array.from(section.querySelectorAll('.ku-project-card'));
  const prevButton = section.querySelector('.ku-projects__nav--prev');
  const nextButton = section.querySelector('.ku-projects__nav--next');
  const dots = section.querySelector('.ku-projects__dots');

  let currentIndex = 0;
  let visibleCards = 3;
  let pointerStartX = 0;
  let pointerDeltaX = 0;
  let isPointerActive = false;

  function revealOnView() {
    if ('IntersectionObserver' in window && !reduce) {
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold:0.14, rootMargin:'0px 0px -8% 0px' });

      revealItems.forEach((item, index) => {
        item.style.transitionDelay = (index * 60) + 'ms';
        io.observe(item);
      });
    } else {
      revealItems.forEach((item) => item.classList.add('is-visible'));
    }
  }

  function getVisibleCardsCount() {
    if (window.innerWidth <= 760) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 3;
  }

  function getActiveCards() {
    return cards;
  }

  function getGap() {
    const styles = window.getComputedStyle(track);
    const rawGap = styles.columnGap || styles.gap || '0';
    return Number.parseFloat(rawGap) || 0;
  }

  function getMaxIndex() {
    return Math.max(0, getActiveCards().length - visibleCards);
  }

  function moveTo(index) {
    const activeCards = getActiveCards();
    const maxIndex = getMaxIndex();
    currentIndex = Math.max(0, Math.min(index, maxIndex));

    if (!activeCards.length) {
      track.style.transform = 'translate3d(0,0,0)';
      updateNav();
      renderDots();
      return;
    }

    const step = activeCards[0].offsetWidth + getGap();
    track.style.transform = 'translate3d(-' + (currentIndex * step) + 'px,0,0)';
    updateNav();
    renderDots();
  }

  function updateNav() {
    const maxIndex = getMaxIndex();
    if (prevButton) prevButton.disabled = currentIndex <= 0;
    if (nextButton) nextButton.disabled = currentIndex >= maxIndex;
  }

  function renderDots() {
    if (!dots) return;
    const count = getMaxIndex() + 1;
    dots.innerHTML = '';

    if (count <= 1) {
      dots.hidden = true;
      return;
    }

    dots.hidden = false;

    for (let i = 0; i < count; i += 1) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'ku-projects__dot' + (i === currentIndex ? ' is-active' : '');
      dot.setAttribute('aria-label', 'Перейти к слайду ' + (i + 1));
      dot.addEventListener('click', () => moveTo(i));
      dots.appendChild(dot);
    }
  }

  function updateLayout() {
    visibleCards = getVisibleCardsCount();
    moveTo(currentIndex);
  }

  function bindSwipe() {
    if (!viewport) return;

    viewport.addEventListener('touchstart', (event) => {
      if (!event.touches.length) return;
      isPointerActive = true;
      pointerStartX = event.touches[0].clientX;
      pointerDeltaX = 0;
    }, { passive:true });

    viewport.addEventListener('touchmove', (event) => {
      if (!isPointerActive || !event.touches.length) return;
      pointerDeltaX = event.touches[0].clientX - pointerStartX;
    }, { passive:true });

    viewport.addEventListener('touchend', () => {
      if (!isPointerActive) return;
      if (pointerDeltaX <= -48) moveTo(currentIndex + 1);
      if (pointerDeltaX >= 48) moveTo(currentIndex - 1);
      isPointerActive = false;
      pointerDeltaX = 0;
    });
  }

  if (prevButton) {
    prevButton.addEventListener('click', () => moveTo(currentIndex - 1));
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => moveTo(currentIndex + 1));
  }

  window.addEventListener('resize', updateLayout);

  revealOnView();
  bindSwipe();
  updateLayout();
})();
