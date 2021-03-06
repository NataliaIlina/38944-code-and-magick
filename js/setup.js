'use strict';

(function () {
  var TOTAL_WIZARDS_NUMBER = 4;
  var WIZARDS_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  var WIZARDS_SURNAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];
  var WIZARDS_COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var WIZARDS_EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  var WIZARDS_FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var copyWizardsNames = WIZARDS_NAMES.slice();
  var copyWizardsSurnames = WIZARDS_SURNAMES.slice();
  var copyWizardsCoatColors = WIZARDS_COAT_COLORS.slice();
  var copyWizardsEyesColors = WIZARDS_EYES_COLORS.slice();
  var wizards = [];
  var wizardsListElement = document.querySelector('.setup-similar-list');
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupNameInput = setup.querySelector('.setup-user-name');
  var setupSubmit = setup.querySelector('.setup-submit');
  var mainWizard = setup.querySelector('.setup-wizard');
  var mainWizardCoat = mainWizard.querySelector('.wizard-coat');
  var mainWizardEyes = mainWizard.querySelector('.wizard-eyes');
  var mainWizardFireball = setup.querySelector('.setup-fireball-wrap');
  var coatInput = setup.querySelector('input[name=coat-color]');
  var eyesInput = setup.querySelector('input[name=eyes-color]');
  var fireballInput = setup.querySelector('input[name=fireball-color]');

  // переменные для drag'n'drop
  var setupShop = setup.querySelector('.setup-artifacts-shop');
  var setupArtifacts = setup.querySelector('.setup-artifacts');
  var draggedItem = null;
  var artItem = null;
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


  // открываем попап по клику/нажатию на иконку
  setupOpen.addEventListener('click', function () {
    openPopup();
  });
  setupOpen.addEventListener('keydown', onIconEnterPress);

  document.querySelector('.setup-similar').classList.remove('hidden');

  // заполняем wizards
  for (var i = 0; i < TOTAL_WIZARDS_NUMBER; i++) {
    wizards[i] = generateObject();
  }
  // добавляем во фрагмент копии шаблона мага
  wizards.forEach(function (item) {
    fragment.appendChild(renderWizard(item));
  });

  // добавляем фрагмент в DOM
  wizardsListElement.appendChild(fragment);

  // функции
  /**
   * openPopup - показывает окно выбора персонажа
   *
   */
  function openPopup() {
    setup.classList.remove('hidden');
    // закрываем по esc
    document.addEventListener('keydown', onPopupEscPress);
    // ловим клики на попапе
    setup.addEventListener('click', onSetupClick);
    // закрываем на кнопку/крестик по enter
    setupClose.addEventListener('keydown', onButtonEnterPress);
    setupSubmit.addEventListener('keydown', onButtonEnterPress);
  }

  /**
   * closePopup - закрывает окно выбора персонажа
   *
   */
  function closePopup() {
    setup.classList.add('hidden');
    // сбрасываем положение окна на изначальное
    setup.style.top = '';
    setup.style.left = '';
    // удаляем обработчики
    document.removeEventListener('keydown', onPopupEscPress);
    setup.removeEventListener('click', onSetupClick);
    setupClose.removeEventListener('keydown', onButtonEnterPress);
    setupSubmit.removeEventListener('keydown', onButtonEnterPress);
  }
  /**
   * onWizardFireballClick - устанавливает значение цвета из массива в фон элемента и значение инпута
   *
   */
  function onWizardFireballClick() {
    var fireball = window.util.getRandomElement(WIZARDS_FIREBALL_COLORS);
    mainWizardFireball.style.backgroundColor = fireball;
    fireballInput.value = fireball;
  }

  /**
   * onWizardCoatClick - устанавливает значение цвета из массива в фон элемента и значение инпута
   *
   */
  function onWizardCoatClick() {
    var coat = window.util.getRandomElement(WIZARDS_COAT_COLORS);
    mainWizardCoat.style.fill = coat;
    coatInput.value = coat;
  }

  /**
   * onWizardEyesClick - устанавливает значение цвета из массива в фон элемента и значение инпута
   *
   */
  function onWizardEyesClick() {
    var eyes = window.util.getRandomElement(WIZARDS_EYES_COLORS);
    mainWizardEyes.style.fill = eyes;
    eyesInput.value = eyes;
  }

  /**
   * onPopupEscPress - закрывает окно при нажатии на esc
   *
   * @param  {Object} evt объект event
   */
  function onPopupEscPress(evt) {
    if (evt.target !== setupNameInput) {
      window.util.isEscPress(evt, closePopup);
    }
  }

  /**
   * onIconEnterPress - открывает окно при нажатии на enter при фокусе на иконке пользователя
   *
   * @param  {Object} evt объект event
   */
  function onIconEnterPress(evt) {
    window.util.isEnterPress(evt, openPopup);
  }

  /**
   * onButtonEnterPress - закрывает окно при нажатии на enter при кнопке в фокусе
   *
   * @param  {Object} evt объект event
   */
  function onButtonEnterPress(evt) {
    window.util.isEnterPress(evt, closePopup);
  }


  /**
   * onSetupClick - обрабатывает клики на открытом окне выбора персонажа
   *
   * @param  {Object} evt объект event
   */
  function onSetupClick(evt) {
    switch (evt.target) {
      case mainWizardFireball.children[0]:
        onWizardFireballClick();
        break;
      case mainWizardCoat:
        onWizardCoatClick();
        break;
      case mainWizardEyes:
        onWizardEyesClick();
        break;
      case setupSubmit:
        closePopup();
        break;
      case setupClose:
        closePopup();
        break;
    }
  }

  /**
   * generateObject - возвращает объект с данными, взятыми из массивов
   *
   * @return {Object} сгенерированный объект
   */
  function generateObject() {
    var obj = {};
    obj.name = window.util.getRandomElement(copyWizardsNames, true) + ' ' + window.util.getRandomElement(copyWizardsSurnames, true);
    obj.coatColor = window.util.getRandomElement(copyWizardsCoatColors, true);
    obj.eyesColor = window.util.getRandomElement(copyWizardsEyesColors, true);
    return obj;
  }

  /**
  * renderWizard - возвращает скопированный с шаблона элемент со стилями
  *
  * @param {Object} obj объект с используемыми свойствами
  * @return {Object} скопированный стилизованный DOM-элемент
  */
  function renderWizard(obj) {
    var cloneElement = wizardTemplate.cloneNode(true);
    var wizardName = cloneElement.querySelector('.setup-similar-label');
    var wizardCoat = cloneElement.querySelector('.wizard-coat');
    var wizardEyes = cloneElement.querySelector('.wizard-eyes');
    wizardName.textContent = obj.name;
    wizardCoat.style.fill = obj.coatColor;
    wizardEyes.style.fill = obj.eyesColor;
    return cloneElement;
  }

})();
