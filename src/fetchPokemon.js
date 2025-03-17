export async function fetchPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!response.ok) {
    throw new Error(
      "Failed to fetch data from" + `https://pokeapi.co/api/v2/pokemon/${id}`
    );
  }
  const data = await response.json();
  return data;
}

export async function fetchPokemonData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data from" + url);
  }
  const data = await response.json();
  return data;
}

export async function fetchPokemonTypes(url) {
  const response = await fetch;
}
