console.log("script.js loaded");

let currentInventoryTab = "weapons"; // по умолчанию оружие

// Данные NPC
const npcData = {
  "Староста Лем": {
    text: "Наш гонец ушёл с письмом к соседнему поселению, но так и не вернулся. Он не из тех, кто задерживается без причины... Пожалуйста, разыщи его. Я боюсь худшего.",
    desc: "Мудрый глава деревни, чьи глаза хранят тревогу за свой народ.",
    image: "Images/npc/oldman.jpg"
  },
  "Кузнец Бран": {
    text: "Без хорошего угля я не смогу ковать ни меча, ни подкову. Шахта к югу опустела, но уголь там всё ещё есть. Добудь немного — и я отблагодарю.",
    desc: "Грубый, но мастеровитый кузнец, чьи руки создают оружие легенд.",
    image: "Images/npc/blacksmith.jpg"
  },
  "Охотница Элира": {
    text: "Я нашла следы — крупные, с кровью. Это не волк. Что-то убивает зверей и пугает лес. Я иду на охоту. Не хочешь пойти со мной? Вдвоём у нас больше шансов.",
    desc: "Ловкая следопытка, чьё сердце принадлежит дикому лесу.",
    image: "Images/npc/hunter.jpg"
  },
  "Рыбак Нор": {
    text: "Я видел его — огромный, с усами, как у старого мудреца. Сомавр снова в пруду. Никто не может его вытащить. А ты попробуй... вдруг повезёт?",
    desc: "Седой рыбак, знающий тайны реки и её духов.",
    image: "Images/npc/fisherman.jpg"
  },
  "Мудрая жаба": {
    text: "Пей больше воды и высыпайся.",
    desc: "Она знает больше, чем кажется, и всегда говорит по делу.",
    image: "Images/npc/toad.jpg"
  },
  "Страж Ролан": {
    text: "Я на посту каждую ночь, и всё чаще слышу шаги наверху, когда башня должна быть пуста... Проверь это за меня. Я не могу уйти с поста.",
    desc: "Суровый воин, верный своему долгу охранять башню.",
    image: "Images/npc/guard.jpg"
  },
  "Старец Вейн": {
    text: "Заклятие рассыпается, как песок сквозь пальцы... Мне нужна одна старая книга. Её хранят руины на востоке. Опасное место, но ты справишься. Я чувствую это.",
    desc: "Хранитель озёрных легенд, чей взор устремлён в глубины.",
    image: "Images/npc/elder.jpg"
  },
  "Скиталец Кайр": {
    text: "Люди исчезают на старом тракте. Без шума, без следа. Я слышу шорохи в ночи, не похожие на зверей. Пройди по той дороге... но будь готов к теням.",
    desc: "Бродяга с острым умом, знающий каждый уголок каньона.",
    image: "Images/npc/wanderer.jpg"
  },
  "Комендант Рейн": {
    text: "Кто-то из моих стражей что-то скрывает. Я вижу взгляды, слышу шёпоты. Мне нужен тот, кому я могу доверять. Помоги мне выяснить правду — пока не поздно.",
    desc: "Бывший лидер крепости, жаждущий вернуть её былую славу.",
    image: "Images/npc/commander.jpg"
  },
   "Торговец Гелрик": {
    text: "У меня есть всё — от лечебных трав до трофеев пустыни! Погляди, не найдётся ли что тебе по вкусу.",
    desc: "Старый проныра с тюками товаров и историями о далёких землях. Всегда найдет, что продать.",
    image: "Images/npc/merchant.jpg"
  }
};

// Данные квестов (без Мудрой жабы)
const questData = {
  "Староста Лем": {
    title: "Пропавший гонец",
    desc: "Найди вестника в лесу",
    condition: "Найти и вернуть гонца живым",
    reward: "20 монет"
  },
  "Кузнец Бран": {
    title: "Угли для кузни",
    desc: "Добыть уголь в шахте",
    condition: "Принести 5 единиц угля",
    reward: "Прочный меч или броня"
  },
  "Охотница Элира": {
    title: "Тропами зверя",
    desc: "Убей вурдалака в лесу",
    condition: "Победить вурдалака в лесу",
    reward: "Охотничий плащ"
  },
  "Рыбак Нор": {
    title: "Большая рыба",
    desc: "Поймай редкого сомавра",
    condition: "Поймать и принести сомавра",
    reward: "Серебряный крючок"
  },
  "Страж Ролан": {
    title: "Тихая башня",
    desc: "Проверь странные звуки ночью",
    condition: "Выследить и устранить нарушителя",
    reward: "Доспех стража"
  },
  "Старец Вейн": {
    title: "Пыль времён",
    desc: "Найди древнюю книгу в руинах",
    condition: "Принести книгу из старого храма",
    reward: "Свиток заклинания или мана-камень"
  },
  "Скиталец Кайр": {
    title: "Следы теней",
    desc: "Расследуй исчезновения на дороге",
    condition: "Победить теневого врага на тракте",
    reward: "Плащ теней"
  },
  "Комендант Рейн": {
    title: "Запах мятежа",
    desc: "Раскрой заговор в крепости",
    condition: "Выявить и разоблачить заговорщиков",
    reward: "Орден коменданта"
  }
};

