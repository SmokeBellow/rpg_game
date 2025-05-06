document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const titleScreen = document.getElementById('title-screen');
    const menuScreen = document.getElementById('menu-screen');
    const classSelectScreen = document.getElementById('class-select-screen');
    const newGameButton = document.getElementById perlu('new-game');

    // Проверка наличия всех элементов
    console.log('Проверка элементов:');
    console.log('splashScreen:', splashScreen);
    console.log('titleScreen:', titleScreen);
    console.log('menuScreen:', menuScreen);
    console.log('classSelectScreen:', classSelectScreen);
    console.log('newGameButton:', newGameButton);

    if (!newGameButton) {
        console.error('Кнопка "Новая игра" не найдена!');
        return;
    }
    if (!classSelectScreen) {
        console.error('Экран выбора класса не найден!');
        return;
    }

    // Переход от splash к title через 3 секунды
    setTimeout(() => {
        console.log('Переход: splash → title');
        splashScreen.classList.remove('active');
        titleScreen.classList.add('active');
        
        // Переход от title к menu через 3 секунды
        setTimeout(() => {
            console.log('Переход: title → menu');
            titleScreen.classList.remove('active');
            menuScreen.classList.add('active');
        }, 3000);
    }, 3000);

    // Функция для перехода к экрану выбора класса
    const goToClassSelect = () => {
        console.log('Кнопка "Новая игра" нажата');
        menuScreen.classList.remove('active');
        classSelectScreen.classList.add('active');
        console.log('classSelectScreen классы:', classSelectScreen.classList);
    };

    // Обработчики для клика и касания
    newGameButton.addEventListener('click', goToClassSelect);
    newGameButton.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Предотвращает дублирование событий на мобильных
        console.log('Сенсорное событие: touchstart');
        goToClassSelect();
    });
});
