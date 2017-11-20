'use strict';

window.renderStatistics = function (ctx, names, times) {
  var barHeight = 150;
  var barWidth = 40;
  var indent = 50;
  var initialX = 155;
  var initialY = 250;
  var lineHeight = 20;
  var yourName = 'Вы';

  /**
  * Отрисовываем прямоугольник по заданным размерам
  *
  * @param {object} context контекст отрисовки
  * @param {number} coordinateX координата X начала отрисовки
  * @param {number} coordinateY координата Y начала отрисовки
  * @param {number} width ширина прямоугольника
  * @param {number} height высота прямоугольника
  */
  var drawRect = function (context, coordinateX, coordinateY, width, height) {
    context.fillRect(coordinateX, coordinateY, width, height);
  };

  /**
  * Отрисовывам текст в канвасе
  *
  * @param {object} context контекст отрисовки
  * @param {string} string текст
  * @param {number} coordinateX координата X начала отрисовки
  * @param {number} coordinateY координата Y начала отрисовки
  */
  var writeString = function (context, string, coordinateX, coordinateY) {
    context.fillText(string, coordinateX, coordinateY);
  };

  /**
  * Задаем цвет заливки для элементов
  *
  * @param {object} context контекст отрисовки
  * @param {string} color цвет заливки
  */
  var setStyle = function (context, color) {
    context.fillStyle = color;
  };

  /**
  * Задаем шрифт для элементов
  *
  * @param {object} context контекст отрисовки
  * @param {string} fontStyle стиль шрифта
  */
  var setFont = function (context, fontStyle) {
    context.font = fontStyle;
  };

  /**
  * Возвращает элемент массива с максимальным значением
  *
  * @param {array} arr массив чисел
  * @return {number} элемент массива с максимальным значением
  */
  var getMaxValue = function (arr) {
    var maxValue = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxValue) {
        maxValue = arr[i];
      }
    }
    return maxValue;
  };

  /**
  * Возвращает случайное число в заданном диапазоне
  *
  * @param {number} min минимальное значение
  * @param {number} max максимальное значение
  * @return {number} случайное число между min и max
  */
  var getRandomNumber = function (min, max) {
    return Math.random() * (max - min) + min;
  };

  setStyle(ctx, 'rgba(0, 0, 0, 0.7)');
  drawRect(ctx, 110, 20, 420, 270);
  setStyle(ctx, 'white');
  drawRect(ctx, 100, 10, 420, 270);
  setFont(ctx, '16px PT Mono');
  setStyle(ctx, 'black');
  writeString(ctx, 'Ура вы победили!', 130, 40);
  writeString(ctx, 'Список результатов:', 130, 60);

  for (var i = 0; i < times.length; i++) {
    var currentTime = Math.round(times[i]);
    var currentHeight = currentTime * barHeight / getMaxValue(times);
    if (names[i] === yourName) {
      setStyle(ctx, 'rgba(255, 0, 0, 1)');
    } else if (times[i] === getMaxValue(times)) {
      setStyle(ctx, 'rgba(0, 0, 255, 1)');
    } else {
      setStyle(ctx, 'rgba(0, 0, 255, ' + getRandomNumber(0.1, 0.9) + ')');
    }
    drawRect(ctx, initialX + (barWidth + indent) * i, initialY - barHeight, barWidth, barHeight);
    setStyle(ctx, 'white');
    drawRect(ctx, initialX + (barWidth + indent) * i, initialY - barHeight, barWidth, barHeight - currentHeight);
    setStyle(ctx, 'black');
    writeString(ctx, currentTime, initialX + (barWidth + indent) * i, initialY - currentHeight - lineHeight / 2);
    writeString(ctx, names[i], initialX + (barWidth + indent) * i, initialY + lineHeight);
  }
};
