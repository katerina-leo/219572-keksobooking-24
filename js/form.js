import { createSuccessTemplate, createErrorTemplate } from './util.js';
import { resetMap, renderMarkers } from './map.js';
import { sendData } from './api.js';
import { previewAvatar, previewPhotoContainer } from './img.js';

const adFormElement = document.querySelector('.ad-form');
const fieldsetAdFormElements = adFormElement.querySelectorAll('fieldset');
const mapFiltersElement = document.querySelector('.map__filters');
const selectMapFiltersElements = mapFiltersElement.querySelectorAll('select');
const selectElements = document.querySelectorAll('select');
const inputElements = document.querySelectorAll('input');
const submitButtonEl = document.querySelector('.ad-form__submit');
const roomsSelectElement = adFormElement.querySelector('#room_number');
const capacitySelectElement = adFormElement.querySelector('#capacity');
const priceElement = adFormElement.querySelector('#price');
const typeElement = adFormElement.querySelector('#type');
const timeInElement = adFormElement.querySelector('#timein');
const timeOutElement = adFormElement.querySelector('#timeout');
const adFormReset = document.querySelector('.ad-form__reset');
const currentState = {
  countRoom: roomsSelectElement.value,
  isFailSend: false,
};
const MinPrice = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL:3000,
  HOUSE: 5000,
  PALACE: 10000,
};
//некативное состояние
const setDisabled = () => {
  adFormElement.classList.add('ad-form--disabled');
  fieldsetAdFormElements.forEach((fieldsetAdFormElement) => {
    fieldsetAdFormElement.disabled = true;
  });
  mapFiltersElement.classList.add('map__filters--disabled');
  selectMapFiltersElements.forEach((fieldsetAdFormElement) => {
    fieldsetAdFormElement.disabled = true;
  });
};
//активное состояние формы
const setActiveForm = () => {
  adFormElement.classList.remove('ad-form--disabled');
  fieldsetAdFormElements.forEach((fieldsetAdFormElement) => {
    fieldsetAdFormElement.disabled = false;
  });
};
//активное состояние фильтров
const setActiveFilters = () => {
  mapFiltersElement.classList.remove('map__filters--disabled');
  selectMapFiltersElements.forEach((fieldsetAdFormElement) => {
    fieldsetAdFormElement.disabled = false;
  });
};
//валидация комнат и гостей
const checkCapacitySelect = (value) => {
  const valueToNumber = parseInt(value, 10);
  let message = '';

  if (valueToNumber > currentState.countRoom && valueToNumber !== 0) {
    message = 'Нужно больше комнат';
  } else if (currentState.countRoom !== 100 && valueToNumber === 0) {
    message = 'Нужно выбрать 100 комнат';
  } else if (currentState.countRoom === 100 && valueToNumber !== 0) {
    message = '100 комнат - не для гостей';
  }
  capacitySelectElement.setCustomValidity(message);

  capacitySelectElement.reportValidity();
};

const setCountRooms = (value) => {
  const valueToNumber = parseInt(value, 10);
  currentState.countRoom = valueToNumber;
};

capacitySelectElement.addEventListener('change', (evt) => checkCapacitySelect(evt.target.value));

roomsSelectElement.addEventListener('change', (evt) => {
  setCountRooms(evt.target.value);
  checkCapacitySelect(capacitySelectElement.value);
});
//валидация цены 
const getPriceNight = (value) => {
  switch (value) {
    case 'bungalow':
      priceElement.placeholder = MinPrice.BUNGALOW;
      priceElement.min = MinPrice.BUNGALOW;
      break;
    case 'flat':
      priceElement.placeholder = MinPrice.FLAT;
      priceElement.min = MinPrice.FLAT;
      break;
    case 'hotel':
      priceElement.placeholder =  MinPrice.HOTEL;
      priceElement.min = MinPrice.HOTEL;
      break;
    case 'house':
      priceElement.placeholder = MinPrice.HOUSE;
      priceElement.min = MinPrice.HOUSE;
      break;
    case 'palace':
      priceElement.placeholder = MinPrice.PALACE;
      priceElement.min = MinPrice.PALACE;
      break;
  }
};
typeElement.addEventListener('change', (evt) => getPriceNight(evt.target.value));
//время заезда и выезда
const changeTime = (value) => {
  timeInElement.value = value;
  timeOutElement.value = value;
};

timeInElement.addEventListener('change', (evt) => changeTime(evt.target.value));
timeOutElement.addEventListener('change', (evt) => changeTime(evt.target.value));

const setErrorBorder = () => {
  const paintBorder = (el) => {
    if (el.validity.valid) {
      el.style.borderColor = 'white';
    } else {
      el.style.borderColor = 'red';
    }
  };

  selectElements.forEach((el) => {
    paintBorder(el);
  });

  inputElements.forEach((el) => {
    paintBorder(el);
  });
};

adFormElement.addEventListener('change', () => {
  if (currentState.isFailSend) {
    setErrorBorder();
  }
});

submitButtonEl.addEventListener('click', () => {
  checkCapacitySelect(capacitySelectElement.value);
  const isValidForm = adFormElement.checkValidity();

  if (isValidForm) {
    currentState.isFailSend = false;
  } else {
    currentState.isFailSend = true;
    setErrorBorder();
  }
});

//очищает форму
const resetForm = () => {
  adFormElement.reset();
  mapFiltersElement.reset();
  setCountRooms(roomsSelectElement.value);
  resetMap();
  renderMarkers();
  priceElement.placeholder = MinPrice.FLAT;
  priceElement.min = MinPrice.FLAT;
  previewAvatar.src = 'img/avatars/default.png';
  previewPhotoContainer.innerHTML = '';
};
//отправка формы
const setUserFormSubmit = (onSuccess, onFail) => {
  adFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        onSuccess(createSuccessTemplate);
        resetForm();
      },
      () => onFail(createErrorTemplate),
      new FormData(evt.target),
    );
  });
};
//кнопка очистки формы
adFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

export { setActiveFilters, setActiveForm, setDisabled, setUserFormSubmit };
