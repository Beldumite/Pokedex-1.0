import { fetchPokemon, fetchPokemonData } from "./fetchPokemon.js";
import { generatePokemonCards } from "./generatePokemon.js";
import {
  preloadPokemonName,
  searchandDisplay,
  pokemonIndex,
} from "./search.js";

document.addEventListener("DOMContentLoaded", () => {
  generatePokemonCards();
});

await preloadPokemonName();

document.querySelector("#searchButton").addEventListener("click", () => {
  const value = document.querySelector("#searchBar").value.trim();
  console.log(value);

  searchandDisplay(value);
});

document.querySelector("#searchBar").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const value = document.querySelector("#searchBar").value.trim();
    console.log(value);

    searchandDisplay(value);
  }
  return;
});
