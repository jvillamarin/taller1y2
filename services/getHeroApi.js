const API_KEY = "6e9b696814278e845acc29b3492f9dbe";
const API_URL = "https://gateway.marvel.com:443/v1/public/characters";
const HASH = "52b5704684477c9d99073a8a1d12e103";
const TS = "3401";

// getting hero data 
export const getHeroData = (inputField, errorField) => {
  let ID_HERO;
  
  const url = `${API_URL}?nameStartsWith=${inputField.value}&apikey=${API_KEY}&hash=${HASH}&ts=${TS}`;

  return fetch(url)
    .then((res) => res.json())
    .then((response) => {
      const {
        data: { results },
      } = response;      
      
      ID_HERO = results[0].id;
      
      const heroData = results[0];
      
    //  seaching heros's comics for id
      const urlComics = `${API_URL}/${ID_HERO}/comics?apikey=${API_KEY}&hash=${HASH}&ts=${TS}`;      

      return fetch(urlComics)
        .then((res) => res.json())
        .then((response) => {
          const {
            data: { results },
          } = response;

          const heroComics = results;

          const promise = {
            heroComics,
            heroData,
          };
          errorField.style.opacity = 0;
          return promise;
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => {
      console.log(Error + error);
      errorField.style.opacity = 1;     
    });
};
