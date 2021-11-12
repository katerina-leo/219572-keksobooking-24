const mapFiltersElement = document.querySelector('.map__filters');
const housingType = mapFiltersElement.querySelector('#housing-type');
const housingPrice = mapFiltersElement.querySelector('#housing-price');
const housingRooms = mapFiltersElement.querySelector('#housing-rooms');
const housingGuests = mapFiltersElement.querySelector('#housing-guests');

const PriceConstants = {
  LOW: 10000,
  HIGH: 50000,
};

const Rooms = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
};

const RoomValues = {
  ONE: '1',
  TWO: '2',
  THREE: '3',
};

const checkType = (dataAd) => {
  const housingTypeValue = housingType.value;
  return housingTypeValue === 'any' || dataAd.offer.type === housingTypeValue;
};

const checkPrice = (dataAd) => {
  const value = housingPrice.value;

  // лучше в switch переделать, не замечания, но свитч красиве смотрится
  if (value === 'middle') {
    return dataAd.offer.price >= PriceConstants.LOW && dataAd.offer.price <= PriceConstants.HIGH;
  } else if (value === 'low') {
    return dataAd.offer.price < PriceConstants.LOW;
  } else if (value === 'high') {
    return dataAd.offer.price > PriceConstants.HIGH;
  } else {
    return true; // если даже не переделывать в свитч, то это нужно вынести из условия
    // критерия Д15
  }
};

const checkRooms = (dataAd) => {
  const value = housingRooms.value;
  // аналогично предыдущему
  if (value === RoomValues.ONE) {
    return dataAd.offer.rooms === Rooms.ONE;
  } else if (value === RoomValues.TWO) {
    return dataAd.offer.rooms === Rooms.TWO;
  } else if (value === RoomValues.THREE) {
    return dataAd.offer.rooms === Rooms.THREE;
  } else {
    return true;
  }
};

const checkGuests = (dataAd) => {
  const value = housingGuests.value;
  // аналогично предыдущему
  if (value === '2') {
    return dataAd.offer.guests === 2;
  } else if (value === '1') {
    return dataAd.offer.guests === 1;
  } else if (value === '0') {
    return dataAd.offer.guests === 0;
  } else {
    return true;
  }
};

const checkFeatures = (dataAd) => {
  const checkedList = document.querySelectorAll('#housing-features .map__checkbox:checked');
  const featuresList = Array.from(checkedList).map((checkedEl) => checkedEl.value);
  const dataAdFeatures = dataAd.offer.features || [];
  return featuresList.every((featuresEl) => dataAdFeatures.includes(featuresEl));
};

//все пункты фильтров
const checkFilters = (dataAd) => checkType(dataAd) && checkPrice(dataAd) && checkRooms(dataAd) && checkGuests(dataAd) && checkFeatures(dataAd);

//слушатели события на фильтр
const setFilterListeners = (renderMarkers) => {
  housingType.addEventListener('change', renderMarkers);
  housingPrice.addEventListener('change', renderMarkers);
  housingRooms.addEventListener('change', renderMarkers);
  housingGuests.addEventListener('change', renderMarkers);
  mapFiltersElement.querySelectorAll('#housing-features .map__checkbox').forEach((element) => {
    element.addEventListener('change', renderMarkers);
  });
};

export { checkFilters, setFilterListeners };
