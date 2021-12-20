import Instafeed from "instafeed.js";
import initYandexMapsCallback from "./ymapsSettings";

const TOKEN = "IGQVJYeEtmVlBIclIyb0ZA2SE9zaWJPRGFSZAnpvdGwtb0xiSldJYzUwYnpSQVVmM3VZAY09FNzBkZA1lueG01TWFKYTVNNEEtYUEtZAi1jY3JoVkRJN3RqcXYydVFnd2gwb3ExSVdYNzRrSFlWZAGQ3NlEtOE5uM21JTDJmOTZAN"


function initInstafeed() {
  const c = document.getElementById("instfeed");
  if (!c) {
    setTimeout(waitYMaps, 1);
  } else {
    var feed = new Instafeed({
      accessToken: TOKEN,
      debug: true,
      target: c,
      error: console.error
    });
    feed.run();
  }
}


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
  initInstafeed();
  initYmaps();
}

main();