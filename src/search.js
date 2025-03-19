import { fetchPokemonData } from "./fetchPokemon.js";

let pokemonIndex = [];

export async function preloadPokemonName(totalPoke) {
  const data = await fetchPokemonData(
    "https://pokeapi.co/api/v2/pokemon?limit=" + totalPoke
  );
  console.log(data);
  pokemonIndex = data.results.map((value, index) => {
    return { name: value.name, id: index + 1 };
  });
  console.log(pokemonIndex);
}
