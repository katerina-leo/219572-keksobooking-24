import { createSuccessTemplate, createErrorTemplate } from './util.js';
import { resetMap } from './map.js';

const adFormElement = document.querySelector('.ad-form');
const fieldsetAdFormElements = adFormElement.querySelectorAll('fieldset');
const mapFiltersElement = document.querySelector('.map__filters');
const selectMapFiltersElements = mapFiltersElement.querySelectorAll('select');
const roomsSelectElement = adFormElement.querySelector('#room_number');
const capacitySelectElement = adFormElement.querySelector('#capacity');
const selectElements = document.querySelectorAll('select');
const inputElements = document.querySelectorAll('input');
const submitButtonEl = document.querySelector('.ad-form__submit');
const currentState = {
  countRoom: roomsSelectElement.value,
  isFailSend: false,
};
const priceElement = adFormElement.querySelector('#price');
const typeElement = adFormElement.querySelector('#type');
const timeInElement = adFormElement.querySelector('#timein');
const timeOutElement = adFormElement.querySelector('#timeout');
const minPrice = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL:3000,
  HOUSE: 5000,
  PALACE: 10000,
};
const adFormReset = document.querySelector('.ad-form__reset');

const setDisabled = () => {
  adFormElement.classList.add('ad-form--disabled');
  fieldsetAdFormElements.forEach((fieldsetAdFormElement) => {
    fieldsetAdFormElement.setAttribute('disabled', 'disabled');
  });
  mapFiltersElement.classList.add('map__filters--disabled');
  selectMapFiltersElements.forEach((fieldsetAdFormElement) => {
    fieldsetAdFormElement.setAttribute('disabled', 'disabled');
  });
};
const setActive = () => {
  adFormElement.classList.remove('ad-form--disabled');
  fieldsetAdFormElements.forEach((fieldsetAdFormElement) => {
    fieldsetAdFormElement.removeAttribute('disabled');
  });
  mapFiltersElement.classList.remove('map__filters--disabled');
  selectMapFiltersElements.forEach((fieldsetAdFormElement) => {
    fieldsetAdFormElement.removeAttribute('disabled');
  });
};

//Валидация Количество комнат-количество гостей//

const checkCapacitySelect = (value) => {
  const valueToNumber = parseInt(value, 10);

  if (valueToNumber > currentState.countRoom && valueToNumber !== 0) {
    capacitySelectElement.setCustomValidity('Нужно больше комнат');
  } else if (currentState.countRoom !== 100 && valueToNumber === 0) {
    capacitySelectElement.setCustomValidity('Нужно выбрать 100 комнат');
  } else if (currentState.countRoom === 100 && valueToNumber !== 0) {
    capacitySelectElement.setCustomValidity('100 комнат - не для гостей');
  } else {
    capacitySelectElement.setCustomValidity('');
  }

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


//  Тип жилья - цена за ночь//

const getPriceNight = (value) => {
  switch (value) {
    case 'bungalow':
      priceElement.placeholder = minPrice.BUNGALOW;
      priceElement.min = minPrice.BUNGALOW;
      break;
    case 'flat':
      priceElement.placeholder = minPrice.FLAT;
      priceElement.min = minPrice.FLAT;
      break;
    case 'hotel':
      priceElement.placeholder =  minPrice.HOTEL;
      priceElement.min = minPrice.HOTEL;
      break;
    case 'house':
      priceElement.placeholder = minPrice.HOUSE;
      priceElement.min = minPrice.HOUSE;
      break;
    case 'palace':
      priceElement.placeholder = minPrice.PALACE;
      priceElement.min = minPrice.PALACE;
      break;
  }
};
typeElement.addEventListener('change', (evt) => getPriceNight(evt.target.value));

//Время заезда-время выезад//

const changeTime = (value) => {
  timeInElement.value = value;
  timeOutElement.value = value;
};

timeInElement.addEventListener('change', (evt) => changeTime(evt.target.value));
timeOutElement.addEventListener('change', (evt) => changeTime(evt.target.value));

//Валидация формы//

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

//сбрасывает изменения
const resetForm = () => {
  adFormElement.reset();
  mapFiltersElement.reset();
  resetMap(); //сбрасывает метку, балун
};

//отправка формы
const setUserFormSubmit = (onSuccess, onFail) => {
  adFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    fetch(
      'https://24.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          onSuccess(createSuccessTemplate);
          resetForm();
        } else {
          onFail(createErrorTemplate);
        }
      })
      .catch(() => {
        onFail(createErrorTemplate);
      });
  });
};

//сбрасывает изменения кнопкой

adFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

export { setActive, setDisabled, setUserFormSubmit };
