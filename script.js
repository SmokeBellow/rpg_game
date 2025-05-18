const locations = {
  "Деревня": {
    desc: "Тихая деревушка с пахнущими свежим хлебом улицами.",
    paths: ["Лес", "Река"]
  },
  "Лес": {
    desc: "Густой лес, где свет едва пробивается сквозь кроны.",
    paths: ["Деревня", "Горы", "Поляна"]
  },
  "Река": {
    desc: "Быстрая река с холодной, чистой водой.",
    paths: ["Деревня", "Пещера"]
  },
  "Горы": {
    desc: "Суровые вершины, покрытые снегом.",
    paths: ["Лес", "Развалины"]
  },
  "Поляна": {
    desc: "Заброшенная поляна с странными знаками.",
    paths: ["Лес", "Башня"]
  },
  "Пещера": {
    desc: "Темная пещера, откуда слышны странные звуки.",
    paths: ["Река", "Развалины"]
  },
  "Развалины": {
    desc: "Останки древнего города, скрывающие тайны.",
    paths: ["Горы", "Пещера", "Храм"]
  },
  "Башня": {
    desc: "Одинокая башня, возвышающаяся над землей.",
    paths: ["Поляна", "Храм"]
  },
  "Храм": {
    desc: "Заброшенный храм с таинственными символами.",
    paths: ["Башня", "Развалины", "Портал"]
  },
  "Портал": {
    desc: "Мерцающий портал в неизвестность.",
    paths: ["Храм"]
  }
};

let playerData = {
  class: null,
  location: "Деревня"
};

function showElement(id) {
  document.getElementById(id).classList.remove("hidden");
}
function hideElement(id) {
  document.getElementById(id).classList.add("hidden");
}

setTimeout(() => {
  hideElement("splash-dev");
  showElement("splash-title");
  setTimeout(() => {
    hideElement("splash-title");
    showElement("main-menu");
  }, 3000);
}, 3000);

function startNewGame() {
  hideElement("main-menu");
  showElement("class-selection");
}
function showAbout() {
  hideElement("main-menu");
  showElement("about-screen");
}
function backToMenu() {
  hideElement("about-screen");
  showElement("main-menu");
}
function toggleDescription(cls) {
  document.querySelectorAll(".description").forEach(el => el.classList.add("hidden"));
  const desc = document.getElementById("desc-" + cls);
  desc.classList.toggle("hidden");
  playerData.class = cls;
}
function chooseClass() {
  if (!playerData.class) return alert("Выберите класс!");
  saveGame();
  startGame();
}
function startGame() {
  hideElement("class-selection");
  showElement("game-screen");
  updateLocation();
}
function updateLocation() {
  const loc = playerData.location;
  document.getElementById("location-name").innerText = loc;
  document.getElementById("location-desc").innerText = locations[loc].desc;

  const buttons = document.getElementById("location-buttons");
  buttons.innerHTML = "";
  locations[loc].paths.forEach(path => {
    const btn = document.createElement("button");
    btn.innerText = path;
    btn.onclick = () => {
      playerData.location = path;
      saveGame();
      updateLocation();
    };
    buttons.appendChild(btn);
  });
}
function saveGame() {
  localStorage.setItem("rpgSave", JSON.stringify(playerData));
}
function continueGame() {
  const save = localStorage.getItem("rpgSave");
  if (!save) return alert("Сохранение не найдено.");
  playerData = JSON.parse(save);
  hideElement("main-menu");
  showElement("game-screen");
  updateLocation();
}
