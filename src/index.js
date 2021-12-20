import Instafeed from "instafeed.js";
import initYandexMapsCallback from "./ymapsSettings";



function initInstafeed() {
  document.addEventListener("DOMContentLoaded", e => {
    const template = '<div class="insta_media">' +
                     '<a href="{{link}}" class="insta_media_link">' +
                     '<img src="{{image}}" class="insta_media_img">' +
                     '</a>' + 
                     '<div class="insta_media_description">{{caption}}</div>' +
                     '</div>';

    const token = "IGQVJXWW1mNy1OeFlsbDF4Wkx2WG1haktyOWhoOFR2XzhRMWtZAeXJENmJOQjBsQ0Y0dnFlLVY2M2FFYVVFaXg3THFrNVZAmamNwTlp1UWFpR1JDbG9kN2hZAVW1ENE43OFh1bl9ncXNkY3ZAGMjVPaGo1WgZDZD";  
    const c = document.getElementById("feed");
    const feed = new Instafeed({
      accessToken: token,
      error: console.error,
      limit: 4,
      target: c,
      template: template,
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