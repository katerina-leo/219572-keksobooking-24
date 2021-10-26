const adFormElement = document.querySelector('.ad-form');
const fieldsetAdFormElements = adFormElement.querySelectorAll('fieldset');
const mapFiltersElement = document.querySelector('.map__filters');
const selectMapFiltersElements = mapFiltersElement.querySelectorAll('select');
const roomsSelectElement = adFormElement.querySelector('#room_number');
const capacitySelectElement = adFormElement.querySelector('#capacity');

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

//Валидация Количество комнат-количество гостей
const currentState = {
  countRoom: null,
};

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

export { setActive, setDisabled };
