import { getHeroData } from "../services/getHeroApi.js";
const form = document.getElementById("heroForm");
const mainField = document.getElementsByTagName("main")[0];
const inputField = document.getElementById("hero");
const errorField = document.querySelector(".error");
let resultHeroComics;

// Showing Caracters 
const showCaracters = (data) => {
  const { heroData } = data;

  const htmlHero = ` <section class="character-hero">
    <h2>Character</h2>
    <div class="content content-hero">
        <div class="hero-top">
            <div class="header-hero">
                <img src=${heroData.thumbnail.path}.${heroData.thumbnail.extension} alt="">
            </div>
            <div class="description">
                <h5 class="title">${heroData.name}</h5>
                <p>${heroData.description}</p>
                <p><small class="text-muted">For more information visit marvel.com. © 2023 MARVEL</small></p>
            </div>
        </div>
    </div>
    </section>`;
  mainField.insertAdjacentHTML("beforeend", htmlHero);
};

// Showing Comics 
const showComics = (data) => {
  const { heroComics } = data;
  const htmlSectionComics = `
  <section class="comic-hero">
      <h2>Comics</h2>
      <div class="content content-comics">
        
      </div>
  </section>`;
  mainField.insertAdjacentHTML("beforeend", htmlSectionComics);
  resultHeroComics = document.querySelector(".content-comics");

  for (const comic of heroComics) {
    const htmlComics = `            
          <div class="card mb-3">
              <img class="card-img-top" src=${comic.thumbnail.path}.${comic.thumbnail.extension} alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">${comic.title}</h5>
                <p class="card-text">${comic.description}</p>
                <p><small class="text-muted">For more information visit marvel.com. © 2023 MARVEL</small></p>
              </div>
          </div>
    `;
    resultHeroComics.insertAdjacentHTML("beforeend", htmlComics);
  }
};
//submit form accion
form.addEventListener("submit", (e) => {
  mainField.innerHTML = "";
  e.preventDefault();

  getHeroData(inputField, errorField).then((data) => {
    showCaracters(data);
    showComics(data);
    mainField.scrollIntoView({ behavior: "smooth", block: "start" });
    mainField.style.paddingTop = "60px";
  });
  form.reset();
});
