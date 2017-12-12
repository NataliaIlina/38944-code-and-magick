'use strict';

(function () {
  var TOTAL_WIZARDS_NUMBER = 4;
  var WIZARDS_FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
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

  var wizardsListElement = document.querySelector('.setup-similar-list');
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupSubmit = setup.querySelector('.setup-submit');
  var mainWizard = setup.querySelector('.setup-wizard');
  var mainWizardCoat = mainWizard.querySelector('.wizard-coat');
  var mainWizardEyes = mainWizard.querySelector('.wizard-eyes');
  var mainWizardFireball = setup.querySelector('.setup-fireball-wrap');
  var form = setup.querySelector('.setup-wizard-form');
  var setupNameInput = form.querySelector('.setup-user-name');
  var coatInput = form.querySelector('input[name=coat-color]');
  var eyesInput = form.querySelector('input[name=eyes-color]');
  var fireballInput = form.querySelector('input[name=fireball-color]');

  // открываем попап по клику/нажатию на иконку
  setupOpen.addEventListener('click', function () {
    openPopup();
  });
  setupOpen.addEventListener('keydown', onIconEnterPress);

  // добавляем во фрагмент копии шаблона мага
  window.backend.load(onSuccessLoad, onErrorLoad);

  // отправляем форму на сервер
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), closePopup, onErrorLoad);
  });

  // ------------------- функции ------------------
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
  }

  /**
   * fillElement - меняет значение свойства fill элемента
   *
   * @param  {Node} element
   * @param  {string} color
   */
  function fillElement(element, color) {
    element.style.fill = color;
  }

  /**
   * fillElement - меняет значение свойства background-color элемента
   *
   * @param  {Node} element
   * @param  {string} color
   */
  function changeBackground(element, color) {
    element.style.backgroundColor = color;
  }
  /**
   * onWizardFireballClick - устанавливает значение цвета из массива в фон элемента и значение инпута
   *
   */
  function onWizardFireballClick() {
    window.colorizeElement(mainWizardFireball, fireballInput, WIZARDS_FIREBALL_COLORS, changeBackground);
  }

  /**
   * onWizardCoatClick - устанавливает значение цвета из массива в фон элемента и значение инпута
   *
   */
  function onWizardCoatClick() {
    window.colorizeElement(mainWizardCoat, coatInput, WIZARDS_COAT_COLORS, fillElement);
  }

  /**
   * onWizardEyesClick - устанавливает значение цвета из массива в фон элемента и значение инпута
   *
   */
  function onWizardEyesClick() {
    window.colorizeElement(mainWizardEyes, eyesInput, WIZARDS_EYES_COLORS, fillElement);
  }

  /**
   * onPopupEscPress - закрывает окно при нажатии на esc
   *
   * @param  {Event} evt
   */
  function onPopupEscPress(evt) {
    if (evt.target !== setupNameInput) {
      window.util.isEscPress(evt, closePopup);
    }
  }

  /**
   * onIconEnterPress - открывает окно при нажатии на enter при фокусе на иконке пользователя
   *
   * @param  {Event} evt
   */
  function onIconEnterPress(evt) {
    window.util.isEnterPress(evt, openPopup);
  }

  /**
   * onButtonEnterPress - закрывает окно при нажатии на enter при кнопке в фокусе
   *
   * @param  {Event} evt
   */
  function onButtonEnterPress(evt) {
    window.util.isEnterPress(evt, closePopup);
  }


  /**
   * onSetupClick - обрабатывает клики на открытом окне выбора персонажа
   *
   * @param  {Event} evt
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
  * renderWizard - возвращает скопированный с шаблона элемент со стилями
  *
  * @param {Object} wizard объект с используемыми свойствами
  * @return {Node} скопированный стилизованный DOM-элемент
  */
  function renderWizard(wizard) {
    var cloneElement = wizardTemplate.cloneNode(true);
    var wizardName = cloneElement.querySelector('.setup-similar-label');
    var wizardCoat = cloneElement.querySelector('.wizard-coat');
    var wizardEyes = cloneElement.querySelector('.wizard-eyes');
    wizardName.textContent = wizard.name;
    wizardCoat.style.fill = wizard.colorCoat;
    wizardEyes.style.fill = wizard.colorEyes;
    return cloneElement;
  }

  function onSuccessLoad(wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < TOTAL_WIZARDS_NUMBER; i++) {
      fragment.appendChild(renderWizard(window.util.getRandomElement(wizards)));
    }
    wizardsListElement.appendChild(fragment);
    document.querySelector('.setup-similar').classList.remove('hidden');
  }

  function onErrorLoad(message) {
    var node = document.createElement('div');
    node.textContent = message;
    node.style = 'text-align: center; color: white; background-color: red; width: 100%; height: 30px';
    document.body.insertAdjacentElement('afterbegin', node);
  }
})();
