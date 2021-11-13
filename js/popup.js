
const labelType = {
  palace: 'дворец',
  flat: 'квартира',
  house: 'дом',
  bungalow: 'бунгало',
  hotel: 'отель',
};

const createCardAd = (dataAd) => {
  const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');
  const adElement = similarAdTemplate.cloneNode(true);
  const popupFeaturesContainer = adElement.querySelector('.popup__features');
  const popupFeaturesList = popupFeaturesContainer.querySelectorAll('.popup__feature');
  const popupPhotosContainer = adElement.querySelector('.popup__photos');

  adElement.querySelector('.popup__title').textContent = dataAd.offer.title;
  adElement.querySelector('.popup__text--address').textContent = dataAd.offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${dataAd.offer.price} ₽/ночь`;
  adElement.querySelector('.popup__type').textContent = labelType[dataAd.offer.type];
  adElement.querySelector('.popup__text--capacity').textContent = `${dataAd.offer.rooms} комнаты для ${dataAd.offer.guests} гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${dataAd.offer.checkin}, выезд до ${dataAd.offer.checkout}`;
  adElement.querySelector('.popup__description').textContent = dataAd.offer.description;
  adElement.querySelector('.popup__avatar').src = dataAd.author.avatar;

  const featuresList = dataAd.offer.features || [];
  popupFeaturesList.forEach((popupFeaturesListItem) => {
    const isNecessary = featuresList.some(
      (featuresElement) => popupFeaturesListItem.classList.contains(`popup__feature--${featuresElement}`),
    );
    if (!isNecessary) {
      popupFeaturesListItem.remove();
    }
  });

  const photosList = dataAd.offer.photos || [];
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