// Тексты для экрана перехода
const travelTexts = {
  "Деревня": "Тепло очагов зовёт путника домой...",
  "Лес": "Тени шепчут в чаще, скрывая путь...",
  "Река": "Я в своем познании настолько преисполнился...",
  "Горы": "Ветер несёт эхо древних битв...",
  "Поляна": "Звёзды над поляной предвещают судьбу...",
  "Пещера": "Тьма пещеры хранит забытые тайны...",
  "Развалины": "Камни помнят славу ушедших эпох...",
  "Башня": "Эфир кружит у стен одинокой башни...",
  "Храм": "Свет вечного огня манит вперёд...",
  "Портал": "Иные миры ждут за гранью света...",
  "Озеро": "Гладь озера скрывает древние секреты...",
  "Болото": "Туман болот таит смертельные ловушки...",
  "Каньон": "Красные скалы хранят знаки предков...",
  "Равнина": "Травы шепчут о героях прошлого...",
  "Крепость": "Стены крепости помнят клятвы рыцарей..."
};

// Иконки для предметов
const itemIcons = {
  "Зелье здоровья": "Images/items/healthpotion.png",
  "Походные сапоги": "Images/items/boots.png",
  "Лук": "Images/items/bow.png",
  "Кожаная броня": "Images/items/leatherarmor.png",
  "Кольчужный капюшон": "Images/items/chainhood.png",
  "Меч": "Images/items/sword.png",
  "Щит": "Images/items/shield.png",
  "Стальная броня": "Images/items/steelarmor.png",
  "Кинжал": "Images/items/daggers.png",
  "Плащ": "Images/items/shadowcloak.png",
  "Маска": "Images/items/mask.png",
  "Золото": "Images/items/gold.png",
};

// Описания предметов
const itemDescriptions = {
  "Зелье здоровья": "Восстанавливает 50 единиц здоровья при использовании.",
  "Походные сапоги": "Увеличивают скорость передвижения на 10%.",
  "Лук": "Оружие дальнего боя, наносит 15 урона. Только для следопыта.",
  "Меч": "Мощное оружие ближнего боя, наносит 20 урона. Только для воина.",
  "Кинжал": "Быстрое оружие, наносит 12 урона с шансом критического удара. Только для разбойника.",
  "Щит": "Блокирует 30% входящего урона. Только для воина.",
  "Кожаная броня": "Лёгкая броня, добавляет 10 защиты. Только для следопыта.",
  "Кольчужный капюшон": "Защищает голову, добавляет 5 защиты. Только для следопыта.",
  "Стальная броня": "Тяжёлая броня, добавляет 20 защиты. Только для воина.",
  "Плащ": "Лёгкий плащ, улучшающий манёвренность. Только для разбойника.",
  "Маска": "Скрывает личность, повышает скрытность. Только для разбойника.",
  "Золото": "Монеты, используемые для покупок."
};

// Данные классов
const classData = {
  archer: {
    name: "Следопыт",
    image: "Images/npc/archer.jpg",
    desc: "Искры глаз следят за каждым движением в чаще, а стрелы бьют без промаха.",
    feature: "Перемещается на 10% быстрее.",
    equipment: ["Лук", "Кожаная броня", "Кольчужный капюшон"]
  },
  warrior: {
    name: "Воин",
    image: "Images/npc/warrior.jpg",
    desc: "Сильный и выносливый боец, готовый стоять до последнего.",
    feature: "Получает на 15% меньше урона.",
    equipment: ["Меч", "Щит", "Стальная броня"]
  },
  rogue: {
    name: "Разбойник",
    image: "Images/npc/rogue.jpg",
    desc: "Тень, что крадётся в ночи, с клинком, готовым к удару.",
    feature: "Наносит на 20% больше урона при скрытной атаке.",
    equipment: ["Кинжалы", "Плащ", "Маска"]
  }
};

// Сброс всех экранов
function resetScreens() {
  document.querySelectorAll(
    "#splash-dev, #splash-title, #main-menu, #about-screen, #class-selection, #game-screen, #travel-screen, #npc-dialog, #character-screen, #quests-screen, #inventory-screen"
  ).forEach(el => {
    el.classList.remove("visible");
    el.classList.add("hidden");
  });
  document.getElementById("sidebar-menu").classList.remove("open");
  document.getElementById("menu-button").classList.add("hidden");
}

// Управление боковым меню
function closeMenuOnOutsideClick(event) {
  const sidebar = document.getElementById("sidebar-menu");
  const menuButton = document.getElementById("menu-button");
  const sidebarClose = document.getElementById("sidebar-close");
  if (sidebar.classList.contains("open") &&
      !event.target.closest("#sidebar-menu") &&
      !event.target.closest("#menu-button") &&
      !event.target.closest("#sidebar-close")) {
    toggleMenu();
  }
}

function toggleMenu() {
  const sidebar = document.getElementById("sidebar-menu");
  sidebar.classList.toggle("open");
  if (sidebar.classList.contains("open")) {
    sidebar.classList.remove("hidden");
    sidebar.classList.add("visible");
    document.addEventListener("click", closeMenuOnOutsideClick);
  } else {
    sidebar.classList.remove("visible");
    document.removeEventListener("click", closeMenuOnOutsideClick);
    setTimeout(() => {
      if (!sidebar.classList.contains("open")) {
        sidebar.classList.add("hidden");
      }
    }, 300);
  }
}

document.getElementById("sidebar-close").addEventListener("click", toggleMenu);

// Экран разговора с NPC
let currentNpc = null;

