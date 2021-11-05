
import { setActiveFilters, setActiveForm, setDisabled, setUserFormSubmit } from './form.js';
import { addMap, addMarkers } from './map.js';
import {  showAlert, showSuccessMessage, showErrorMessage } from './util.js';
const SIMILAR_AD_COUNT = 10;

setDisabled();
addMap(setActiveForm);

fetch('https://24.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((dataAds) => {
    addMarkers(dataAds.slice(0, SIMILAR_AD_COUNT));
    setActiveFilters();
  })
  .catch(() => {
    showAlert('Не удалось загрузить данные. Попробуйте ещё раз');
  });

setUserFormSubmit(showSuccessMessage, showErrorMessage);

