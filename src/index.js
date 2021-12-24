import Instafeed from "instafeed.js";
import { cutText, render } from "./instafeedSettings";
import initYandexMapsCallback from "./ymapsSettings";



function initInstafeed() {
  document.addEventListener("DOMContentLoaded", e => {
    const token = "IGQVJXWW1mNy1OeFlsbDF4Wkx2WG1haktyOWhoOFR2XzhRMWtZAeXJENmJOQjBsQ0Y0dnFlLVY2M2FFYVVFaXg3THFrNVZAmamNwTlp1UWFpR1JDbG9kN2hZAVW1ENE43OFh1bl9ncXNkY3ZAGMjVPaGo1WgZDZD";  
    const c = document.getElementById("feed");
    const feed = new Instafeed({
      accessToken: token,
      error: console.error,
      limit: 4,
      target: c,
      transform: cutText,
      render: render
    });
    feed.run();
  });
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