'use strict';

var TOTAL_WIZARDS_NUMBER = 4;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
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

// открываем попап по клику/нажатию на иконку
setupOpen.addEventListener('click', openPopup);
setupOpen.addEventListener('keydown', onIconEnterPress);

document.querySelector('.setup-similar').classList.remove('hidden');

// заполняем wizards
for (var i = 0; i < TOTAL_WIZARDS_NUMBER; i++) {
  wizards[i] = generateObject();
}
// добавляем во фрагмент копии шаблона мага
wizards.forEach(function (item, index) {
  addElement(fragment, renderWizard(wizards[index]));
});

// добавляем фрагмент в DOM
addElement(wizardsListElement, fragment);

// функции
/**
 * openPopup - показывает окно выбора персонажа
 *
 */
function openPopup() {
  setup.classList.remove('hidden');
  // закрываем по esc
  onEscClose();
  // при фокусе на поле ввода отменяем закрытие по esc
  setupNameInput.addEventListener('focus', removeOnEscClose);
  setupNameInput.addEventListener('focusout', onEscClose);
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
  // удаляем обработчики
  removeOnEscClose();
  setupNameInput.removeEventListener('focus', removeOnEscClose);
  setupNameInput.removeEventListener('focusout', onEscClose);
  setup.removeEventListener('click', onSetupClick);
  setupClose.removeEventListener('keydown', onButtonEnterPress);
  setupSubmit.removeEventListener('keydown', onButtonEnterPress);
}
/**
 * onWizardFireballClick - устанавливает значение цвета из массива в фон элемента и значение инпута
 *
 */
function onWizardFireballClick() {
  var fireball = getRandomElement(WIZARDS_FIREBALL_COLORS);
  mainWizardFireball.style.backgroundColor = fireball;
  fireballInput.value = fireball;
}

/**
 * onWizardCoatClick - устанавливает значение цвета из массива в фон элемента и значение инпута
 *
 */
function onWizardCoatClick() {
  var coat = getRandomElement(WIZARDS_COAT_COLORS);
  mainWizardCoat.style.fill = coat;
  coatInput.value = coat;
}

/**
 * onWizardEyesClick - устанавливает значение цвета из массива в фон элемента и значение инпута
 *
 */
function onWizardEyesClick() {
  var eyes = getRandomElement(WIZARDS_EYES_COLORS);
  mainWizardEyes.style.fill = eyes;
  eyesInput.value = eyes;
}

/**
 * onPopupEscPress - закрывает окно при нажатии на esc
 *
 * @param  {Object} evt объект event
 */
function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
}

/**
 * onEscClose - добавляет функцию закрытия окна по esc
 *
 */
function onEscClose() {
  document.addEventListener('keydown', onPopupEscPress);
}

/**
 * removeOnEscClose - удаляет функцию закрытия окна по esc
 *
 */
function removeOnEscClose() {
  document.removeEventListener('keydown', onPopupEscPress);
}

/**
 * onIconEnterPress - открывает окно при нажатии на enter при фокусе на иконке пользователя
 *
 * @param  {Object} evt объект event
 */
function onIconEnterPress(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
}

/**
 * onButtonEnterPress - закрывает окно при нажатии на enter при кнопке в фокусе
 *
 * @param  {Object} evt объект event
 */
function onButtonEnterPress(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
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
* getRandomElement - возвращает значение случайного элемента заданного массива
*
* @param {Array} arr массив
* @param {boolean} noRepeat при значении true возвращает неповторяющиеся элементы
* @return {string} случайный элемент массива
*/
function getRandomElement(arr, noRepeat) {
  var index = Math.floor(Math.random() * arr.length);
  if (noRepeat) {
    return arr.splice(index, 1);
  } else {
    return arr[index];
  }
}

/**
* addElement - добавляет новый элемент в конец родительского блока
*
* @param {Object} parentElement родительский блок
* @param {Object} childElement добавляемый элемент
*/
function addElement(parentElement, childElement) {
  parentElement.appendChild(childElement);
}

/**
 * generateObject - возвращает объект с данными, взятыми из массивов
 *
 * @return {Object} сгенерированный объект
 */
function generateObject() {
  var obj = {};
  obj.name = getRandomElement(copyWizardsNames, true) + ' ' + getRandomElement(copyWizardsSurnames, true);
  obj.coatColor = getRandomElement(copyWizardsCoatColors, true);
  obj.eyesColor = getRandomElement(copyWizardsEyesColors, true);
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
