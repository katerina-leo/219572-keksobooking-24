import { showAlert } from './util.js';
const GETTING_URL = 'https://24.javascript.pages.academy/keksobooking/data';
const POSTING_URL = 'https://24.javascript.pages.academy/keksobooking';

const data = {
  ads: [],
};

const getData = (onSuccess) => {
  if (data.ads.length === 0) {
    fetch(GETTING_URL)
      .then((response) => response.json())
      .then((dataAds) => {
        data.ads = dataAds;
        onSuccess(dataAds);
      })
      .catch(() => {
        showAlert('Не удалось загрузить данные. Попробуйте ещё раз');
      });
  } else {
    onSuccess(data.ads);
  }
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
