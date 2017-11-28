'use strict';

var TOTAL_WIZARDS_NUMBER = 4;
var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARDS_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARDS_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var copyWizardsNames = WIZARDS_NAMES.slice();
var copyWizardsSurnames = WIZARDS_SURNAMES.slice();
var copyWizardsCoatColors = WIZARDS_COAT_COLORS.slice();
var copyWizardsEyesColors = WIZARDS_EYES_COLORS.slice();
var wizards = [];
var wizardsListElement = document.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

document.querySelector('.setup').classList.remove('hidden');
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

/**
* getRandomElement - возвращает значение случайного элемента заданного массива, удаляя его из массива
*
* @param {Array} arr массив
* @return {string} случайный элемент массива
*/
function getRandomElement(arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr.splice(index, 1);
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
  obj.name = getRandomElement(copyWizardsNames) + ' ' + getRandomElement(copyWizardsSurnames);
  obj.coatColor = getRandomElement(copyWizardsCoatColors);
  obj.eyesColor = getRandomElement(copyWizardsEyesColors);
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
