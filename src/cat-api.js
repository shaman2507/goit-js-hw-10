export { fetchBreeds, fetchCatByBreed };

const API_KEY =
  'live_NxolyaYyvn5ht8p6jrskNMj50lggJUnfVSiJZoq1OjjvcZzvNQq3S1HdA0tFXYDT';
const BASE_URL = 'https://api.thecatapi.com/v1';
const SECOND_URL = 'https://api.thecatapi.com/v1/images/search';

async function fetchBreeds() {
  try {const resp = await fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`);
  const result = await resp.json();
  if (!resp.ok) {
    Notiflix.Notify.warning(resp.statusText);}
  return result;
    
  } catch (error) {
    console.log(error);
  }
}

async function fetchCatByBreed(breedId){
  try {
    const resp = await fetch(`${SECOND_URL}?api_key=${API_KEY}&breed_ids=${breedId}`);
  const result = await resp.json();
  if (!resp.ok) {
    resp.statusText;
  }
  return result;
  } catch (error) {
    console.log(error);
  }
  
}

