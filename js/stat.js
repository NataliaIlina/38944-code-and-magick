'use strict';

(function () {
  window.renderStatistics = function (ctx, names, times) {
    var BAR_HEIGHT = 150;
    var BAR_WIDTH = 40;
    var INDENT = 50;
    var INITIAL_X = 155;
    var INITIAL_Y = 250;
    var LINE_HEIGHT = 20;
    var yourName = 'Вы';

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
      var currentHeight = currentTime * BAR_HEIGHT / window.global.getMaxValue(times);
      if (names[i] === yourName) {
        setStyle(ctx, 'rgba(255, 0, 0, 1)');
      } else if (times[i] === window.global.getMaxValue(times)) {
        setStyle(ctx, 'rgba(0, 0, 255, 1)');
      } else {
        setStyle(ctx, 'rgba(0, 0, 255, ' + window.global.getRandomNumber(0.1, 0.9) + ')');
      }
      drawRect(ctx, INITIAL_X + (BAR_WIDTH + INDENT) * i, INITIAL_Y - BAR_HEIGHT, BAR_WIDTH, BAR_HEIGHT);
      setStyle(ctx, 'white');
      drawRect(ctx, INITIAL_X + (BAR_WIDTH + INDENT) * i, INITIAL_Y - BAR_HEIGHT, BAR_WIDTH, BAR_HEIGHT - currentHeight);
      setStyle(ctx, 'black');
      writeString(ctx, currentTime, INITIAL_X + (BAR_WIDTH + INDENT) * i, INITIAL_Y - currentHeight - LINE_HEIGHT / 2);
      writeString(ctx, names[i], INITIAL_X + (BAR_WIDTH + INDENT) * i, INITIAL_Y + LINE_HEIGHT);
    }

    /**
    * Отрисовываем прямоугольник по заданным размерам
    *
    * @param {object} context контекст отрисовки
    * @param {number} coordinateX координата X начала отрисовки
    * @param {number} coordinateY координата Y начала отрисовки
    * @param {number} width ширина прямоугольника
    * @param {number} height высота прямоугольника
    */
    function drawRect(context, coordinateX, coordinateY, width, height) {
      context.fillRect(coordinateX, coordinateY, width, height);
    }

    /**
    * Отрисовывам текст в канвасе
    *
    * @param {object} context контекст отрисовки
    * @param {string} string текст
    * @param {number} coordinateX координата X начала отрисовки
    * @param {number} coordinateY координата Y начала отрисовки
    */
    function writeString(context, string, coordinateX, coordinateY) {
      context.fillText(string, coordinateX, coordinateY);
    }

    /**
    * Задаем цвет заливки для элементов
    *
    * @param {object} context контекст отрисовки
    * @param {string} color цвет заливки
    */
    function setStyle(context, color) {
      context.fillStyle = color;
    }

    /**
    * Задаем шрифт для элементов
    *
    * @param {object} context контекст отрисовки
    * @param {string} fontStyle стиль шрифта
    */
    function setFont(context, fontStyle) {
      context.font = fontStyle;
    }
  };
})();
