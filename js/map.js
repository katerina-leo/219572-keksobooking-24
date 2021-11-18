import { createCardAd } from './popup.js';
import { getData } from './api.js';
import { checkFilters } from './filter.js';
import { setActiveForm } from './form.js';


const InitCoordinate = {
  LAT: 35.68950,
  LNG: 139.69171,
};

const SIMILAR_AD_COUNT = 10;
const DIGITS = 5;

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: InitCoordinate.LAT,
    lng: InitCoordinate.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const map = L.map('map-canvas');
const addressInputElement = document.querySelector('#address');

const addMap = (loadData) => {
  map
    .on('load', () => {
      setActiveForm();
      loadData();
    })
    .setView({
      lat: InitCoordinate.LAT,
      lng: InitCoordinate.LNG,
    }, 11);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker.addTo(map);

  addressInputElement.value = `${InitCoordinate.LAT.toFixed(DIGITS)}, ${InitCoordinate.LNG.toFixed(DIGITS)}`;

  mainPinMarker.on('moveend', (evt) => {
    const lat = (evt.target.getLatLng().lat).toFixed(DIGITS);
    const lng = (evt.target.getLatLng().lng).toFixed(DIGITS);
    addressInputElement.value = `${lat}, ${lng}`;
  });
};

const markerGroup = L.layerGroup().addTo(map);

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
      .addTo(markerGroup)
      .bindPopup(createCardAd(dataAd));
  });
};

const resetMap = () => {
  const latLng = L.latLng(InitCoordinate.LAT, InitCoordinate.LNG);
  mainPinMarker.setLatLng(latLng);
  addressInputElement.value = `${InitCoordinate.LAT.toFixed(DIGITS)}, ${InitCoordinate.LNG.toFixed(DIGITS)}`;
  map.closePopup();
};

const renderMarkers = () => {
  getData((dataAds) => {
    dataAds = dataAds.filter((dataAd) => checkFilters(dataAd));
    markerGroup.clearLayers();
    addMarkers(dataAds.slice(0, SIMILAR_AD_COUNT));
  });
};

export { addMap, addMarkers, resetMap, renderMarkers, SIMILAR_AD_COUNT };
