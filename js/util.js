'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  /**
   * при истинности заданного условия вызывает функцию
   *
   * @param  {Event} evt
   * @param  {function} action
   */
  function isEscPress(evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  }

  /**
   * при истинности заданного условия вызывает функцию
   *
   * @param  {Event} evt
   * @param  {function} action
   */
  function isEnterPress(evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  }

  /**
   * Возвращает случайное число в заданном диапазоне
   *
   * @param {number} min минимальное значение
   * @param {number} max максимальное значение
   * @return {number} случайное число между min и max
   */
  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  /**
   * Возвращает элемент массива с максимальным значением
   *
   * @param {array} arr массив чисел
   * @return {number} элемент массива с максимальным значением
   */
  function getMaxValue(arr) {
    var maxValue = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxValue) {
        maxValue = arr[i];
      }
    }
    return maxValue;
  }

  /**
   * getRandomElement - возвращает значение случайного элемента заданного массива
   *
   * @param {Array} arr
   * @param {boolean} [noRepeat] при значении true возвращает неповторяющиеся элементы
   * @return {*} случайный элемент массива
   */
  function getRandomElement(arr, noRepeat) {
    var index = Math.floor(Math.random() * arr.length);
    if (noRepeat) {
      return arr.splice(index, 1);
    } else {
      return arr[index];
    }
  }

  window.util = {
    isEscPress: isEscPress,
    isEnterPress: isEnterPress,
    getRandomNumber: getRandomNumber,
    getMaxValue: getMaxValue,
    getRandomElement: getRandomElement
  };
})();
