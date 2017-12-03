'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupHandle = setup.querySelector('.upload');
  var setupInput = setupHandle.querySelector('input');

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
})();
