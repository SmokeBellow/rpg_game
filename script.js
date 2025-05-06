document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const titleScreen = document.getElementById('title-screen');
    const menuScreen = document.getElementById('menu-screen');
    const classSelectScreen = document.getElementById('class-select-screen');
    const newGameButton = document.getElementById('new-game');

    // Переход от splash к title через 3 секунды
    setTimeout(() => {
        splashScreen.classList.remove('active');
        titleScreen.classList.add('active');
        
        // Переход от title к menu через 3 секунды
        setTimeout(() => {
            titleScreen.classList.remove('active');
            menuScreen.classList.add('active');
        }, 3000);
    }, 3000);

    // Переход к экрану выбора класса по клику на "Новая игра"
    newGameButton.addEventListener('click', () => {
        menuScreen.classList.remove('active');
        classSelectScreen.classList.add('active');
    });
});
