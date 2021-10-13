import {createAuthor, createLocation} from './util.js';
import {SIMILAR_AD_COUNT, TITLE, TYPES, CHECKINS, CHECKOUTS, FEATURES,DESCRIPTION, PHOTOS} from './data.js';

const createAd = (el, i) => ({
  author: createAuthor(i),
  offer: {
    title: _.sample(TITLE), //придумать самой
    address: `${createLocation().lat}, ${createLocation().lng}`,
    price: _.random(1, 1000000), // Случайное целое положительное число
    type: _.sample(TYPES), //строка — одно из пяти фиксированных значений: palace, flat, house, bungalow или hotel
    rooms: _.random(1, 10), //Случайное целое положительное число.
    guests: _.random(1, 100), //Случайное целое положительное число.
    checkin: _.sample(CHECKINS), ///строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00
    checkout: _.sample(CHECKOUTS), ///строка — одно из трёх фиксированных         значений: 12:00, 13:00 или 14:00
    features: _.sampleSize(FEATURES, _.random(1, FEATURES.length)), //массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.
    description: _.sample(DESCRIPTION), //придумать самой
    photos: _.sampleSize(PHOTOS, _.random(1, PHOTOS.length)),
  },
  location: createLocation(),
});

const similarAds = () => Array.from({ length: SIMILAR_AD_COUNT }, createAd);
// creatAD функция, которая возвращает значения объектов//);
similarAds();
