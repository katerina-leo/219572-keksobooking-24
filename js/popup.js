//словарь типов жилья на русском
const LABEL_TYPE = {
  palace: 'дворец',
  flat: 'квартира',
  house: 'дом',
  bungalow: 'бунгало',
  hotel: 'отель',
};

const createCardAd = (dataAd) => {
  //шаблон карты объявления
  const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');
  //склонируем шаблон карточки объявления
  const adElement = similarAdTemplate.cloneNode(true);
  //вставляем данные в шаблон
  adElement.querySelector('.popup__title').textContent = dataAd.offer.title;
  adElement.querySelector('.popup__text--address').textContent = dataAd.offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${dataAd.offer.price} ₽/ночь`;
  adElement.querySelector('.popup__type').textContent = LABEL_TYPE[dataAd.offer.type];
  adElement.querySelector('.popup__text--capacity').textContent = `${dataAd.offer.rooms} комнаты для ${dataAd.offer.guests} гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${dataAd.offer.checkin}, выезд до ${dataAd.offer.checkout}`;
  adElement.querySelector('.popup__description').textContent = dataAd.offer.description;
  adElement.querySelector('.popup__avatar').src = dataAd.author.avatar;
  //добавление удобств
  const featuresList = dataAd.offer.features || [];
  const popupFeaturesContainer = adElement.querySelector('.popup__features');
  const popupFeaturesList = popupFeaturesContainer.querySelectorAll('.popup__feature');
  const modifieres = featuresList.map((featuresElement) => `popup__feature--${featuresElement}`);
  popupFeaturesList.forEach((popupFeaturesListItem) => {
    const modifier = popupFeaturesListItem.classList[1];

    if (!modifieres.includes(modifier)) {
      popupFeaturesListItem.remove();
    }
  });
  //Добавление фото
  const photosList = dataAd.offer.photos || [];
  const popupPhotosContainer = adElement.querySelector('.popup__photos');
  photosList.forEach((photosListElement) => {
    const photosListItem = document.createElement('img');
    photosListItem.classList.add('popup__photo');
    photosListItem.height = 40;
    photosListItem.width = 45;
    photosListItem.src = photosListElement;
    popupPhotosContainer.appendChild(photosListItem);
  });

  return adElement;
};


export {createCardAd};
