
import { setActive, setDisabled, setUserFormSubmit } from './form.js';
import { addMap } from './map.js';
import { fullScreenSuccess, showAlert, fullScreenError } from './util.js';
const SIMILAR_AD_COUNT = 10;

setDisabled();

fetch('https://24.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((dataAds) => {
    addMap(dataAds.slice(0, SIMILAR_AD_COUNT), setActive);
  })
  .catch(() => {
    showAlert('Не удалось загрузить данные. Попробуйте ещё раз');
  });

setUserFormSubmit(fullScreenSuccess, fullScreenError);

