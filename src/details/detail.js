import { generatePokemonData } from "./generatePokemonData.js";

const container = document.querySelector("#container");

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const pokemonName = params.get("name");
  console.log(pokemonName);
  if (!pokemonName) {
    container.innerHTML = `<p>Sorry Pokemon Not found</p>`;
  }
  generatePokemonData(pokemonName);
});
