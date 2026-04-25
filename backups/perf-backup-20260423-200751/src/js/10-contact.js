(function(){
  const modal = document.querySelector('[data-trial-modal]');
  const popupTriggerSelector = [
    '.ku-header__cta[href="#trial-form"]',
    '.ku-header__mobile-cta[href="#trial-form"]',
    '.ku-btn--primary[href="#trial-form"]',
    '.ku-catalog-card__primary[href="#trial-form"]',
    '.ku-start__btn[href="#trial-form"]'
  ].join(',');
  let lastFocusedElement = null;

  function closeMobileMenu(){
    const mobile = document.getElementById('kuHeaderMobile');
    const overlay = document.getElementById('kuHeaderOverlay');
    if (mobile) mobile.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-open');
  }

  function openPopup(){
    if (!modal) return;
    lastFocusedElement = document.activeElement;
    closeMobileMenu();
    document.body.style.overflow = '';
    modal.hidden = false;
    document.body.classList.add('ku-trial-modal-open');

    const firstInput = modal.querySelector('input');
    if (firstInput) {
      window.setTimeout(function(){
        firstInput.focus();
      }, 50);
    }
  }

  function closePopup(){
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('ku-trial-modal-open');

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  document.addEventListener('click', function(event){
    const target = event.target;
    if (!target || typeof target.closest !== 'function') return;

    const trigger = target.closest(popupTriggerSelector);
    if (!trigger) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    openPopup();
  }, true);

  if (modal) {
    modal.querySelectorAll('[data-trial-close]').forEach(function(closeTrigger){
      closeTrigger.addEventListener('click', closePopup);
    });

    document.addEventListener('keydown', function(event){
      if (event.key === 'Escape') closePopup();
    });
  }

  document.querySelectorAll('.ku-contact__form').forEach(function(form){
    const status = form.querySelector('.ku-contact__status');
    form.addEventListener('submit', function(event){
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (status) {
        status.textContent = 'Заявка подготовлена. Подключите отправку формы в Tilda или CRM.';
      }
    });
  });
})();
