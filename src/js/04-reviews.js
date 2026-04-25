(function(){
  const section = document.querySelector('.ku-reviews');
  if (!section) return;

  const carousel = section.querySelector('[data-video-carousel]');
  const track = section.querySelector('[data-carousel-track]');
  const prev = section.querySelector('[data-carousel-prev]');
  const next = section.querySelector('[data-carousel-next]');
  const dotsRoot = section.querySelector('[data-carousel-dots]');
  const slides = track ? Array.from(track.querySelectorAll('.ku-video-review')) : [];
  let currentIndex = 0;

  function slidesPerPage(){
    if (window.innerWidth <= 760) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 4;
  }

  function pageStarts(){
    const perPage = slidesPerPage();
    const starts = [];
    for (let index = 0; index < slides.length; index += perPage) {
      starts.push(index);
    }
    return starts.length ? starts : [0];
  }

  function pageIndexFromSlide(index){
    const starts = pageStarts();
    let bestPage = 0;
    starts.forEach((start, pageIndex) => {
      if (index >= start) bestPage = pageIndex;
    });
    return bestPage;
  }

  function scrollToSlide(index){
    if (!track || !slides[index]) return;
    currentIndex = Math.max(0, Math.min(slides.length - 1, index));
    const slide = slides[currentIndex];
    track.scrollTo({ left:slide.offsetLeft, behavior:'smooth' });
    setActiveDot(currentIndex);
  }

  function activeIndex(){
    if (!track || !slides.length) return 0;
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

  function setActiveDot(forceIndex){
    if (!dotsRoot) return;
    const index = typeof forceIndex === 'number' ? forceIndex : activeIndex();
    currentIndex = index;
    const activePage = pageIndexFromSlide(index);
    dotsRoot.querySelectorAll('.ku-video-reviews__dot').forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === activePage);
      dot.setAttribute('aria-current', dotIndex === activePage ? 'true' : 'false');
    });
  }

  function renderDots(){
    if (!dotsRoot) return;
    dotsRoot.innerHTML = '';
    pageStarts().forEach((start, pageIndex) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'ku-video-reviews__dot';
      dot.setAttribute('aria-label', 'Показать группу видеоотзывов ' + (pageIndex + 1));
      dot.addEventListener('click', () => scrollToSlide(start));
      dotsRoot.appendChild(dot);
    });
    setActiveDot(currentIndex);
  }

  if (carousel && track && slides.length) {
    renderDots();

    prev && prev.addEventListener('click', () => {
      const starts = pageStarts();
      const page = pageIndexFromSlide(currentIndex);
      scrollToSlide(starts[Math.max(0, page - 1)]);
    });
    next && next.addEventListener('click', () => {
      const starts = pageStarts();
      const page = pageIndexFromSlide(currentIndex);
      scrollToSlide(starts[Math.min(starts.length - 1, page + 1)]);
    });
    track.addEventListener('scroll', () => window.requestAnimationFrame(setActiveDot), { passive:true });
    window.addEventListener('resize', () => {
      renderDots();
      scrollToSlide(pageStarts()[pageIndexFromSlide(currentIndex)] || 0);
    });
    setActiveDot();
  }

  section.querySelectorAll('[data-scroll]').forEach((link) => {
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
