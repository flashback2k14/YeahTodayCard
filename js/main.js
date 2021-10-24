(() => {
  const UI = {
    cardItems: [...document.querySelectorAll('.card-item')],
  };

  const _handleCardContentVisibility = (ev) => {
    const title = ev.currentTarget.children[0];
    title.classList.toggle('active');
    const content = ev.currentTarget.children[1];
    if (content.classList.contains('hidden')) {
      content.classList.remove('hidden');
      content.classList.add('visible');
    } else {
      content.classList.remove('visible');
      content.classList.add('hidden');
    }
  };

  const _initHandler = () => {
    UI.cardItems.forEach((cardItem) => {
      cardItem.addEventListener('click', _handleCardContentVisibility);
    });
  };

  const init = () => {
    _initHandler();

    window.addEventListener('beforeunload', () => {
      UI.cardItems.forEach((cardItem) => {
        cardItem.removeEventListener('click', _handleCardContentVisibility);
      });
    });
  };

  init();
})();
