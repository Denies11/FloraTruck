import initYandexMapsCallback from "./ymapsSettings";


/**
 * Дожидаемся загрузки библиотеки ymaps из CDN, после чего инициализуруем карту
 */
function initYmaps() {
  const ymapsScript = document.createElement("script");
  ymapsScript.type = "text/javascript"
  ymapsScript.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=492e958b-e294-47cb-a1e5-c938260b6a0e";
  ymapsScript.addEventListener("load", e => {
    ymaps.ready(initYandexMapsCallback);
  })
  document.head.appendChild(ymapsScript);
}

/**
 * Вход в приложение
 */
function main() {
  initYmaps();
}

main();