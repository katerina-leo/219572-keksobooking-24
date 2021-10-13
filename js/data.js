
const SIMILAR_AD_COUNT = 10;
const TITLE = ['Сдаю квартиру', 'Квартира с шикарным видом на 16 этаже', 'Новый гостевой дом, баня на дровах'];
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
const DESCRIPTION = ['Уютное помещение для семьи с детьми', 'Апартаменты в самом центре Казани. В шаговой доступности: Кремль, мечеть Кул Шариф, Кремлевская набережная, ЦУМ, Цирк, РК Пирамида, ж/д вокзал, Булак, ул. Баумана, оз. Кабан. До метро Кремлёвская 7 минут пешком.', 'Самое удобное место расположения в Адлере. Это самый центр. Под окном пешеходная прогулочная зона и прекрасные цветущая магнолии. Все в пешей доступности: рынок, торговые центры City Plaza и Новый Век. На втором этаже дома расположен спортивный комплекс. На первом частная пекарня и колоритная кафе со свежевыпеченными круассанами и ароматным кофе.'];
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
export {SIMILAR_AD_COUNT, TITLE, TYPES, CHECKINS, CHECKOUTS, FEATURES,DESCRIPTION, PHOTOS, locationObject};
