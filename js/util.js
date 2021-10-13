import {locationObject} from'./data.js';

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min < 0 || min >= max) {
    return 'Задан неверный диапазон';
  }
  return Math.round(Math.random() * (max - min)) + min;
}
getRandomIntInclusive(1, 5);

function getRandomArbitrary(min, max, digits) {
  if (min >= max || min < 0) {
    return 'Задан неверный диапазон! Укажите другие числа.';
  }
  return (Math.random() * (max - min) + min).toFixed(digits);
}
getRandomArbitrary(2, 5, 4);
const createLocation = () => ({
  lat: _.toNumber(
    getRandomArbitrary(locationObject.lat.min, locationObject.lat.max, 5),
  ),
  lng: _.toNumber(
    getRandomArbitrary(locationObject.lng.min, locationObject.lng.max, 5),
  ),
});

const createAuthor = (i) => {
  const indexString = (i + 1).toString();
  const idUserImg = indexString.padStart(2, '0');
  return {
    avatar: `img/avatars/user${idUserImg}.png`,
  };
};
export {getRandomIntInclusive, getRandomArbitrary, createLocation, createAuthor};
