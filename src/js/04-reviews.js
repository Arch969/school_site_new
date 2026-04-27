(function(){
  const section = document.querySelector('.ku-reviews');
  if (!section) return;

  function setupCarousel(root) {
    const track = root.querySelector('[data-carousel-track]');
    const prev = root.querySelector('[data-carousel-prev]');
    const next = root.querySelector('[data-carousel-next]');
    const dotsRoot = root.querySelector('[data-carousel-dots]');
    const slides = track ? Array.from(track.children) : [];
    if (!track || !slides.length) return;

    let currentIndex = 0;

    function perPage() {
      if (window.innerWidth <= 760) return Number(root.getAttribute('data-per-page-mobile')) || 1;
      if (window.innerWidth <= 1100) return Number(root.getAttribute('data-per-page-tablet')) || 2;
      return Number(root.getAttribute('data-per-page-desktop')) || 3;
    }

    function pageStarts() {
      const count = perPage();
      const starts = [];
      for (let index = 0; index < slides.length; index += count) {
        starts.push(index);
      }
      return starts.length ? starts : [0];
    }

    function pageIndexFromSlide(index) {
      const starts = pageStarts();
      let page = 0;
      starts.forEach((start, currentPage) => {
        if (index >= start) page = currentPage;
      });
      return page;
    }

    function activeIndex() {
      const trackCenter = track.scrollLeft + track.clientWidth / 2;
      let bestIndex = 0;
      let bestDistance = Infinity;

      slides.forEach((slide, index) => {
        const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
        const distance = Math.abs(trackCenter - slideCenter);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = index;
        }
      });

      return bestIndex;
    }

    function setActiveDot(forceIndex) {
      if (!dotsRoot) return;
      const index = typeof forceIndex === 'number' ? forceIndex : activeIndex();
      currentIndex = index;
      const activePage = pageIndexFromSlide(index);
      dotsRoot.querySelectorAll('.ku-video-reviews__dot').forEach((dot, dotIndex) => {
        dot.classList.toggle('is-active', dotIndex === activePage);
      });
    }

    function renderDots() {
      if (!dotsRoot) return;
      dotsRoot.innerHTML = '';

      pageStarts().forEach((start, pageIndex) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'ku-video-reviews__dot';
        dot.setAttribute('aria-label', 'Перейти к слайду ' + (pageIndex + 1));
        dot.addEventListener('click', () => scrollToSlide(start));
        dotsRoot.appendChild(dot);
      });

      setActiveDot(currentIndex);
    }

    function scrollToSlide(index) {
      currentIndex = Math.max(0, Math.min(slides.length - 1, index));
      const slide = slides[currentIndex];
      if (!slide) return;
      track.scrollTo({ left:slide.offsetLeft, behavior:'smooth' });
      setActiveDot(currentIndex);
    }

    let touchStartX = 0;
    let touchDeltaX = 0;

    track.addEventListener('touchstart', (event) => {
      if (!event.touches.length) return;
      touchStartX = event.touches[0].clientX;
      touchDeltaX = 0;
    }, { passive:true });

    track.addEventListener('touchmove', (event) => {
      if (!event.touches.length) return;
      touchDeltaX = event.touches[0].clientX - touchStartX;
    }, { passive:true });

    track.addEventListener('touchend', () => {
      if (touchDeltaX <= -48) {
        scrollToSlide(pageStarts()[Math.min(pageStarts().length - 1, pageIndexFromSlide(currentIndex) + 1)]);
      } else if (touchDeltaX >= 48) {
        scrollToSlide(pageStarts()[Math.max(0, pageIndexFromSlide(currentIndex) - 1)]);
      }
      touchDeltaX = 0;
    });

    prev && prev.addEventListener('click', () => {
      const starts = pageStarts();
      scrollToSlide(starts[Math.max(0, pageIndexFromSlide(currentIndex) - 1)]);
    });

    next && next.addEventListener('click', () => {
      const starts = pageStarts();
      scrollToSlide(starts[Math.min(starts.length - 1, pageIndexFromSlide(currentIndex) + 1)]);
    });

    track.addEventListener('scroll', () => window.requestAnimationFrame(setActiveDot), { passive:true });

    window.addEventListener('resize', () => {
      renderDots();
      const starts = pageStarts();
      scrollToSlide(starts[Math.min(pageIndexFromSlide(currentIndex), starts.length - 1)] || 0);
    });

    renderDots();
  }

  section.querySelectorAll('[data-carousel]').forEach(setupCarousel);
})();
