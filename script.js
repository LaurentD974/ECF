const url = "http://localhost:3000/pokemon";
const main = document.querySelector("main");
const btnAz = document.querySelector("#nameAz");
const btnZa = document.querySelector("#nameZa");
const btnHeightAsc = document.querySelector("#heightPlus");
const btnHeightDesc = document.querySelector("#heightMoins");
const inputPokeRange = document.querySelector("#inputPokeRange");
const displayPokeRange = document.querySelector("#displayPokeRange");
const inputPokeName = document.querySelector("#inputPokeName");
var poke = [];
var sortMethod = "";
var numberOfPoke = 3;
var filter = "";

const fetchPoke = async () => {
  const request = await fetch(url);
  poke = await request.json();
  updateMain();
};
const updateMain = () => {
  main.innerHTML = "";
  poke
    .filter((poke) => {
      if (filter != "")
        return poke.name.toLowerCase().includes(filter.toLowerCase());
      return poke;
    })
    .slice(0, numberOfPoke)
    .sort((a, b) => {
      if (sortMethod == "az") return a.name.localeCompare(b.name);
      else if (sortMethod == "za") return b.name.localeCompare(a.name);
      else if (sortMethod == "heightAsc") return a.height - b.height;
      else if (sortMethod == "heightDesc") return b.height - a.height;
    })

    .map((poke) => {
      main.innerHTML += ` <div class="pokeCard">
      <h3>${poke.name}</h3>
                <img
                  src="${poke.image}"
                  alt="image du film ${poke.name}"
                />
                 <p>Type :  ${poke.type}
                </p>
                
                <p>Height : ${poke.height}</p>
               
              </div>`;
    });
};
fetchPoke();

btnAz.addEventListener("click", () => {
  sortMethod = "az";
  updateMain();
});
btnZa.addEventListener("click", () => {
  sortMethod = "za";
  updateMain();
});
btnHeightAsc.addEventListener("click", () => {
  sortMethod = "heightAsc";
  updateMain();
});
btnHeightDesc.addEventListener("click", () => {
  sortMethod = "heightDesc";
  updateMain();
});
inputPokeRange.addEventListener("input", (e) => {
  displayPokeRange.innerHTML = e.target.value;
  numberOfPoke = e.target.value;
  updateMain();
});
inputPokeName.addEventListener("input", (e) => {
  filter = e.target.value;
  updateMain();
});
