/**
 * Функция для обрезания текста описания. Если текст больше, чем max_length
 * @param {*} item Медиа объект
 * @returns {any} Возвращает изменённый Медиа объект 
 */
 export function cutText(item) {
  const  max_length = 10;

  if (item.caption) {
    let words = item.caption.split(" ");
    if(words.length > max_length) {
      item.short = true;
      words = words.slice(0, 10);
      words.push(words[words.length - 1] == "." ? ".. ": "... ");
    }
    item.caption = words.join(" ");
  }
  return item;
}

/**
 * Функция для рендера медиа объектов в DOM
 * @param {*} item Медиа объект
 * @returns {string} Возвращает строку HTML кода;
 */
export function render(item) {
  // Обёртка для медиа объекта
  const media = document.createElement("div");
  media.classList.add("insta_media");

  // Картинка с ссылкой на пост
  const link = document.createElement("a");
  link.href = item.link || "";
  link.classList.add("insta_media_link");
  link.target = "_blank";
  const img = document.createElement("img");
  img.src = item.image || "";
  link.appendChild(img);
  media.appendChild(link);

  // Описание
  const description = document.createElement("div");
  description.classList.add("insta_media_description");
  description.innerText = item.caption || "";
  if (item.short) {
    const read_more = document.createElement("a");
    read_more.href = item.link || "";
    read_more.classList.add("insta_media_more");
    read_more.innerText = "Читать далее."
    read_more.target = "_blank";
    description.appendChild(read_more);
  }
  media.appendChild(description);
  return media.outerHTML;
}