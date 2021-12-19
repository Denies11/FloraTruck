// Провайдер данных для элемента управления ymaps.control.SearchControl.
// Осуществляет поиск геообъектов в по массиву points.
// Реализует интерфейс IGeocodeProvider.

/** Кастомный класс геокодера */
class CustomSearchProvider {

  constructor(geoPoints) {
    // Геоколлекция, по которой происходит поиск
    this.geoPoints = geoPoints;
  }

  /**
   * Функция поиска по тексту
   * @param {string} request - Поиcковый запрос
   * @param {object} options - Опции поискового запросы
   * @return {object} Промис от vow объекта
   */


  geocode(request, options) {
    const deferred = new ymaps.vow.defer(),
      // Сколько результатов нужно пропустить.
      offset = options.skip || 0,
      // Количество возвращаемых результатов.
      limit = options.results || 20;

    // Формируем поисковую выдачу по вхождению текста в название точки
    let resultPoints = [];
    for (const p of this.geoPoints) {
      if (p.name.toLowerCase().indexOf(request.toLowerCase()) != -1) {
        resultPoints.push(p);
      }
    }
    // При формировании ответа можно учитывать offset и limit.
    resultPoints = resultPoints.splice(offset, limit);

    const geoObjects = new ymaps.GeoObjectCollection();
    // Добавляем точки в результирующую коллекцию.
    for (const p of resultPoints) {
      geoObjects.add(new ymaps.Placemark(p.coords, {
        name: p.name,
        address: p.address,
        phone: p.phone,
        pochta: p.pochta,
        wh: p.wh,
        boundedBy: [p.coords, p.coords],
      }));
    }

    deferred.resolve({
      // Геообъекты поисковой выдачи.
      geoObjects: geoObjects,
      // Метаинформация ответа.
      metaData: {
        geocoder: {
          // Строка обработанного запроса.
          request: request,
          // Количество найденных результатов.
          found: geoObjects.getLength(),
          // Количество возвращенных результатов.
          results: limit,
          // Количество пропущенных результатов.
          skip: offset
        }
      }
    });

    // Возвращаем объект-обещание.
    return deferred.promise();
  }
}


/**
 * Функция, возвращающая данные по точкам складов и т.д.
 * Может быть заменена на API метод
 * @returns {Point[]} Массив точек с координатами и описанием
 */
function getData() {
  data = [
    {
      coords: [55.77, 37.46],
      name: 'Склад Котельники',
      address: "МО, г. Котельники, Угрешский Проезд, с3к2",
      pochta: 'info@floratrack.ru',
      phone: "8(800)555-35-35",
      wh: "8:00-19:00"
    },
    {
      coords: [55.66, 37.48],
      name: 'Склад 2',
      address: "МО, Кремль вонючий",
      pochta: '',
      phone: "8(800)Путин был тут",
      wh: "00:00-24:00"
    },
    {
      coords: [55.663263, 37.484063],
      name: 'Метро',
      address: "улица 26 Бакинских Комиссаров",
      pochta: '',
      phone: "8(800)Путин был тут дважды",
      wh: "00:00-24:00"
    },


  ];
  return data;
}


/**
 * Создание коллекции геобъектов, которые будут отображены на Яндекс.Картах
 * @param {Point[]} geoPoints - Массив точек
 * @returns {ymaps.GeoObjectCollection} Геоколлекция из точек со складами
 */
function getMapMarkers(geoPoints) {
  const markersCollection = new ymaps.GeoObjectCollection();
  for (const p of geoPoints) {
    markersCollection.add(new ymaps.Placemark(
      p.coords,
      {
        balloonContentHeader: p.name + '<br> ' +
          '<span class="description"></span>',
        // Зададим содержимое основной части балуна.
        balloonContentBody: '<img src="img/cinema.jpg" height="150" width="200"> <br/> ' +
          '<a href="tel:+7-123-456-78-90">+7 (123) 456-78-90</a><br/>' +
          '<b>Ближайшие сеансы</b> <br/> Сеансов нет.',
        // Зададим содержимое нижней части балуна.
        balloonContentFooter: 'Информация предоставлена:<br/>OOO ""',
        // Зададим содержимое всплывающей подсказки.
        hintContent: ''
      },
      {
        iconLayout: "default#image",
        iconImageHref: "image/map_marker.svg"
      }
    ));
  }

  return markersCollection
}


/**
 * Создание  кастомного управления поиском
 * @param {Point[]} geoPoints - Массив точек для поисковой выдачи
 * @returns {ymaps.control.SearchControl} Кастомное управление поиском
 */
function getMySearchControl(geoPoints) {
  // Меняем форму объектов поисковой выдачи
  const MySearchControlPopupItemLayoutClass = ymaps.templateLayoutFactory.createClass(
    '<div class="item_container">' +
    '<div class="item_name">{{ data.name }}</div>' +
    '<div class="item_address">{{ data.address }}</div>' +
    '<div class="item_address">{{ data.pochta }}</div>' +
    '<div class="item_phone">{{ data.phone|default:"неизвестно" }}</div>' +
    '<div class="item_wh">Время работы: {% if data.wh %} {{ data.wh }} {% else %} не работает{% endif %}</div>' +
    '</div>'
  );

  // Создаем экземпляр класса ymaps.control.SearchControl
  const mySearchControl = new ymaps.control.SearchControl({
    options: {
      // Заменяем стандартный провайдер данных (геокодер) нашим собственным.
      provider: new CustomSearchProvider(geoPoints),
      // Не будем показывать еще одну метку при выборе результата поиска,
      // т.к. метки коллекции myCollection уже добавлены на карту.
      noPlacemark: true,
      noCentering: true,
      resultsPerPage: 5,
      popupItemLayout: MySearchControlPopupItemLayoutClass
    }
  });
  console.log(mySearchControl);

  // Настраиваем зум при выборе варианта
  mySearchControl.events.add("resultshow", async function (e) {
    const resultIndex = e.get("index");
    const myMap = mySearchControl.getMap();
    mySearchControl.prevCenter = myMap.getCenter();
    mySearchControl.prevZoom = myMap.getZoom();
    const point = await mySearchControl.getResult(resultIndex);
    const newCoordinates = point.geometry.getCoordinates();
    myMap.setCenter(newCoordinates, 15, {
      checkZoomRange: true
    });
  });

  // Возвращаем зум при очистке
  mySearchControl.events.add("clear", function (e) {
    if (mySearchControl.prevCenter && mySearchControl.prevZoom) {
      const myMap = mySearchControl.getMap();
      myMap.setCenter(mySearchControl.prevCenter, mySearchControl.prevZoom);
    }
  });

  return mySearchControl
}


/** 
 * Инициализация Яндекс.Карт
 */
function initYandexMapsCallback() {
  // Создаём объект карты
  const myMap = new ymaps.Map('map', {
    center: [55.7, 37.5],
    zoom: 9,
    controls: ['zoomControl']
  });

  // Создаем массив с данными.
  const data = getData();


  // Размещаем метки на карте
  myMap.geoObjects.add(getMapMarkers(data));

  // Устанавливаем своё управление поиском
  myMap.controls.add(getMySearchControl(data), { float: 'right' });

}

/**
 * Вход в приложение
 */
function main() {
  ymaps.ready(initYandexMapsCallback);
}

main();