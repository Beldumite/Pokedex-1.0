import { generatePokemonCards } from "./generatePokemon.js";

export function generatePagingButton(currentPage) {
  const pagination = document.querySelector("#pagination");
  if (!pagination) {
    console.error("Div not found");
    return;
  }

  pagination.innerHTML = "";

  const button = document.createElement("button");
  button.id = "LoadButton";
  button.classList.add(
    "block",
    "mt-5",
    "mb-5",
    "mx-auto",
    "p-1.5",
    "bg-amber-300",
    "rounded-3xl",
    "border",
    "border-black",
    "text-gray-900",
    "cursor-pointer"
  );
  button.addEventListener("click", () => generatePokemonCards(currentPage + 1));
  button.textContent = `Load More`;

  pagination.appendChild(button);
}
