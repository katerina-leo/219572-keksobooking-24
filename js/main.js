import { createSimilarAds } from './data.js';
import { setActive, setDisabled} from './form.js';
import { addMap } from './map.js';

const similarAds = createSimilarAds();
// удаляем вывод одного объявления в области карты
// const dataAd = similarAds[0];
// const mapElement = document.querySelector('#map-canvas');
// const fragment = document.createDocumentFragment();
// fragment.appendChild(createCardAd(dataAd));
// mapElement.appendChild(fragment);

setDisabled();
addMap(similarAds, setActive);
