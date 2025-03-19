import { fetchPokemonData, fetchPokemon } from "./fetchPokemon.js";
import { generatePokemonCards } from "./generatePokemon.js";
import { typeColors } from "./typeColors.js";

export let pokemonIndex = [];

export async function preloadPokemonName() {
  const data = await fetchPokemonData(
    "https://pokeapi.co/api/v2/pokemon?limit=" + 1025
  );
  return (pokemonIndex = data.results.map((value, index) => {
    return { name: value.name, id: index + 1 };
  }));
}

export async function searchandDisplay(value) {
  const pagingButton = document.querySelector("#LoadButton");
  const section = document.querySelector("#card");

  if (!value) {
    section.innerHTML = "";
    generatePokemonCards();
    pagingButton.classList.add("block");
    return;
  }
  pagingButton.classList.add("hidden");
  console.log(pagingButton);

  console.log(pokemonIndex.name);
  const filteredData = pokemonIndex.filter(
    (p) => p.name.includes(value.toLowerCase()) || p.id.toString() === value
  );
  if (filteredData.length === 0) {
    document.querySelector("#card").innerHTML = "Pokemon Cannot Be Found";
  }
  let promise = filteredData.map((d) => fetchPokemon(d.id));
  const results = await Promise.all(promise);
  generatePokemonResult(results);
}

export function generatePokemonResult(results) {
  const section = document.querySelector("#card");
  section.innerHTML = "";

  results.map((pokemon) => {
    const card = document.createElement("a");
    card.href = "details/detail.html?name=" + pokemon.name;
    card.classList.add(
      "bg-slate-100",
      "shadow-lg",
      "items-center",
      "border",
      "rounded-3xl",
      "hover:scale-105"
    );
    card.innerHTML = `<img src="${
      pokemon.sprites.other["official-artwork"].front_default
    }" alt="" class="border-b p-3" />
        <div class="pt-3 px-4 pb-1">
          <h2 class="text-xl font-bold">${
            pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
          }</h2>
          <p>#${pokemon.id}</p>
            <div class="types m-2 flex gap-2 justify-center">${pokemon.types
              .map(
                (t) =>
                  `<span class="px-2 py-1 w-24 text-center text-white rounded-4xl text-sm ${
                    typeColors[t.type.name]
                  }">${
                    t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
                  }</span>`
              )
              .join("")}
            </div>
        </div>`;
    section.appendChild(card);
  });
}
