import { createSimilarAds } from './data.js';
import { createCardAd } from './popup.js';
import { setActive,setDisabled } from './form.js';

const ads = createSimilarAds();
const dataAd = ads[0];
const mapElement = document.querySelector('#map-canvas');
const fragment = document.createDocumentFragment();
fragment.appendChild(createCardAd(dataAd));
mapElement.appendChild(fragment);
setDisabled();
setActive();
