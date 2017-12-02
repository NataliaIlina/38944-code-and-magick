'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.global = {
    /**
     * при истинности заданного условия вызывает функцию
     *
     * @param  {Event} evt Event
     * @param  {function} action вызываемая функция
     */
    isEscPress: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    /**
     * при истинности заданного условия вызывает функцию
     *
     * @param  {Event} evt Event
     * @param  {function} action вызываемая функция
     */
    isEnterPress: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },

    /**
    * Возвращает случайное число в заданном диапазоне
    *
    * @param {number} min минимальное значение
    * @param {number} max максимальное значение
    * @return {number} случайное число между min и max
    */
    getRandomNumber: function (min, max) {
      return Math.random() * (max - min) + min;
    },

    /**
    * Возвращает элемент массива с максимальным значением
    *
    * @param {array} arr массив чисел
    * @return {number} элемент массива с максимальным значением
    */
    getMaxValue: function (arr) {
      var maxValue = 0;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] > maxValue) {
          maxValue = arr[i];
        }
      }
      return maxValue;
    },

    /**
    * getRandomElement - возвращает значение случайного элемента заданного массива
    *
    * @param {Array} arr массив
    * @param {boolean} noRepeat при значении true возвращает неповторяющиеся элементы
    * @return {string} случайный элемент массива
    */
    getRandomElement: function (arr, noRepeat) {
      var index = Math.floor(Math.random() * arr.length);
      if (noRepeat) {
        return arr.splice(index, 1);
      } else {
        return arr[index];
      }
    }
  };
})();
