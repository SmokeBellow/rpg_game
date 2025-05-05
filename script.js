window.addEventListener('DOMContentLoaded', () => {
  const studioScreen = document.getElementById('studio-screen');
  const mainMenu = document.getElementById('main-menu');

  // Показываем студию, затем плавно переходим в главное меню
  setTimeout(() => {
    studioScreen.classList.remove('visible');
    studioScreen.classList.add('hidden');

    mainMenu.classList.remove('hidden');
    mainMenu.classList.add('visible');
  }, 2000);
});
