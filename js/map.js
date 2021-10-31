import { createCardAd } from './popup.js';

const LAT = 35.6895;
const LNG = 139.692;

// создает иконку маркера
const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// создает специальный маркер карты
const mainPinMarker = L.marker(
  {
    lat: LAT,
    lng: LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const addMap = (similarAds, setActive) => {
  // добавляет карту
  const map = L.map('map-canvas')
    .on('load', () => {
      setActive();
    })
    .setView({
      lat: LAT,
      lng: LNG,
    }, 9);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker.addTo(map); // добавляет метку на карту

  const addressInputElement = document.querySelector('#address');
  addressInputElement.value = `${LAT}, ${LNG}`; // координаты адреса по умолчанию

  mainPinMarker.on('moveend', (evt) => {
    const lat = (evt.target.getLatLng().lat).toFixed(5);
    const lng = (evt.target.getLatLng().lng).toFixed(5);
    addressInputElement.value = `${lat}, ${lng}`;
  });

  // обычные метки c объявлениями
  similarAds.forEach((dataAd) => {
    const {location: {lat, lng}} = dataAd;
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
    const marker = L.marker({
      lat,
      lng,
    },
    {
      icon,
    });
    marker
      .addTo(map)
      .bindPopup(createCardAd(dataAd));
  });
};

export { addMap };