function showNpcDialog(name) {
  resetScreens();
  const dialog = document.getElementById("npc-dialog");
  document.getElementById("npc-name").innerText = name;
  document.getElementById("npc-desc").innerText = npcData[name].desc;
  document.getElementById("npc-text").innerText = npcData[name].text;
  document.getElementById("npc-image").src = npcData[name].image;
  currentNpc = name;

  const questButton = document.getElementById("npc-quest");
  const questLimitMsg = document.getElementById("quest-limit-msg");

  // Удаляем старые кнопки: кастомные и кнопки назад
  dialog.querySelectorAll(".back-button").forEach(btn => btn.remove());

  if (name === "Мудрая жаба") {
    questButton.classList.add("hidden");
    questLimitMsg.classList.add("hidden");

  } else if (name === "Торговец Гелрик") {
    questButton.classList.add("hidden");
    questLimitMsg.classList.add("hidden");

    const buyBtn = document.createElement("button");
    buyBtn.innerText = "Купить";
    buyBtn.classList.add("common-button");
    buyBtn.onclick = () => openBuyScreen();
    dialog.appendChild(buyBtn);

    const sellBtn = document.createElement("button");
    sellBtn.innerText = "Продать";
    sellBtn.classList.add("common-button");
    sellBtn.onclick = () => openSellScreen();
    dialog.appendChild(sellBtn);

  } else {
    const alreadyTaken = playerData.quests.find(q => q.npc === name);
    const tooManyQuests = playerData.quests.length >= 4;

    if (alreadyTaken) {
      questButton.classList.add("hidden");
      questLimitMsg.classList.add("hidden");
    } else if (tooManyQuests) {
      questButton.disabled = true;
      questButton.classList.remove("hidden");
      questLimitMsg.classList.remove("hidden");
    } else {
      questButton.disabled = false;
      questButton.classList.remove("hidden");
      questLimitMsg.classList.add("hidden");
    }
  }

  dialog.classList.remove("hidden");
  dialog.classList.add("visible");
}

function styleTradeButton(btn) {
  btn.className = "trade-button common-button";
}

const merchantInventory = [
  { name: "Зелье здоровья", price: 20 },
  { name: "Укрепленные сапоги", price: 50 },
  { name: "Хороший плащ", price: 80 }
];

function openBuyScreen() {
  const container = document.getElementById("trade-items");
  const title = document.getElementById("trade-title");
  title.innerText = "Покупка предметов";
  container.innerHTML = "";

  merchantInventory.forEach(item => {
    const el = document.createElement("div");
    el.className = "trade-item";
    el.innerHTML = `
      <div style="display: flex; align-items: center;">
        <img src="${itemIcons[item.name] || 'Images/items/default.png'}" alt="${item.name}" class="item-icon">
        <span>${item.name}</span>
      </div>
      <button class="trade-button" onclick="buyItem('${item.name}', ${item.price})">
        <img src="${itemIcons['Золото']}" alt="Золото" style="width: 20px; height: 20px;">
        <span>${item.price}</span>
      </button>
    `;
    const tradeButton = el.querySelector(".trade-button");
    styleTradeButton(tradeButton);
    container.appendChild(el);
  });

  document.getElementById("trade-screen").classList.remove("hidden");
}

function buyItem(itemName, price) {
  const gold = playerData.inventory.keyItems.filter(i => i === "Золото").length;
  if (gold < price) {
    alert("Недостаточно золота!");
    return;
  }

  for (let i = 0; i < price; i++) {
    const index = playerData.inventory.keyItems.indexOf("Золото");
    if (index !== -1) playerData.inventory.keyItems.splice(index, 1);
  }

  if (itemName.includes("сапоги") || itemName.includes("броня")) {
    playerData.inventory.armor.push(itemName);
  } else if (itemName.includes("Зелье")) {
    playerData.inventory.potions.push(itemName);
  } else {
    playerData.inventory.weapons.push(itemName);
  }

  alert(`Вы купили ${itemName}`);
  saveGame();
}

function openSellScreen() {
  const container = document.getElementById("trade-items");
  const title = document.getElementById("trade-title");
  title.innerText = "Продажа предметов";
  container.innerHTML = "";

  const allItems = [
    ...playerData.inventory.weapons,
    ...playerData.inventory.armor,
    ...playerData.inventory.potions
  ];

  if (allItems.length === 0) {
    container.innerHTML = "<p>У вас нет ничего на продажу.</p>";
    return;
  }

  allItems.forEach((item, index) => {
    const el = document.createElement("div");
    el.className = "trade-item";
    el.innerHTML = `
      <div style="display: flex; align-items: center;">
        <img src="${itemIcons[item] || 'Images/items/default.png'}" alt="${item}" class="item-icon">
        <span>${item}</span>
      </div>
      <button class="trade-button" onclick="sellItem('${item}', ${index})">
        <img src="${itemIcons['Золото']}" alt="Золото" style="width: 20px; height: 20px;">
        <span>10</span>
      </button>
    `;
    const tradeButton = el.querySelector(".trade-button");
    styleTradeButton(tradeButton);
    container.appendChild(el);
  });

  document.getElementById("trade-screen").classList.remove("hidden");
}

