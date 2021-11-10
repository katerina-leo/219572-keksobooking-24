
import { setActiveFilters, setActiveForm, setDisabled, setUserFormSubmit } from './form.js';
import { addMap, addMarkers, SIMILAR_AD_COUNT, renderMarkers } from './map.js';
import { showSuccessMessage, showErrorMessage } from './util.js';
import { getData } from './api.js';
import { setFilterListeners } from './filter.js';

setDisabled();
addMap(setActiveForm);

getData((dataAds) => {
  addMarkers(dataAds.slice(0, SIMILAR_AD_COUNT));
  setActiveFilters();
});

setFilterListeners(renderMarkers);
setUserFormSubmit(showSuccessMessage, showErrorMessage);
