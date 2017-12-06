'use strict';

(function () {
  window.colorizeElement = function (element, input, arr, callback) {
    var color = window.util.getRandomElement(arr);
    input.value = color;
    callback(element, color);
  };
})();