function sellItem(itemName, index) {
  const sections = ["weapons", "armor", "potions"];
  for (let section of sections) {
    const i = playerData.inventory[section].indexOf(itemName);
    if (i !== -1) {
      playerData.inventory[section].splice(i, 1);
      break;
    }
  }

  for (let i = 0; i < 10; i++) {
    playerData.inventory.keyItems.push("Золото");
  }

  alert(`Вы продали ${itemName} за 10 золота`);
  saveGame();
  openSellScreen();
}

function closeTrade() {
  document.getElementById("trade-screen").classList.add("hidden");
}

function closeNpcDialog() {
  resetScreens();
  document.getElementById("game-screen").classList.remove("hidden");
  document.getElementById("game-screen").classList.add("visible");
  document.getElementById("menu-button").classList.remove("hidden");
  document.getElementById("menu-button").classList.add("visible");
  currentNpc = null;
  updateLocation();
}

function takeQuest() {
  if (currentNpc && questData[currentNpc]) {
    const quest = questData[currentNpc];
    if (!playerData.quests.find(q => q.npc === currentNpc) && playerData.quests.length < 4) {
      playerData.quests.push({
        npc: currentNpc,
        title: quest.title,
        desc: quest.desc,
        condition: quest.condition,
        reward: quest.reward
      });
      gainXp(150);
    }
    closeNpcDialog();
  }
}

function takeQuest() {
  if (currentNpc && questData[currentNpc]) {
    const quest = questData[currentNpc];
    if (!playerData.quests.find(q => q.npc === currentNpc) && playerData.quests.length < 4) {
      playerData.quests.push({
        npc: currentNpc,
        title: quest.title,
        desc: quest.desc,
        condition: quest.condition,
        reward: quest.reward
      });
      gainXp(50);
    }
    closeNpcDialog();
  }
}

// Экран квестов
function showQuests() {
  resetScreens();
  const questsScreen = document.getElementById("quests-screen");
  const questsList = document.getElementById("quests-list");
  questsList.innerHTML = "";

  if (playerData.quests.length === 0) {
    questsList.innerHTML = '<p>У вас еще нет заданий. Походите по округ и поговорите с людьми - может кому-то нужна помощь.</p>';
  } else {
    playerData.quests.forEach((quest, index) => {
      const questItem = document.createElement("div");
      questItem.className = "quest-item";
      questItem.innerHTML = `
        <strong>${quest.title}</strong>
        <div>${quest.desc}</div>
        <div class="quest-details hidden" id="quest-details-${index}">
          <p><strong>Условие:</strong> ${quest.condition}</p>
          <p><strong>Награда:</strong> ${quest.reward}</p>
        </div>
      `;
      questItem.addEventListener("click", (e) => {
        e.stopPropagation();
        const details = document.getElementById(`quest-details-${index}`);
        const isHidden = details.classList.contains("hidden");
        document.querySelectorAll(".quest-details").forEach(d => d.classList.add("hidden"));
        if (isHidden) {
          details.classList.remove("hidden");
        }
      });
      questsList.appendChild(questItem);
    });
  }

  questsScreen.classList.remove("hidden");
  questsScreen.classList.add("visible");
  document.getElementById("menu-button").classList.remove("hidden");
  document.getElementById("menu-button").classList.add("visible");

  document.addEventListener("click", closeQuestDetailsOnOutsideClick);
}

function closeQuestDetailsOnOutsideClick(event) {
  if (!event.target.closest(".quest-item")) {
    document.querySelectorAll(".quest-details").forEach(d => d.classList.add("hidden"));
  }
}

function backToGame() {
  resetScreens();
  document.getElementById("game-screen").classList.remove("hidden");
  document.getElementById("game-screen").classList.add("visible");
  document.getElementById("menu-button").classList.remove("hidden");
  document.getElementById("menu-button").classList.add("visible");
  document.getElementById("trade-screen").classList.add("hidden");
  document.removeEventListener("click", closeQuestDetailsOnOutsideClick);
  updateLocation();
}

