import initYandexMapsCallback from "./ymapsSettings";


/**
 * Дожидаемся загрузки библиотеки ymaps из CDN, после чего инициализуруем карту
 */
function waitYMaps() {
  if (!window.ymaps) {
    setTimeout(waitYMaps, 1);
  } else {
    ymaps.ready(initYandexMapsCallback);
  }
}

/**
 * Вход в приложение
 */
function main() {
  waitYMaps();
}

main();