import { showAlert } from './util.js';
const GETTING_URL = 'https://24.javascript.pages.academy/keksobooking/data';
const POSTING_URL = 'https://24.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
  fetch(GETTING_URL)
    .then((response) => response.json())
    .then((dataAds) => {
      onSuccess(dataAds);
    })
    .catch(() => {
      showAlert('Не удалось загрузить данные. Попробуйте ещё раз');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    POSTING_URL,
    {
      method: 'POST',
      body: body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
