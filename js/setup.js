'use strict';
/**
* Возвращает значение случайного элемента заданного массива
*
* @param {Array} arr массив
* @return {string} случайный элемент массива
*/
var getRandomElement = function (arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

/**
* Добавляет новый элемент в конец родительского блока
*
* @param {Object} parentElement родительский блок
* @param {Object} childElement добавляемый элемент
*/
var addElement = function (parentElement, childElement) {
  parentElement.appendChild(childElement);
};

/**
* Возвращает скопированный с шаблона элемент со стилями
*
* @param {Object} template шаблон
* @param {Array} arr массив с используемыми свойствами
* @return {Object} скопированный стилизованный DOM-элемент
*/
var renderWizard = function (template, arr) {
  var cloneElement = template.cloneNode(true);
  var wizardName = cloneElement.querySelector('.setup-similar-label');
  var wizardCoat = cloneElement.querySelector('.wizard-coat');
  var wizardEyes = cloneElement.querySelector('.wizard-eyes');
  wizardName.textContent = arr[i].name;
  wizardCoat.style.fill = arr[i].coatColor;
  wizardEyes.style.fill = arr[i].eyesColor;
  return cloneElement;
};

var TOTAL_WIZARDS_NUMBER = 4;

// массивы
var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var WIZARDS_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var WIZARDS_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var wizards = [];

// заполняем wizards
for (var i = 0; i < TOTAL_WIZARDS_NUMBER; i++) {
  wizards[i] = {};
  wizards[i].name = getRandomElement(WIZARDS_NAMES) + ' ' + getRandomElement(WIZARDS_SURNAMES);
  wizards[i].coatColor = getRandomElement(WIZARDS_COAT_COLORS);
  wizards[i].eyesColor = getRandomElement(WIZARDS_EYES_COLORS);
}

var wizardsList = document.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

for (i = 0; i < wizards.length; i++) {
  addElement(fragment, renderWizard(wizardTemplate, wizards));
}

addElement(wizardsList, fragment);
