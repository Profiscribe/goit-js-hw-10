import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const searchInput = document.getElementById('search-box');
const countryInfo = document.querySelector('[class="country-info"]');
const countryList = document.querySelector('[class="country-list"]');

searchInput.addEventListener('input', debounce(getCountryData, DEBOUNCE_DELAY));

function getCountryData(event) {
  const countryName = event.target.value.trim();
  resetMarkup(countryList);
  resetMarkup(countryInfo);
  if (!countryName) {
    return;
  }
  fetchCountries(countryName)
    .then(data => {
      if (data.length === 1) {
        markupCountry(data[0]);
      }
      if (data.length >= 2 && data.length <= 10) {
        markupCountries(data);
      } else if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      }
    })
    .catch(err => {
      alert(err);
    });
}

function markupCountry(countryData) {
  console.log(countryData);
  const { flags, capital, population, name, languages } = countryData;
  const lang = Object.values(languages).join(', ');

  const {} = languages;
  return countryInfo.insertAdjacentHTML(
    'beforeend',
    `<div><img src="${flags.svg}" width = "75" alt ="flag"/>
    <span>${name.official}</span></div>
    <div> <span class=boldText>Capital: </span>${capital}</div>
    <div> <span class=boldText>Population: </span>${population}</div>
    <div> <span class=boldText>Languages: </span>${lang}</div>
    `
  );
}

function markupCountries(countryData) {
  countryData.map(country => {
    const { flags, name } = country;
    return countryList.insertAdjacentHTML(
      'beforeend',
      `<div><img src=${flags.svg} width = "30"/>
      <span>${name.official}</span></div>`
    );
  });
}

function resetMarkup(element) {
  element.innerHTML = '';
}