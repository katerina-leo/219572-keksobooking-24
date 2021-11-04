// import { getRandomArbitrary } from'./util.js';

// const SIMILAR_AD_COUNT = 10;
// const TITLE = ['Сдаю квартиру', 'Квартира с шикарным видом на 16 этаже', 'Новый гостевой дом, баня на дровах'];
// const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
// const CHECKINS = ['12:00', '13:00', '14:00'];
// const CHECKOUTS = ['12:00', '13:00', '14:00'];
// const FEATURES = [
//   'wifi',
//   'dishwasher',
//   'parking',
//   'washer',
//   'elevator',
//   'conditioner',
// ];
// const DESCRIPTION = ['Уютное помещение для семьи с детьми', 'Апартаменты в самом центре Казани. В шаговой доступности: Кремль, мечеть Кул Шариф, Кремлевская набережная, ЦУМ, Цирк, РК Пирамида, ж/д вокзал, Булак, ул. Баумана, оз. Кабан. До метро Кремлёвская 7 минут пешком.', 'Самое удобное место расположения в Адлере. Это самый центр. Под окном пешеходная прогулочная зона и прекрасные цветущая магнолии. Все в пешей доступности: рынок, торговые центры City Plaza и Новый Век. На втором этаже дома расположен спортивный комплекс. На первом частная пекарня и колоритная кафе со свежевыпеченными круассанами и ароматным кофе.'];
// const PHOTOS = [
//   'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
//   'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
//   'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
// ];
// const locationObject = {
//   lat: {
//     min: 35.65,
//     max: 35.7,
//   },
//   lng: {
//     min: 139.7,
//     max: 139.8,
//   },
// };

// const createLocation = () => ({
//   lat: _.toNumber(
//     getRandomArbitrary(locationObject.lat.min, locationObject.lat.max, 5),
//   ),
//   lng: _.toNumber(
//     getRandomArbitrary(locationObject.lng.min, locationObject.lng.max, 5),
//   ),
// });

// const createAuthor = (i) => {
//   const indexString = (i + 1).toString();
//   const idUserImg = indexString.padStart(2, '0');
//   return {
//     avatar: `img/avatars/user${idUserImg}.png`,
//   };
// };

// /**
//  * Возвращает значения объектов.
//  */
// const createAd = (el, i) => ({
//   author: createAuthor(i),
//   offer: {
//     title: _.sample(TITLE),
//     address: `${createLocation().lat}, ${createLocation().lng}`,
//     price: _.random(1, 1000000),
//     type: _.sample(TYPES),
//     rooms: _.random(1, 10),
//     guests: _.random(1, 100),
//     checkin: _.sample(CHECKINS),
//     checkout: _.sample(CHECKOUTS),
//     features: _.sampleSize(FEATURES, _.random(1, FEATURES.length)),
//     description: _.sample(DESCRIPTION),
//     photos: _.sampleSize(PHOTOS, _.random(1, PHOTOS.length)),
//   },
//   location: createLocation(),
// });

// const createSimilarAds = () => Array.from({ length: SIMILAR_AD_COUNT }, createAd);

// export { createSimilarAds };
