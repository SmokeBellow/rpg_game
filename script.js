document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const titleScreen = document.getElementById('title-screen');
    const menuScreen = document.getElementById('menu-screen');
    const classSelectScreen = document.getElementById('class-select-screen');
    const newGameButton = document.getElementById('new-game');
    const classButtons = document.querySelectorAll('.class-button');
    const classMenu = document.querySelector('.class-menu');

    // Проверка наличия всех элементов
    console.log('Проверка элементов:');
    console.log('splashScreen:', splashScreen);
    console.log('titleScreen:', titleScreen);
    console.log('menuScreen:', menuScreen);
    console.log('classSelectScreen:', classSelectScreen);
    console.log('newGameButton:', newGameButton);
    console.log('classButtons:', classButtons);

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

    // Переход к экрану выбора класса
    const goToClassSelect = () => {
        console.log('Кнопка "Новая игра" нажата');
        menuScreen.classList.remove('active');
        classSelectScreen.classList.add('active');
        console.log('menuScreen после: ', menuScreen.classList);
        console.log('classSelectScreen после: ', classSelectScreen.classList);
    };

    newGameButton.addEventListener('click', goToClassSelect);
    newGameButton.addEventListener('touchstart', (e) => {
        e.preventDefault();
        console.log('Сенсорное событие: touchstart');
        goToClassSelect();
    });

    // Описания классов
    const classDescriptions = {
        archer: 'Лучник — мастер дальнего боя, использующий лук и стрелы для точных и быстрых атак. Идеален для тех, кто предпочитает держать врагов на расстоянии.',
        mage: 'Маг владеет мощными заклинаниями, способными наносить урон по площади или контролировать поле боя. Требует тактического подхода и управления маной.',
        warrior: 'Воин — стойкий боец ближнего боя, полагающийся на силу и выносливость. Отлично справляется с прямыми атаками и защитой союзников.',
        rogue: 'Плут — скрытный и ловкий, специализирующийся на ударах из тени и быстрых манёврах. Подходит для игроков, любящих хитрость и скорость.'
    };

    // Обработка выбора класса
    classButtons.forEach(button => {
        const handleClassSelect = (e) => {
            e.preventDefault();
            const className = button.getAttribute('data-class');
            console.log(`Выбран класс: ${className}`);

            // Скрыть остальные кнопки мгновенно
            classButtons.forEach(btn => {
                if (btn !== button) {
                    btn.style.display = 'none';
                }
            });

            // Создать блок с описанием класса
            const details = document.createElement('div');
            details.className = 'class-details';
            details.innerHTML = `
                <h2>${button.textContent}</h2>
                <p>${classDescriptions[className]}</p>
                <button class="select-class">Выбрать</button>
                <button class="back-class">Назад</button>
            `;

            // Заменить кнопку на блок
            button.replaceWith(details);

            // Обработчик для кнопки "Назад"
            const backButton = details.querySelector('.back-class');
            backButton.addEventListener('click', () => {
                console.log('Нажата кнопка "Назад"');
                // Восстановить все кнопки
                classButtons.forEach(btn => {
                    btn.style.display = 'block';
                });
                // Вернуть исходный контейнер
                details.replaceWith(classMenu);
                classMenu.style.display = 'flex';
            });
            backButton.addEventListener('touchstart', (e) => {
                e.preventDefault();
                console.log('Сенсорное событие: Назад');
                classButtons.forEach(btn => {
                    btn.style.display = 'block';
                });
                details.replaceWith(classMenu);
                classMenu.style.display = 'flex';
            });

            // Обработчик для кнопки "Выбрать"
            const selectButton = details.querySelector('.select-class');
            selectButton.addEventListener('click', () => {
                console.log(`Подтверждён выбор класса: ${className}`);
                // Здесь можно добавить логику для продолжения игры
            });
            selectButton.addEventListener('touchstart', (e) => {
                e.preventDefault();
                console.log(`Сенсорное событие: Выбрать класс ${className}`);
                // Здесь можно добавить логику для продолжения игры
            });
        };

        button.addEventListener('click', handleClassSelect);
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleClassSelect(e);
        });
    });
});
