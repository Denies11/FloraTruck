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
  initInstafeed();
  waitYMaps();
}

main();