// Экипировка предметов
function equipItem(item, itemType) {
  if (itemType === "potion") {
    alert("Зелья нельзя экипировать!");
    return;
  }

  let inventorySection;
  if (itemType === "weapon" || itemType === "twohanded") {
    inventorySection = "weapons";
  } else if (itemType === "armor" || itemType === "helmet" || itemType === "boots") {
    inventorySection = "armor";
  } else {
    inventorySection = "keyItems";
  }

  const itemIndex = playerData.inventory[inventorySection].indexOf(item);
  if (itemIndex !== -1) {
    playerData.inventory[inventorySection].splice(itemIndex, 1);
  } else {
    console.error(`Предмет ${item} не найден в инвентаре ${inventorySection}`);
    return;
  }

  // Ограничения по классу
  const cls = playerData.class;
  const restrictedItems = {
    "Лук": "archer",
    "Меч": "warrior",
    "Щит": "warrior",
    "Кинжал": "rogue",
    "Кожаная броня": "archer",
    "Кольчужный капюшон": "archer",
    "Стальная броня": "warrior",
    "Плащ": "rogue",
    "Маска": "rogue"
  };
  if (restrictedItems[item] && restrictedItems[item] !== cls) {
    alert("Этот предмет может использовать только выбранный класс.");
    playerData.inventory[inventorySection].push(item);
    return;
  }

  if (itemType === "twohanded") {
    if (playerData.equipment.weapon1) playerData.inventory.weapons.push(playerData.equipment.weapon1);
    if (playerData.equipment.weapon2 && playerData.equipment.weapon2 !== "Лук") {
      playerData.inventory.weapons.push(playerData.equipment.weapon2);
    }
    playerData.equipment.weapon1 = item;
    playerData.equipment.weapon2 = item;
  } else if (itemType === "weapon") {
    if (item === "Щит") {
      if (playerData.equipment.weapon2) {
        playerData.inventory.weapons.push(playerData.equipment.weapon2);
      }
      playerData.equipment.weapon2 = item;
    } else {
      if (!playerData.equipment.weapon1) {
        playerData.equipment.weapon1 = item;
      } else if (!playerData.equipment.weapon2) {
        playerData.equipment.weapon2 = item;
      } else {
        playerData.inventory.weapons.push(playerData.equipment.weapon1);
        playerData.equipment.weapon1 = item;
      }
    }

    if (playerData.equipment.weapon1 === "Лук" && item !== "Лук") {
      playerData.equipment.weapon1 = null;
      playerData.equipment.weapon2 = null;
      playerData.equipment.weapon1 = item;
    }
    if (playerData.equipment.weapon2 === "Лук" && item !== "Лук") {
      playerData.equipment.weapon2 = null;
    }
  } else {
    const equipSlot = itemType === "helmet" ? "helmet"
                      : itemType === "armor" ? "armor"
                      : itemType === "boots" ? "boots"
                      : "amulet";
    if (playerData.equipment[equipSlot]) {
      playerData.inventory[inventorySection].push(playerData.equipment[equipSlot]);
    }
    playerData.equipment[equipSlot] = item;
  }

  recalculateModifiers();
  saveGame();
  showInventory(currentInventoryTab);

  if (!document.getElementById("character-screen").classList.contains("hidden")) {
    showAboutCharacter();
  }
}

// Снятие экипировки
function unequipItem(slot) {
  const item = playerData.equipment[slot];
  if (!item) return;

  const itemType = getItemType(item);
  let inventorySection;
  if (itemType === "weapon" || itemType === "twohanded") {
    inventorySection = "weapons";
  } else if (itemType === "armor" || itemType === "helmet" || itemType === "boots") {
    inventorySection = "armor";
  } else {
    inventorySection = "keyItems";
  }

  if (itemType === "twohanded") {
    playerData.inventory[inventorySection].push(item);
    playerData.equipment.weapon1 = null;
    playerData.equipment.weapon2 = null;
  } else if (slot === "weapon1" || slot === "weapon2") {
    playerData.inventory[inventorySection].push(item);
    playerData.equipment[slot] = null;
    if (item === "Лук") {
      playerData.equipment.weapon1 = null;
      playerData.equipment.weapon2 = null;
    }
  } else {
    playerData.inventory[inventorySection].push(item);
    playerData.equipment[slot] = null;
  }

  recalculateModifiers();
  saveGame();
  showAboutCharacter();
}

// Экран инвентаря
function showInventory(tabToShow) {
  resetScreens();
  const inventoryScreen = document.getElementById("inventory-screen");
  const inventoryList = document.getElementById("inventory-list");
  const inventoryEmpty = document.getElementById("inventory-empty");
  const tabs = document.querySelectorAll(".tab-button");

  if (tabToShow) currentInventoryTab = tabToShow;
  let currentTab = currentInventoryTab || "weapons";
  tabs.forEach(tab => {
    tab.classList.remove("active");
    if (tab.dataset.tab === currentTab) {
      tab.classList.add("active");
    }
  });

  function renderInventory(tab) {
    inventoryList.innerHTML = "";
    const rawItems = playerData.inventory[tab] || [];
    inventoryEmpty.classList.add("hidden");

    if (rawItems.length === 0) {
      inventoryEmpty.classList.remove("hidden");
    } else {
      const itemMap = {};
      rawItems.forEach(item => {
        itemMap[item] = (itemMap[item] || 0) + 1;
      });

      const items = Object.entries(itemMap);
      items.forEach(([item, count]) => {
        const itemType = getItemType(item);
        const itemElement = document.createElement("div");
        itemElement.className = "inventory-item";
        itemElement.innerHTML = `
          <img src="${itemIcons[item]}" alt="${item}">
          <div class="item-text">
            <div class="item-name">${item} ${count > 1 ? `×${count}` : ""}</div>
            <div class="item-desc">${itemDescriptions[item]}</div>
          </div>
          ${itemType !== "potion" && item !== "Золото" ? `<button class="common-button" onclick="equipItem('${item}', '${itemType}')">Надеть</button>` : ""}
        `;
        inventoryList.appendChild(itemElement);
      });
    }
  }

  renderInventory(currentTab);

  let keyTabClickCount = 0;
  let keyTabClickTimer = null;

  tabs.forEach(tab => {
    tab.onclick = () => {
      const selectedTab = tab.dataset.tab;
      currentInventoryTab = selectedTab;
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderInventory(currentInventoryTab);

      if (selectedTab === "keyItems") {
        keyTabClickCount++;
        if (keyTabClickCount === 5) {
          gainXp(150);
          alert("💡 Чит-код активирован: +150 XP!");
          keyTabClickCount = 0;
        }

        clearTimeout(keyTabClickTimer);
        keyTabClickTimer = setTimeout(() => {
          keyTabClickCount = 0;
        }, 3000);
      } else {
        keyTabClickCount = 0;
      }
    };
  });

  inventoryScreen.classList.remove("hidden");
  inventoryScreen.classList.add("visible");
  document.getElementById("menu-button").classList.remove("hidden");
  document.getElementById("menu-button").classList.add("visible");
}

