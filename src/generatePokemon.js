import { fetchPokemon } from "./fetchPokemon.js";
import { typeColors } from "./typeColors.js";
import { generatePagingButton } from "./paging.js";

export async function generatePokemonCards(page = 1, itemsperpage = 20) {
  const section = document.querySelector("#card");
  if (!section) {
    console.error("div not found");
    return;
  }

  const startIndex = (page - 1) * itemsperpage + 1;
  const endIndex = startIndex + itemsperpage - 1;

  for (let dexNum = startIndex; dexNum <= endIndex; dexNum++) {
    const pokemon = await fetchPokemon(dexNum);
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
  }

  generatePagingButton(page);
}
