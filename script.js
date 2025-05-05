document.addEventListener('DOMContentLoaded', () => {
    const screen1 = document.getElementById('screen1');
    const screen2 = document.getElementById('screen2');
    const screen3 = document.getElementById('screen3');

    // Убедимся, что только screen1 активен изначально
    screen2.style.display = 'none';
    screen3.style.display = 'none';

    // Переход от screen1 к screen2 через 3 секунды
    setTimeout(() => {
        screen1.classList.remove('active');
        setTimeout(() => {
            screen1.style.display = 'none'; // Полностью скрываем после анимации
            screen2.style.display = 'flex'; // Показываем screen2
            setTimeout(() => {
                screen2.classList.add('active'); // Запускаем появление
            }, 10); // Небольшая задержка для корректной анимации
            // Переход от screen2 к screen3 через 4 секунды
            setTimeout(() => {
                screen2.classList.remove('active');
                setTimeout(() => {
                    screen2.style.display = 'none'; // Скрываем screen2
                    screen3.style.display = 'flex'; // Показываем screen3
                    setTimeout(() => {
                        screen3.classList.add('active'); // Запускаем появление
                    }, 10);
                }, 500); // Ждём завершения анимации (0.5s)
            }, 4000); // 4 секунды для screen2
        }, 500); // Ждём завершения анимации (0.5s)
    }, 3000); // 3 секунды для screen1
});

// Функции для кнопок
function startNewGame() {
    alert('Новая игра началась!');
    // Здесь будет логика для новой игры
}

function loadGame() {
    alert('Загрузка игры...');
    // Здесь будет логика для загрузки игры
}

function showAbout() {
    alert('Об игре: RPG Game от MurMyak Games');
    // Здесь будет логика для показа информации об игре
}