function showSkills() {
  alert("Раздел 'Умения' в разработке!");
}

// Splash-экраны
resetScreens();
document.getElementById("splash-dev").classList.remove("hidden");
document.getElementById("splash-dev").classList.add("visible");

setTimeout(() => {
  document.getElementById("splash-dev").classList.remove("visible");
  document.getElementById("splash-dev").classList.add("hidden");
  setTimeout(() => {
    resetScreens();
    document.getElementById("splash-title").classList.remove("hidden");
    document.getElementById("splash-title").classList.add("visible");
    setTimeout(() => {
      document.getElementById("splash-title").classList.remove("visible");
      document.getElementById("splash-title").classList.add("hidden");
      setTimeout(() => {
        resetScreens();
        document.getElementById("main-menu").classList.remove("hidden");
        document.getElementById("main-menu").classList.add("visible");
      }, 500);
    }, 3000);
  }, 500);
}, 3000);

// Состояние игры
let playerData = {
  class: null,
  location: "Деревня",
  level: 1,
  xp: 0,
  quests: [],
  inventory: {
    weapons: [],
    armor: [],
    potions: [],
    keyItems: ["Золото"]
  },
  equipment: {
    weapon1: null,
    weapon2: null,
    helmet: null,
    armor: null,
    boots: null,
    amulet: null
  },
  stats: {
    strength: 5,
    agility: 5,
    endurance: 5,
    luck: 5
  },
  modifiers: {
    speedFactor: 1.0,
    damageReduction: 1.0,
    damageBoost: 1.0
  }
};

// Расстояния от Деревни
const locationDistances = {
  "Деревня": 0,
  "Лес": 1,
  "Река": 1,
  "Горы": 2,
  "Поляна": 2,
  "Пещера": 2,
  "Развалины": 3,
  "Башня": 3,
  "Храм": 4,
  "Портал": 5,
  "Озеро": 2,
  "Болото": 3,
  "Каньон": 3,
  "Равнина": 4,
  "Крепость": 5
};

// Названия локаций в винительном падеже
const locationAccusative = {
  "Деревня": "Деревню",
  "Лес": "Лес",
  "Река": "к Реке",
  "Горы": "Горы",
  "Поляна": "к Поляне",
  "Пещера": "Пещеру",
  "Развалины": "Развалины",
  "Башня": "Башню",
  "Храм": "Храм",
  "Портал": "к Порталу",
  "Озеро": "к Озеру",
  "Болото": "к Болотам",
  "Каньон": "Каньон",
  "Равнина": "к Равнине",
  "Крепость": "Крепость"
};

// Классы
function toggleClassInfo(element) {
  console.log("toggleClassInfo called");
  const options = document.querySelectorAll(".class-option");
  options.forEach(opt => {
    const details = opt.querySelector(".class-details");
    opt.classList.remove("selected");
    details.classList.add("hidden");
  });
  const details = element.querySelector(".class-details");
  details.classList.toggle("hidden");
  if (!details.classList.contains("hidden")) {
    element.classList.add("selected");
  }
}

function newGame() {
  playerData = {
    class: null,
    location: "Деревня",
    quests: [],
    inventory: {
      weapons: [],
      armor: [],
      potions: [],
      keyItems: []
    },
    equipment: {
      weapon1: null,
      weapon2: null,
      helmet: null,
      armor: null,
      boots: null,
      amulet: null
    }
  };
  resetScreens();
  document.getElementById("class-selection").classList.remove("hidden");
  document.getElementById("class-selection").classList.add("visible");
  document.querySelectorAll(".class-option").forEach(opt => {
    opt.classList.remove("selected");
    opt.querySelector(".class-details").classList.add("hidden");
  });
}

function continueGame() {
  const data = localStorage.getItem("mygame-save");
  if (data) {
    playerData = JSON.parse(data);
    startGame();
  } else {
    alert("Сохранённой игры не найдено. Начните новую игру.");
  }
}

function showAbout() {
  resetScreens();
  document.getElementById("about-screen").classList.remove("hidden");
  document.getElementById("about-screen").classList.add("visible");
}

function backToMenu() {
  resetScreens();
  document.getElementById("main-menu").classList.remove("hidden");
  document.getElementById("main-menu").classList.add("visible");
}

function selectClass() {
  if (!playerData.class) {
    const selectedOption = document.querySelector(".class-option .class-details:not(.hidden)");
    const selectedClass = selectedOption
      ? selectedOption.closest(".class-option").dataset.class
      : "warrior";
    playerData.class = selectedClass;
  }

  if (playerData.class === "archer") {
    playerData.stats = { strength: 4, agility: 7, endurance: 5, luck: 5 };
    playerData.modifiers = { speedFactor: 0.9, damageReduction: 1.0, damageBoost: 1.0 };
    playerData.inventory.weapons.push("Лук");
    playerData.inventory.armor.push("Кожаная броня", "Кольчужный капюшон");
  } else if (playerData.class === "warrior") {
    playerData.stats = { strength: 7, agility: 4, endurance: 7, luck: 4 };
    playerData.modifiers = { speedFactor: 1.0, damageReduction: 0.9, damageBoost: 1.0 };
    playerData.inventory.weapons.push("Меч", "Щит");
    playerData.inventory.armor.push("Стальная броня");
  } else if (playerData.class === "rogue") {
    playerData.stats = { strength: 5, agility: 7, endurance: 4, luck: 6 };
    playerData.modifiers = { speedFactor: 1.0, damageReduction: 1.0, damageBoost: 1.1 };
    playerData.inventory.weapons.push("Кинжал", "Кинжал");
    playerData.inventory.armor.push("Плащ", "Маска");
  }

  playerData.inventory.potions.push("Зелье здоровья");
  playerData.inventory.armor.push("Походные сапоги");
  playerData.inventory.keyItems.push("Золото", "Золото", "Золото", "Золото", "Золото");

  saveGame();
  resetScreens();
  startGame();
}

