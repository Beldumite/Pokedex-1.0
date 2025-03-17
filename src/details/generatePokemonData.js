import { fetchPokemon, fetchPokemonData } from "../fetchPokemon.js";
import { typeColors } from "../typeColors.js";

export async function generatePokemonData(name) {
  const container = document.querySelector("#container");
  const pokemon = await fetchPokemon(name);
  const species = await fetchPokemonData(pokemon.species.url);
  const evoData = await fetchPokemonData(species.evolution_chain.url);
  const chain = evoData.chain;
  const evoArr = recurEvoChain(chain);
  const evoSprite = await fetchEvoSprite(evoArr);
  console.log(evoSprite);
  const enGenus = species.genera.find(
    (genus) => genus.language.name == "en"
  )?.genus;
  let gender;

  if (!species.has_gender_differences) {
    gender = "Unknown";
  } else {
    gender = "M / F";
  }

  if (!pokemon) {
    container.innerHTML = `<p>Sorry Pokemon Not found</p>`;
  }
  console.log(pokemon.types[0].type.name);
  console.log(species.flavor_text_entries[0].flavor_text);

  container.innerHTML = `
        <section id="header">
        <div class="text-center mt-1 mb-1 ${
          typeColors[pokemon.types[0].type.name]
        } " id="Name">
          <h1 class="text-4xl font-bold">${
            pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
          } <span>#${pokemon.id}</span></h1>
          <h2 class="text-2xl font-semibold m-1.5">The ${enGenus}</h2>
        </div>
        <div id="img">
          <img class="mx-auto" src="${
            pokemon.sprites.other["official-artwork"].front_default
          }" alt="image of ${pokemon.name}">
        </div>
      </section>
      <div class="bg-white p-10 mt-7 rounded-4xl">
      <div class="grid grid-cols-1 sm:grid-cols-2 sm:w-11/12 w-full mx-auto gap-2">
        <section id="entries" class="${
          typeColors[pokemon.types[0].type.name]
        } align-middle rounded-2xl text-left w-11/12 p-3 [&>*]:self-center" >
          <h2 class="text-2xl font-bold">Pokedex Entries</h2>
          <p>
            ${species.flavor_text_entries[0].flavor_text.replace(/\f/g, " ")}
          </p>
        </section>
        <section id="Info" class="grid grid-cols-2 gap-2 sm:gap-0 p-4 auto-rows-[minmax(100px,_1fr)] ${
          typeColors[pokemon.types[0].type.name]
        } w-11/12 rounded-2xl [&>*]:self-center">
          <div>
            <h3 class="text-2xl font-semibold">Weight</h3>
            <p>${pokemon.weight}</p>
          </div>
          <div>
            <h3 class="text-2xl font-semibold">Height</h3>
            <p>${pokemon.height}</p>
          </div>
          <div>
            <h3 class="text-2xl font-semibold">Gender</h3>
            <p>${gender}</p>
          </div>
          <div>
            <h3 class="text-2xl font-semibold">Abilities</h3>
            <p>${pokemon.abilities.find((a) => !a.is_hidden)?.ability.name}</p>
            <p>${
              pokemon.abilities.find((a) => a.is_hidden)?.ability.name
            } (Hidden ability)</p>
          </div>
        </section>
        <section id="type_cries">
          <h3>Types</h3>
          <ul class="flex m-2 gap-2.5">${pokemon.types
            .map(
              (t) =>
                `<li class="w-24 text-center text-white px-2 py-1 rounded-4xl text-sm ${
                  typeColors[t.type.name]
                }"> ${
                  t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
                }</li>`
            )
            .join("")}
          </ul>
          <h3>Weakness</h3>
          <ul class="flex m-2 gap-2.5">${pokemon.types
            .map(
              (t) =>
                `<li class="w-24 text-center text-white px-2 py-1 rounded-4xl text-sm ${
                  typeColors[t.type.name]
                }"> ${
                  t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
                }</li>`
            )
            .join("")}
          </ul>
          <h3>Cries</h3>
          <audio controls src="${pokemon.cries.latest}"></audio>
      </div>
      </section>
        <section id="Evo" class="${
          typeColors[pokemon.types[0].type.name]
        } p-4 rounded-2xl shadow-md mt-10">
          <h2 class="text-center text-white  font-semibold text-2xl mb-2">Evolution Line</h2>
          <ul class="flex flex-col sm:flex-row gap-4 justify-evenly">${evoArr
            .map(
              (name, index) =>
                `<li class="border rounded-4xl object-contain text-center bg-gray-200 text-gray-800 flex flex-col items-center "><a href="${
                  "detail.html?name=" + name
                }" class=""><img src="${
                  evoSprite[index]
                }" alt="${name}" class="w-60">${
                  name.charAt(0).toUpperCase() + name.slice(1)
                }</a></li>`
            )
            .join("")}
            </ul>
      </section> </div>`;
}

function recurEvoChain(chain, evoArray = []) {
  evoArray.push(chain.species.name);
  if (chain.evolves_to.length > 0) {
    chain.evolves_to.forEach((evo) => recurEvoChain(evo, evoArray));
  }
  return evoArray;
}

async function fetchEvoSprite(imgArr) {
  const evoSprite = await Promise.all(
    imgArr.map(async (name) => {
      const pokeEvo = await fetchPokemon(name);
      return pokeEvo.sprites.other["official-artwork"].front_default;
    })
  );
  return evoSprite;
}
