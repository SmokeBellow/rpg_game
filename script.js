// Splash-экраны
setTimeout(() => {
  document.getElementById("splash-dev").style.display = "none";
  setTimeout(() => {
    document.getElementById("splash-title").style.display = "none";
    document.getElementById("main-menu").classList.remove("hidden");
  }, 3000);
}, 3000);

// Состояние игры
let playerData = {
  class: null,
  location: "Деревня"
};

// Классы
function toggleClassInfo(id) {
  const el = document.getElementById(id + "-info");
  el.classList.toggle("hidden");
}

function newGame() {
  playerData = { class: null, location: "Деревня" };
  document.getElementById("main-menu").classList.add("hidden");
  document.getElementById("class-selection").classList.remove("hidden");
}

function continueGame() {
  const data = localStorage.getItem("mygame-save");
  if (data) {
    playerData = JSON.parse(data);
    startGame();
  }
}

function showAbout() {
  document.getElementById("main-menu").classList.add("hidden");
  document.getElementById("about-screen").classList.remove("hidden");
}

function backToMenu() {
  document.getElementById("about-screen").classList.add("hidden");
  document.getElementById("main-menu").classList.remove("hidden");
}

function selectClass() {
  if (!playerData.class) {
    const selected = ["archer", "warrior", "rogue"].find(id =>
      !document.getElementById(id + "-info").classList.contains("hidden")
    );
    playerData.class = selected || "warrior";
  }
  document.getElementById("class-selection").classList.add("hidden");
  startGame();
}

function startGame() {
  document.getElementById("game-screen").classList.remove("hidden");
  updateLocation();
}

function saveGame() {
  localStorage.setItem("mygame-save", JSON.stringify(playerData));
}

// Локации
const locations = {
  "Деревня": {
    desc: "Деревня — сердце земель. Здесь живут старейшины, кузнецы, фермеры. Солнечные лучи падают на крыши домов, из дымоходов идёт лёгкий дым.",
    paths: ["Лес", "Река"],
    characters: ["Староста Лем", "Кузнец Бран"],
    monsters: []
  },
  "Лес": {
    desc: "Густой лес с вековыми деревьями. Шепоты листьев скрывают движение лесных созданий и следопытов.",
    paths: ["Деревня", "Горы", "Поляна"],
    characters: ["Охотница Элира"],
    monsters: ["Древесный ужас", "Тенелис"]
  },
  "Река": {
    desc: "Быстрая река с кристальной водой. На её берегах укрываются духи воды и одинокие рыбаки.",
    paths: ["Деревня", "Пещера"],
    characters: ["Рыбак Нор"],
    monsters: ["Водяная тварь"]
  },
  "Горы": {
    desc: "Скалистые пики возвышаются в облака. Камни древних путей покрыты мхом и ледяным налётом.",
    paths: ["Лес", "Развалины"],
    characters: [],
    monsters: ["Горный голем"]
  },
  "Поляна": {
    desc: "Поляна в сердце леса, освещённая луной. Здесь древние духи встречаются на лунных кругах.",
    paths: ["Лес", "Башня"],
    characters: ["Мудрец Айрен"],
    monsters: []
  },
  "Пещера": {
    desc: "Пещера в скале ведёт вниз, туда, где эхо скрывает движение слизней и пауков.",
    paths: ["Река", "Развалины"],
    characters: [],
    monsters: ["Слизень", "Пещерный паук"]
  },
  "Развалины": {
    desc: "Руины старого города. Каменные арки, обросшие плющом, и призраки прошлого бродят среди стен.",
    paths: ["Горы", "Пещера", "Храм"],
    characters: [],
    monsters: ["Призрак легиона"]
  },
  "Башня": {
    desc: "Старая башня на холме. Её окна запечатаны, но магия всё ещё витает внутри.",
    paths: ["Поляна", "Храм"],
    characters: ["Страж башни Ролан"],
    monsters: []
  },
  "Храм": {
    desc: "Полуразрушенный храм древних богов. Пламя светильников горит, несмотря на ветер и дождь.",
    paths: ["Башня", "Развалины", "Портал"],
    characters: [],
    monsters: ["Служитель Тени"]
  },
  "Портал": {
    desc: "Каменный круг и мерцающий портал в его центре. Эфирные энергии пульсируют в воздухе.",
    paths: ["Храм"],
    characters: [],
    monsters: ["Страж Бездны"]
  }
};

function updateLocation() {
  const loc = playerData.location;
  const data = locations[loc];
  document.getElementById("location-name").innerText = loc;
  document.getElementById("location-desc").innerText = data.desc;

  const buttons = document.getElementById("location-buttons");
  buttons.innerHTML = "";

  data.paths.forEach(path => {
    const btn = document.createElement("button");
    btn.innerText = path;
    btn.onclick = () => {
      playerData.location = path;
      saveGame();
      updateLocation();
    };
    buttons.appendChild(btn);
  });

  document.querySelectorAll(".section-title, .toggle-section, .section-content").forEach(e => e.remove());

  const gameScreen = document.getElementById("game-screen");

  if (data.characters.length > 0) {
    const charTitle = document.createElement("div");
    charTitle.className = "section-title";
    charTitle.innerText = "Персонажи";
    gameScreen.appendChild(charTitle);

    const toggle = document.createElement("div");
    toggle.className = "toggle-section";
    toggle.innerText = "Показать / скрыть";
    const content = document.createElement("div");
    content.className = "section-content hidden";

    data.characters.forEach(name => {
      const p = document.createElement("div");
      p.innerText = "- " + name;
      content.appendChild(p);
    });

    toggle.onclick = () => content.classList.toggle("hidden");

    gameScreen.appendChild(toggle);
    gameScreen.appendChild(content);
  }

  if (data.monsters.length > 0) {
    const monTitle = document.createElement("div");
    monTitle.className = "section-title";
    monTitle.innerText = "Монстры";
    gameScreen.appendChild(monTitle);

    const toggle = document.createElement("div");
    toggle.className = "toggle-section";
    toggle.innerText = "Показать / скрыть";
    const content = document.createElement("div");
    content.className = "section-content hidden";

    data.monsters.forEach(name => {
      const m = document.createElement("div");
      m.innerText = "- " + name;
      content.appendChild(m);
    });

    toggle.onclick = () => content.classList.toggle("hidden");

    gameScreen.appendChild(toggle);
    gameScreen.appendChild(content);
  }
}
