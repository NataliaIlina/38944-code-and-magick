'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = 'white';
  ctx.fillRect(100, 10, 420, 270);
  ctx.font = '16px PT Mono';
  ctx.fillStyle = 'black';
  ctx.fillText('Ура вы победили!', 130, 40);
  ctx.fillText('Список результатов:', 130, 60);

  // получаем максимальное значение из массива times
  var maxValue = 0;
  var getMaxValue = function () {
    for (var i = 0; i < times.length; i++) {
      if (times[i] > maxValue) {
        maxValue = times[i];
      }
    }
    return maxValue;
  };

  var getRandomNumber = function (min, max) {
    return Math.random() * (max - min) + min;
  };

  var barHeight = 150;
  var barWidth = 40;
  var indent = 50;
  var initialX = 155;
  var initialY = 250;
  var lineHeight = 20;

  for (var i = 0; i < times.length; i++) {
    var currentTime = Math.round(times[i]);
    var currentHeight = currentTime * barHeight / getMaxValue();
    // окрашиваем бар игрока в красный, макс значение в синий, остальных в прозрачный синий
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else if (times[i] === getMaxValue()) {
      ctx.fillStyle = 'rgba(0, 0, 255, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + getRandomNumber(0.1, 0.9) + ')';
    }

    ctx.fillRect(initialX + (barWidth + indent) * i, initialY - barHeight, barWidth, barHeight);
    // закрываем белым прямоугольником часть высоты бара сверху (другой способ не придумала)
    ctx.fillStyle = 'white';
    ctx.fillRect(initialX + (barWidth + indent) * i, initialY - barHeight, barWidth, barHeight - currentHeight);
    // добавляем имя и время
    ctx.fillStyle = 'black';
    ctx.fillText(currentTime, initialX + (barWidth + indent) * i, initialY - currentHeight - lineHeight / 2);
    ctx.fillText(names[i], initialX + (barWidth + indent) * i, initialY + lineHeight);
  }

};
