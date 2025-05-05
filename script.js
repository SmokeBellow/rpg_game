// Показать главное меню после экрана студии
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('studio-screen').classList.remove('visible');
    document.getElementById('studio-screen').classList.add('hidden');

    document.getElementById('main-menu').classList.remove('hidden');
    document.getElementById('main-menu').classList.add('visible');
  }, 2000);
});

// Переход к выбору персонажа
const newGameBtn = document.getElementById('new-game-btn');
const mainMenu = document.getElementById('main-menu');
const characterScreen = document.getElementById('character-select-screen');

newGameBtn.addEventListener('click', () => {
  mainMenu.classList.remove('visible');
  mainMenu.classList.add('hidden');

  characterScreen.classList.remove('hidden');
  characterScreen.classList.add('visible');
});

// Выбор класса с возвратом к списку при повторном нажатии
document.querySelectorAll('.class-button').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.parentElement;
    const isExpanded = card.classList.contains('expanded');

    // Сначала свернуть все
    document.querySelectorAll('.class-card').forEach(c => {
      c.classList.remove('expanded');
      c.classList.remove('collapsed');
    });

    // Если не был открыт — раскрыть выбранный
    if (!isExpanded) {
      document.querySelectorAll('.class-card').forEach(c => {
        if (c !== card) c.classList.add('collapsed');
      });
      card.classList.add('expanded');
      card.classList.remove('collapsed');
    }
  });
});
