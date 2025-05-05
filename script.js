// Переход между экранами
window.onload = function() {
  setTimeout(() => {
    document.getElementById('screen1').style.display = 'none';
    document.getElementById('screen2').style.display = 'flex';
  }, 2000); // через 2 секунды после загрузки переключаем на экран 2

  setTimeout(() => {
    document.getElementById('screen2').style.display = 'none';
    document.getElementById('screen3').style.display = 'flex';
  }, 4000); // через 4 секунды переключаем на экран 3
};
