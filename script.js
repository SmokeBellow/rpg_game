document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const titleScreen = document.getElementById('title-screen');
    const menuScreen = document.getElementById('menu-screen');
    const classSelectScreen = document.getElementById('class-select-screen');
    const newGameButton = document.getElementById('new-game'); // Исправлено: было 'newGameButton'

    // Проверка наличия всех элементов
    console.log('Проверка элементов:');
    console.log('splashScreen:', splashScreen);
    console.log('titleScreen:', titleScreen);
    console.log('menuScreen:', menuScreen);
    console.log('classSelectScreen:', classSelectScreen);
    console.log('newGameButton:', newGameButton);

    if (!splashScreen || !titleScreen || !menuScreen || !classSelectScreen) {
        console.error('Один или несколько экранов не найдены!');
        return;
    }
    if (!newGameButton) {
        console.error('Кнопка "Новая игра" не найдена!');
        return;
    }

    // Переход от splash к title через 3 секунды
    setTimeout(() => {
        console.log('Переход: splash → title');
        console.log('splashScreen до: ', splashScreen.classList);
        splashScreen.classList.remove('active');
        titleScreen.classList.add('active');
        console.log('splashScreen после: ', splashScreen.classList);
        console.log('titleScreen после: ', titleScreen.classList);
        
        // Переход от title к menu через 3 секунды
        setTimeout(() => {
            console.log('Переход: title → menu');
            console.log('titleScreen до: ', titleScreen.classList);
            titleScreen.classList.remove('active');
            menuScreen.classList.add('active');
            console.log('titleScreen после: ', titleScreen.classList);
            console.log('menuScreen после: ', menuScreen.classList);
        }, 3000);
    }, 3000);

    // Функция для перехода к экрану выбора класса
    const goToClassSelect = () => {
        console.log('Кнопка "Новая игра" нажата');
        menuScreen.classList.remove('active');
        classSelectScreen.classList.add('active');
        console.log('menuScreen после: ', menuScreen.classList);
        console.log('classSelectScreen после: ', classSelectScreen.classList);
    };

    // Обработчики для клика и касания
    newGameButton.addEventListener('click', goToClassSelect);
    newGameButton.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Предотвращает дублирование событий
        console.log('Сенсорное событие: touchstart');
        goToClassSelect();
    });
});
