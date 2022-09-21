import Notiflix from 'notiflix';

export const BASE_URL = 'https://restcountries.com/v3.1/name';

export const fetchCountries = url => {
  return fetch(
    `${BASE_URL}/${url}?fields=name,capital,population,flags,languages`
  ).then(responce => {
    if (!responce.ok) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    }
    return responce.json();
  });
};

