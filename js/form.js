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
  } else if (valueToNumber === 0) {
    capacitySelectElement.setCustomValidity('Нужно выбрать 100 комнат');
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
roomsSelectElement.addEventListener('change', (evt) => setCountRooms(evt.target.value));


//Валидация формы//

const setErrorBorder = () => {
  const paintBorder = (el) => {
    if (el.validity.valid) {
      el.style.borderColor = 'white';
    } else {
      el.style.bordeColor =  'red';
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
  const isValidForm = adFormElement.checkValidity();

  if (isValidForm) {
    currentState.isFailSend = false;
  } else {
    currentState.isFailSend = true;
    setErrorBorder();
  }
});

export { setActive, setDisabled };
