import { fetchPokemon, fetchPokemonData } from "./fetchPokemon.js";
import { generatePokemonCards } from "./generatePokemon.js";
import { preloadPokemonName } from "./search.js";

document.addEventListener("DOMContentLoaded", () => {
  generatePokemonCards();
});

const totalData = await fetchPokemonData(
  "https://pokeapi.co/api/v2/pokemon?limit=1"
);
const pokeTotal = totalData.count;
preloadPokemonName(pokeTotal);
