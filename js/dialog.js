'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupHandle = setup.querySelector('.upload');
  var setupInput = setupHandle.querySelector('input');
  var setupShop = setup.querySelector('.setup-artifacts-shop');
  var setupArtifacts = setup.querySelector('.setup-artifacts');
  var draggedItem = null;
  var artItem = null;

  // drag'n'drop окна настроек персонажа
  setupHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (evt.target === setupInput) {
      setupInput.addEventListener('click', function (inputEvt) {
        inputEvt.preventDefault();
      });
    }

    var mouseOffset = {
      x: evt.clientX - setup.offsetLeft,
      y: evt.clientY - setup.offsetTop
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      setup.style.top = (moveEvt.clientY - mouseOffset.y) + 'px';
      setup.style.left = (moveEvt.clientX - mouseOffset.x) + 'px';
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  });

  // drag'n'drop иконок магазина/рюкзака
  // отслеживаем начало перемещения из магазина
  setupShop.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      setupArtifacts.style.outline = '2px dashed red';
      // если элемент отпустили раньше времени
      draggedItem.addEventListener('dragend', function () {
        setupArtifacts.style.outline = '';
        draggedItem = null;
      });
    }
  });
  // отслеживаем начало перемещения из рюкзака
  setupArtifacts.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      artItem = evt.target;
      setupArtifacts.style.outline = '2px dashed red';
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });
  // делаем рюкзак доступным для перетаскивания
  setupArtifacts.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });
  // копируем элемент в пустую ячейку рюкзака, если он из рюкзака - перемещаем без копирования
  setupArtifacts.addEventListener('drop', function (evt) {
    evt.preventDefault();
    evt.currentTarget.style.outline = '';
    if (evt.target.classList.contains('setup-artifacts-cell') && evt.target.children.length === 0) {
      if (!artItem) {
        evt.target.appendChild(draggedItem.cloneNode(true));
        evt.target.style.backgroundColor = '';
      } else {
        evt.target.appendChild(artItem);
        evt.target.style.backgroundColor = '';
        artItem = null;
      }
    }
  });
  // при перемещении эл-та над ячейкой. подходящей для дропа, подствечиваем ее
  setupArtifacts.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('setup-artifacts-cell') && evt.target.children.length === 0) {
      evt.target.style.backgroundColor = 'yellow';
    } else {
      evt.target.style.backgroundColor = '';
    }
  });
  // возвращаем цвет ячейки на обычный, если эл-та над ней нет
  setupArtifacts.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
    evt.target.style.backgroundColor = '';
  });
})();
