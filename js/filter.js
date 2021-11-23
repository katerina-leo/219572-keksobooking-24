const mapFiltersElement = document.querySelector('.map__filters');
const housingType = mapFiltersElement.querySelector('#housing-type');
const housingPrice = mapFiltersElement.querySelector('#housing-price');
const housingRooms = mapFiltersElement.querySelector('#housing-rooms');
const housingGuests = mapFiltersElement.querySelector('#housing-guests');

const PriceConstants = {
  LOW: 10000,
  HIGH: 50000,
};

const RoomValues = {
  ONE: '1',
  TWO: '2',
  THREE: '3',
};

const GuestsValues = {
  ONE: '1',
  TWO: '2',
  ZERO: '0',
};
//фильтр типа жилья
const checkType = (dataAd) => {
  const housingTypeValue = housingType.value;
  return housingTypeValue === 'any' || dataAd.offer.type === housingTypeValue;
};
//фильр цены
const checkPrice = (dataAd) => {
  const value = housingPrice.value;
  switch (value) {
    case 'middle':
      return dataAd.offer.price >= PriceConstants.LOW && dataAd.offer.price <= PriceConstants.HIGH;
    case 'low':
      return dataAd.offer.price < PriceConstants.LOW;
    case 'high':
      return dataAd.offer.price > PriceConstants.HIGH;
    default:
      return true;
  }
};
//фильтр количества комнат
const checkRooms = (dataAd) => {
  const value = housingRooms.value;
  switch (value) {
    case RoomValues.ONE:
      return dataAd.offer.rooms === _.toNumber(RoomValues.ONE);
    case RoomValues.TWO:
      return dataAd.offer.rooms === _.toNumber(RoomValues.TWO);
    case RoomValues.THREE:
      return dataAd.offer.rooms === _.toNumber(RoomValues.THREE);
    default:
      return true;
  }
};
//количество гостей
const checkGuests = (dataAd) => {
  const value = housingGuests.value;
  switch (value) {
    case GuestsValues.TWO:
      return dataAd.offer.guests === _.toNumber(GuestsValues.TWO);
    case GuestsValues.ONE:
      return dataAd.offer.guests === _.toNumber(GuestsValues.ONE);
    case GuestsValues.ZERO:
      return dataAd.offer.guests === _.toNumber(GuestsValues.ZERO);
    default:
      return true;
  }
};
//фильтр удобств
const checkFeatures = (dataAd) => {
  const checkedList = document.querySelectorAll('#housing-features .map__checkbox:checked');
  const featuresList = Array.from(checkedList).map((checkedEl) => checkedEl.value);
  const dataAdFeatures = dataAd.offer.features || [];
  return featuresList.every((featuresEl) => dataAdFeatures.includes(featuresEl));
};
//все фильтры
const checkFilters = (dataAd) => checkType(dataAd) && checkPrice(dataAd) && checkRooms(dataAd) && checkGuests(dataAd) && checkFeatures(dataAd);

//слушатели события на фильтр
const setFilterListeners = (onFilterChange) => {
  housingType.addEventListener('change', onFilterChange);
  housingPrice.addEventListener('change', onFilterChange);
  housingRooms.addEventListener('change', onFilterChange);
  housingGuests.addEventListener('change', onFilterChange);
  mapFiltersElement.querySelectorAll('#housing-features .map__checkbox').forEach((element) => {
    element.addEventListener('change', onFilterChange);
  });
};

export { checkFilters, setFilterListeners };
