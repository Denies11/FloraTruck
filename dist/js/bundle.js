/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("// Провайдер данных для элемента управления ymaps.control.SearchControl.\r\n// Осуществляет поиск геообъектов в по массиву points.\r\n// Реализует интерфейс IGeocodeProvider.\r\n\r\n/** Кастомный класс геокодера */\r\nclass CustomSearchProvider {\r\n\r\n    constructor(geoPoints) {\r\n        // Геоколлекция, по которой происходит поиск\r\n        this.geoPoints = geoPoints;\r\n    }\r\n\r\n    /**\r\n     * Функция поиска по тексту\r\n     * @param {string} request - Поиcковый запрос\r\n     * @param {object} options - Опции поискового запросы\r\n     * @return {object} Промис от vow объекта\r\n     */\r\n\r\n\r\n    geocode(request, options) {\r\n        const deferred = new ymaps.vow.defer(),\r\n            // Сколько результатов нужно пропустить.\r\n            offset = options.skip || 0,\r\n            // Количество возвращаемых результатов.\r\n            limit = options.results || 20;\r\n\r\n        // Формируем поисковую выдачу по вхождению текста в название точки\r\n        let resultPoints = [];\r\n        for (const p of this.geoPoints) {\r\n            if (p.name.toLowerCase().indexOf(request.toLowerCase()) != -1) {\r\n                resultPoints.push(p);\r\n            }\r\n        }\r\n        // При формировании ответа можно учитывать offset и limit.\r\n        resultPoints = resultPoints.splice(offset, limit);\r\n        console.log(resultPoints)\r\n\r\n\r\n        const geoObjects = new ymaps.GeoObjectCollection();\r\n        // Добавляем точки в результирующую коллекцию.\r\n        for (const p of resultPoints) {\r\n            geoObjects.add(new ymaps.Placemark(p.coords, {\r\n                name: p.name,\r\n                address: p.address,\r\n                phone: p.phone,\r\n                pochta:p.pochta,\r\n                wh: p.wh,\r\n                boundedBy: [p.coords, p.coords],\r\n            }));\r\n        }\r\n\r\n        deferred.resolve({\r\n            // Геообъекты поисковой выдачи.\r\n            geoObjects: geoObjects,\r\n            // Метаинформация ответа.\r\n            metaData: {\r\n                geocoder: {\r\n                    // Строка обработанного запроса.\r\n                    request: request,\r\n                    // Количество найденных результатов.\r\n                    found: geoObjects.getLength(),\r\n                    // Количество возвращенных результатов.\r\n                    results: limit,\r\n                    // Количество пропущенных результатов.\r\n                    skip: offset\r\n                }\r\n            }\r\n        });\r\n\r\n        // Возвращаем объект-обещание.\r\n        return deferred.promise();\r\n    }\r\n}\r\n\r\n\r\n/**\r\n * Функция, возвращающая данные по точкам складов и т.д.\r\n * Может быть заменена на API метод\r\n * @returns {Point[]} Массив точек с координатами и описанием\r\n */\r\nfunction getData() {\r\n    data = [\r\n        {\r\n            coords: [55.77, 37.46],\r\n            name: 'Склад Котельники',\r\n            address: \"МО, г. Котельники, Угрешский Проезд, с3к2\",\r\n            pochta: 'info@floratrack.ru',\r\n            phone: \"8(800)555-35-35\",\r\n            wh: \"8:00-19:00\"\r\n        },\r\n        {\r\n            coords: [55.66, 37.48],\r\n            name: 'Склад 2',\r\n            address: \"МО, Кремль вонючий\",\r\n            pochta:'',\r\n            phone: \"8(800)Путин был тут\",\r\n            wh: \"00:00-24:00\"\r\n        },\r\n    ];\r\n    return data;\r\n}\r\n\r\n\r\n/**\r\n * Создание коллекции геобъектов, которые будут отображены на Яндекс.Картах\r\n * @param {Point[]} geoPoints - Массив точек\r\n * @returns {ymaps.GeoObjectCollection} Геоколлекция из точек со складами\r\n */\r\nfunction getMapMarkers(geoPoints) {\r\n    const markersCollection = new ymaps.GeoObjectCollection();\r\n    for (const p of geoPoints) {\r\n        markersCollection.add(new ymaps.Placemark(p.coords, {\r\n            balloonContentHeader: p.name+'<br> ' +\r\n                '<span class=\"description\"></span>',\r\n            // Зададим содержимое основной части балуна.\r\n            balloonContentBody: '<img src=\"img/cinema.jpg\" height=\"150\" width=\"200\"> <br/> ' +\r\n                '<a href=\"tel:+7-123-456-78-90\">+7 (123) 456-78-90</a><br/>' +\r\n                '<b>Ближайшие сеансы</b> <br/> Сеансов нет.',\r\n            // Зададим содержимое нижней части балуна.\r\n            balloonContentFooter: 'Информация предоставлена:<br/>OOO \"\"',\r\n            // Зададим содержимое всплывающей подсказки.\r\n            hintContent: ''\r\n        }));\r\n    }\r\n\r\n    return markersCollection\r\n}\r\n\r\n\r\n/**\r\n * Создание  кастомного управления поиском\r\n * @param {Point[]} geoPoints - Массив точек для поисковой выдачи\r\n * @returns {ymaps.control.SearchControl} Кастомное управление поиском\r\n */\r\nfunction getMySearchControl(geoPoints) {\r\n    // Меняем форму объектов поисковой выдачи\r\n    const MySearchControlPopupItemLayoutClass = ymaps.templateLayoutFactory.createClass(\r\n        '<div class=\"item_container\">' +\r\n        '<div class=\"item_name\">{{ data.name }}</div>' +\r\n        '<div class=\"item_address\">{{ data.address}}</div>' +\r\n        '<div class=\"item_address\">{{ data.pochta}}</div>' +\r\n        '<div class=\"item_phone\">{{ data.phone|default:\"неизвестно\" }}</div>' +\r\n        '<div class=\"item_wh\">Время работы: {% if data.wh %} {{data.wh}} {% else %} не работает{% endif %}</div>' +\r\n        '</div>'\r\n    );\r\n\r\n    // Создаем экземпляр класса ymaps.control.SearchControl\r\n    const mySearchControl = new ymaps.control.SearchControl({\r\n        options: {\r\n            // Заменяем стандартный провайдер данных (геокодер) нашим собственным.\r\n            provider: new CustomSearchProvider(geoPoints),\r\n            // Не будем показывать еще одну метку при выборе результата поиска,\r\n            // т.к. метки коллекции myCollection уже добавлены на карту.\r\n            noPlacemark: true,\r\n            resultsPerPage: 5,\r\n            popupItemLayout: MySearchControlPopupItemLayoutClass\r\n        }});\r\n    return mySearchControl\r\n}\r\n\r\n\r\n/**\r\n * Инициализация Яндекс.Карт\r\n */\r\nfunction initYandexMapsCallback() {\r\n    // Создаём объект карты\r\n    const myMap = new ymaps.Map('map', {\r\n        center: [55.7, 37.5],\r\n        zoom: 9,\r\n        controls: ['zoomControl']\r\n    });\r\n\r\n    // Создаем массив с данными.\r\n    const data = getData();\r\n\r\n\r\n    // Размещаем метки на карте\r\n    myMap.geoObjects.add(getMapMarkers(data));\r\n\r\n    // Устанавливаем своё управление поиском\r\n    myMap.controls.add(getMySearchControl(data), { float: 'right' });\r\n\r\n}\r\n\r\n/**\r\n * Вход в приложение\r\n */\r\nfunction main() {\r\n    ymaps.ready(initYandexMapsCallback);\r\n}\r\n\r\nmain();\n\n//# sourceURL=webpack://flora-truck/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;