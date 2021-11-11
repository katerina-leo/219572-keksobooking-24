import { createCardAd } from './popup.js';
import { getData } from './api.js';
import { checkFilters } from './filter.js';

const LAT = 35.6895;
const LNG = 139.692;
const SIMILAR_AD_COUNT = 10;

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

const map = L.map('map-canvas');
const addressInputElement = document.querySelector('#address');
const mapData = {
  markers: [],
};

const addMap = (setActiveForm) => {
  map
    .on('load', () => {
      setActiveForm();
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

  addressInputElement.value = `${LAT}, ${LNG}`; // координаты адреса по умолчанию

  mainPinMarker.on('moveend', (evt) => {
    const lat = (evt.target.getLatLng().lat).toFixed(5);
    const lng = (evt.target.getLatLng().lng).toFixed(5);
    addressInputElement.value = `${lat}, ${lng}`;
  });
};

// обычные метки c объявлениями
const addMarkers = (dataAds) => {
  dataAds.forEach((dataAd) => {
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
    mapData.markers.push(marker);
  });
};

//сбрасывает метку, показ балуна
const resetMap = () => {
  const latLng = L.latLng(LAT, LNG);
  mainPinMarker.setLatLng(latLng);
  addressInputElement.value = `${LAT}, ${LNG}`; // координаты адреса по умолчанию
  map.closePopup();
};

const removeMarkers = () => {
  mapData.markers.forEach((marker) => marker.remove());
  mapData.markers = [];
};

//перерисовывает маркеры при фильтрации
const renderMarkers = () => {
  getData((dataAds) => {
    dataAds = dataAds.filter((dataAd) => checkFilters(dataAd));
    removeMarkers();
    addMarkers(dataAds.slice(0, SIMILAR_AD_COUNT));
  });
};

export { addMap, addMarkers, resetMap, renderMarkers, removeMarkers, SIMILAR_AD_COUNT };
