'use strict';

(function () {
  /**
   * colorizeElement - изменяет цвет элемента случайным цветом из массива с передачей значения в соответствующее поле формы
   *
   * @param {Node} element
   * @param {Node} input
   * @param {Array} colors
   * @param {function} changeColor функция замены цвета
   */
  function colorizeElement(element, input, colors, changeColor) {
    var color = window.util.getRandomElement(colors);
    input.value = color;
    changeColor(element, color);
  }

  window.colorizeElement = colorizeElement;
})();
