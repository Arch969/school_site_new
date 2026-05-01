(function(){
  const root = document.querySelector('[data-course-plan]');
  if (!root) return;

  const items = Array.from(root.querySelectorAll('.ku-course-plan__item'));
  items.forEach((item) => {
    const button = item.querySelector('.ku-course-plan__button');
    if (!button) return;

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      items.forEach((entry) => entry.classList.remove('is-open'));
      if (!isOpen) item.classList.add('is-open');
    });
  });
})();
