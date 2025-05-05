// Переход между экранами
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(screen => {
    if (screen.id === id) {
      screen.classList.remove('hidden');
      screen.classList.add('visible');
    } else {
      screen.classList.remove('visible');
      screen.classList.add('hidden');
    }
  });
}

// Показ студии, затем главное меню
window.onload = () => {
  showScreen('studio-screen');

  setTimeout(() => {
    showScreen('main-menu');
  }, 2000);
};

// Переход к выбору персонажа
document.getElementById('new-game-btn').addEventListener('click', () => {
  showScreen('character-select-screen');
});

// Выбор и раскрытие карточки класса
const classCards = document.querySelectorAll('.class-card');

classCards.forEach(card => {
  const button = card.querySelector('.class-button');

  button.addEventListener('click', () => {
    const isExpanded = card.classList.contains('expanded');

    // Сброс всех карточек
    classCards.forEach(c => {
      c.classList.remove('expanded', 'collapsed');
    });

    // Если ранее не была раскрыта — раскрываем и скрываем остальные
    if (!isExpanded) {
      card.classList.add('expanded');
      classCards.forEach(c => {
        if (c !== card) c.classList.add('collapsed');
      });
    }
    // Если уже раскрыта — возвращаем ко всем карточкам
    else {
      // уже сброшено выше, ничего не делаем
    }
  });
});
