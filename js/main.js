import { setActiveFilters, setDisabled, setUserFormSubmit } from './form.js';
import { addMap, addMarkers, SIMILAR_AD_COUNT, renderMarkers } from './map.js';
import { showSuccessMessage, showErrorMessage } from './util.js';
import { getData } from './api.js';
import { setFilterListeners } from './filter.js';


const RERENDER_DELAY = 500;

setDisabled();

addMap(() => {
  getData((dataAds) => {
    addMarkers(dataAds.slice(0, SIMILAR_AD_COUNT));
    setActiveFilters();
  });
});

setFilterListeners(_.debounce(renderMarkers, RERENDER_DELAY, {
  'leading': true,
  'trailing': true,
}));
setUserFormSubmit(showSuccessMessage, showErrorMessage);

