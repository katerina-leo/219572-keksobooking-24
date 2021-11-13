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
const Guests = {
  ONE: 1,
  TWO: 2,
  ZERO: 0,
};

const GuestsValues = {
  ONE: '1',
  TWO: '2',
  ZERO: '0',
};

const checkType = (dataAd) => {
  const housingTypeValue = housingType.value;
  return housingTypeValue === 'any' || dataAd.offer.type === housingTypeValue;
};

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

const checkRooms = (dataAd) => {
  const value = housingRooms.value;
  switch (value) {
    case RoomValues.ONE:
      return dataAd.offer.rooms === Rooms.ONE;
    case RoomValues.TWO:
      return dataAd.offer.rooms === Rooms.TWO;
    case RoomValues.THREE:
      return dataAd.offer.rooms === Rooms.THREE;
    default:
      return true;
  }
};

const checkGuests = (dataAd) => {
  const value = housingGuests.value;
  switch (value) {
    case GuestsValues.TWO:
      return dataAd.offer.guests === Guests.TWO;
    case GuestsValues.ONE:
      return dataAd.offer.guests === Guests.ONE;
    case GuestsValues.ZERO:
      return dataAd.offer.guests === Guests.ZERO;
    default:
      return true;
  }
};

const checkFeatures = (dataAd) => {
  const checkedList = document.querySelectorAll('#housing-features .map__checkbox:checked');
  const featuresList = Array.from(checkedList).map((checkedEl) => checkedEl.value);
  const dataAdFeatures = dataAd.offer.features || [];
  return featuresList.every((featuresEl) => dataAdFeatures.includes(featuresEl));
};

const checkFilters = (dataAd) => checkType(dataAd) && checkPrice(dataAd) && checkRooms(dataAd) && checkGuests(dataAd) && checkFeatures(dataAd);


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