function startGame() {
  resetScreens();
  document.getElementById("game-screen").classList.remove("hidden");
  document.getElementById("game-screen").classList.add("visible");
  document.getElementById("menu-button").classList.remove("hidden");
  document.getElementById("menu-button").classList.add("visible");
  updateLocation();
}

function saveGame() {
  localStorage.setItem("mygame-save", JSON.stringify(playerData));
}

function updateLocation() {
  const locationData = {
    "Деревня": {
      desc: "Маленькая деревня, окружённая лесами и рекой. Здесь всё дышит покоем и уютом.",
      characters: ["Староста Лем", "Кузнец Бран", "Охотница Элира", "Рыбак Нор"],
      paths: ["Лес", "Река"]
    },
    "Лес": {
      desc: "Густой лес, полный теней и шорохов. Где-то вдали слышен вой.",
      characters: ["Охотница Элира"],
      paths: ["Деревня", "Поляна", "Пещера"]
    },
    "Река": {
      desc: "Спокойная река, текущая среди камней. Вода искрится под лучами солнца.",
      characters: ["Рыбак Нор"],
      paths: ["Деревня", "Озеро"]
    },
    "Горы": {
      desc: "Скалистые пики, где ветер играет с облаками.",
      characters: [],
      paths: ["Пещера", "Равнина"]
    },
    "Поляна": {
      desc: "Открытое пространство, усыпанное цветами и освещённое солнцем.",
      characters: [],
      paths: ["Лес", "Храм"]
    },
    "Пещера": {
      desc: "Тёмная и холодная пещера, полная эха и неизвестности.",
      characters: [],
      paths: ["Лес", "Горы"]
    },
    "Развалины": {
      desc: "Остатки древнего города, скрытые временем и мхом.",
      characters: ["Старец Вейн"],
      paths: ["Храм", "Болото"]
    },
    "Башня": {
      desc: "Одинокая башня, возвышающаяся над равниной.",
      characters: ["Страж Ролан"],
      paths: ["Равнина", "Каньон"]
    },
    "Храм": {
      desc: "Древний храм, где светится вечный огонь.",
      characters: [],
      paths: ["Поляна", "Развалины", "Портал"]
    },
    "Портал": {
      desc: "Таинственный портал, ведущий в иные миры.",
      characters: [],
      paths: ["Храм"]
    },
    "Озеро": {
      desc: "Глубокое озеро с прозрачной водой и загадочной тишиной.",
      characters: ["Старец Вейн"],
      paths: ["Река", "Болото"]
    },
    "Болото": {
      desc: "Туманное болото, где каждый шаг может быть последним.",
      characters: ["Скиталец Кайр"],
      paths: ["Озеро", "Развалины"]
    },
    "Каньон": {
      desc: "Узкий каньон с красными скалами и эхом прошлого.",
      characters: ["Скиталец Кайр"],
      paths: ["Башня", "Крепость"]
    },
    "Равнина": {
      desc: "Бесконечная равнина, где ветер колышет травы.",
      characters: [],
      paths: ["Горы", "Башня"]
    },
    "Крепость": {
      desc: "Могучая крепость, хранящая тайны прошлого.",
      characters: ["Комендант Рейн"],
      paths: ["Каньон"]
    }
  };

  const locationName = document.getElementById("location-name");
  const locationDesc = document.getElementById("location-desc");
  const locationButtons = document.getElementById("location-buttons");
  const extraContent = document.getElementById("extra-content");

  locationName.innerText = playerData.location;
  locationDesc.innerText = locationData[playerData.location].desc;
  locationButtons.innerHTML = "";
  extraContent.innerHTML = "";

  locationData[playerData.location].paths.forEach(path => {
    const btn = document.createElement("button");
    btn.innerText = path;
    btn.className = "common-button"; // Используем общий стиль
    btn.onclick = () => {
      const distance = locationDistances[path];
      const travelTime = Math.min(distance * 5000, 15000);
      showTravelScreen(path, travelTime);
    };
    locationButtons.appendChild(btn);
  });

  if (locationData[playerData.location].characters.length > 0) {
    const charTitle = document.createElement("div");
    charTitle.className = "section-title";
    charTitle.innerText = "Персонажи";
    const content = document.createElement("div");
    content.className = "section-content hidden";

    locationData[playerData.location].characters.forEach(name => {
      const btn = document.createElement("button");
      btn.innerText = name;
      btn.className = "common-button"; // Используем общий стиль
      btn.style.width = "100%";
      btn.style.margin = "5px 0";
      btn.onclick = () => showNpcDialog(name);
      content.appendChild(btn);
    });

    charTitle.addEventListener("click", () => {
      content.classList.toggle("hidden");
      charTitle.classList.toggle("open");
    });

    extraContent.appendChild(charTitle);
    extraContent.appendChild(content);
  }
}

