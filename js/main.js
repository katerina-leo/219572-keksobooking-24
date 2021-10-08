function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min < 0 || min >= max) {
    return 'Задан неверный диапазон';
  }
  return Math.round(Math.random() * (max - min + 1)) + min;
}
getRandomIntInclusive(1, 5);

function getRandomArbitrary(min, max, digits) {
  if (min >= max || min < 0) {
    return 'Задан неверный диапазон! Укажите другие числа.';
  }
  return (Math.random() * (max - min) + min).toFixed(digits);
}
getRandomArbitrary(2, 5, 4);

const SIMILAR_AD_COUNT = 10;
//const ADDRESS = '{{location.lat}}, {{location.lng}}';
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKINS = ['12:00', '13:00', '14:00'];
const CHECKOUTS = ['12:00', '13:00', '14:00'];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/  javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const locationObject = {
  lat: {
    min: 35.65,
    max: 35.7,
  },
  lng: {
    min: 139.7,
    max: 139.8,
  },
};
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
const createAd = (el, i) => ({
  author: createAuthor(i),
  offer: {
    title: 'Сдаю квартиру', //придумать самой
    address: `${createLocation().lat}, ${createLocation().lng}`,
    price: _.random(1, 1000000), // Случайное целое положительное число
    type: _.sample(TYPES), //строка — одно из пяти фиксированных значений: palace, flat, house, bungalow или hotel
    rooms: _.random(1, 10), //Случайное целое положительное число.
    guests: _.random(1, 100), //Случайное целое положительное число.
    checkin: _.sample(CHECKINS), ///строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00
    checkout: _.sample(CHECKOUTS), ///строка — одно из трёх фиксированных         значений: 12:00, 13:00 или 14:00
    features: _.sampleSize(FEATURES, _.random(1, FEATURES.length)), //массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.
    description: 'Уютное помещение для семьи с детьми', //придумать самой
    photos: _.sampleSize(PHOTOS, _.random(1, PHOTOS.length)),
  },
  location: createLocation(),
});

const similarAds = () => Array.from({ length: SIMILAR_AD_COUNT }, createAd);
// creatAD функция, которая возвращает значения объектов//);
similarAds();