function showTravelScreen(destination, time) {
  resetScreens();
  const travelScreen = document.getElementById("travel-screen");
  document.getElementById("travel-text").innerText = `Вы отправляетесь ${locationAccusative[destination]}. ${travelTexts[destination]}`;
  travelScreen.classList.remove("hidden");
  travelScreen.classList.add("visible");

  let remainingTime = time;
  const timer = setInterval(() => {
    remainingTime -= 100;
    document.getElementById("travel-timer").innerText = `Осталось: ${Math.ceil(remainingTime / 1000)} сек.`;
    if (remainingTime <= 0) {
      clearInterval(timer);
      playerData.location = destination;
      updateLocation();
      resetScreens();
      document.getElementById("game-screen").classList.remove("hidden");
      document.getElementById("game-screen").classList.add("visible");
      document.getElementById("menu-button").classList.remove("hidden");
      document.getElementById("menu-button").classList.add("visible");
    }
  }, 100);
}

function showAboutCharacter() {
  resetScreens();
  const charScreen = document.getElementById("character-screen");
  const charImage = document.getElementById("character-image");
  const playerLevel = document.getElementById("player-level");
  const currentXp = document.getElementById("current-xp");
  const xpToNext = document.getElementById("xp-to-next");
  const xpFill = document.getElementById("xp-fill");
  const charStats = document.getElementById("character-stats");

  charImage.src = classData[playerData.class].image;
  playerLevel.innerText = playerData.level;
  currentXp.innerText = playerData.xp;
  xpToNext.innerText = Math.floor(100 * Math.pow(1.5, playerData.level - 1));
  xpFill.style.width = `${(playerData.xp / Math.floor(100 * Math.pow(1.5, playerData.level - 1))) * 100}%`;

  charStats.innerHTML = `
    <div class="stat-row"><span>Сила:</span><span>${playerData.stats.strength}</span></div>
    <div class="stat-row"><span>Ловкость:</span><span>${playerData.stats.agility}</span></div>
    <div class="stat-row"><span>Выносливость:</span><span>${playerData.stats.endurance}</span></div>
    <div class="stat-row"><span>Удача:</span><span>${playerData.stats.luck}</span></div>
  `;

  const equipmentSlots = document.querySelectorAll(".equipment-slot");
  equipmentSlots.forEach(slot => {
    slot.innerText = "";
    slot.style.backgroundImage = "none";
  });

  if (playerData.equipment.helmet) {
    document.querySelector('[data-slot="helmet"]').innerText = playerData.equipment.helmet;
  }
  if (playerData.equipment.armor) {
    document.querySelector('[data-slot="armor"]').innerText = playerData.equipment.armor;
  }
  if (playerData.equipment.boots) {
    document.querySelector('[data-slot="boots"]').innerText = playerData.equipment.boots;
  }
  if (playerData.equipment.weapon1) {
    document.querySelector('[data-slot="weapon1"]').innerText = playerData.equipment.weapon1;
  }
  if (playerData.equipment.weapon2) {
    document.querySelector('[data-slot="weapon2"]').innerText = playerData.equipment.weapon2;
  }
  if (playerData.equipment.amulet) {
    document.querySelector('[data-slot="amulet"]').innerText = playerData.equipment.amulet;
  }

  charScreen.classList.remove("hidden");
  charScreen.classList.add("visible");
  document.getElementById("menu-button").classList.remove("hidden");
  document.getElementById("menu-button").classList.add("visible");
}

function gainXp(amount) {
  playerData.xp += amount;
  const xpToNextLevel = Math.floor(100 * Math.pow(1.5, playerData.level - 1));
  while (playerData.xp >= xpToNextLevel) {
    playerData.xp -= xpToNextLevel;
    playerData.level += 1;
    playerData.stats.strength += 1;
    playerData.stats.agility += 1;
    playerData.stats.endurance += 1;
    playerData.stats.luck += 1;
    alert(`Поздравляем! Вы достигли ${playerData.level} уровня!`);
  }
  saveGame();
  if (!document.getElementById("character-screen").classList.contains("hidden")) {
    showAboutCharacter();
  }
}

function getItemType(item) {
  if (item === "Лук" || item === "Меч" || item === "Кинжал" || item === "Щит") return "weapon";
  if (item === "Кожаная броня" || item === "Стальная броня" || item === "Плащ") return "armor";
  if (item === "Кольчужный капюшон") return "helmet";
  if (item === "Походные сапоги" || item === "Укрепленные сапоги") return "boots";
  if (item === "Зелье здоровья") return "potion";
  if (item === "Маска") return "amulet";
  return "keyItem";
}

function recalculateModifiers() {
  playerData.modifiers = { speedFactor: 1.0, damageReduction: 1.0, damageBoost: 1.0 };
  if (playerData.class === "archer") playerData.modifiers.speedFactor = 0.9;
  if (playerData.class === "warrior") playerData.modifiers.damageReduction = 0.85;
  if (playerData.class === "rogue") playerData.modifiers.damageBoost = 1.2;

  if (playerData.equipment.boots === "Походные сапоги") playerData.modifiers.speedFactor *= 0.9;
  if (playerData.equipment.armor === "Стальная броня") playerData.modifiers.damageReduction *= 0.9;
}

console.log("script.js loaded");