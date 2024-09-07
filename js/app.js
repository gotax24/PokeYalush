const searchPokemon = async () => {
  const nombre = document.getElementById("pokemon").value.trim().toLowerCase();
  if (!nombre) {
    alert("Por favor ingrese un nombre de Pokémon.");
    return;
  }
  window.location.href = `detalle.html?pokemon=${nombre}`;
};

let currentPage = 0;
const resultsPerPage = 50; // Valor supuesto, ajustar según sea necesario.

const loadMore = (datos) => {
  const pokemonArray = datos.results; // No necesitas `.push()`

  const list = document.getElementById("list");
  const start = currentPage * resultsPerPage;
  const end = start + resultsPerPage;
  const pokemonsToShow = pokemonArray.slice(start, end); // Corrección del slice

  pokemonsToShow.forEach((pokemon) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = `detalle.html?pokemon=${pokemon.name}`;
    a.textContent = pokemon.name;

    li.appendChild(a);
    list.appendChild(li);
  });

  currentPage++;

  // Ocultar el botón si ya se mostraron todos los resultados
  if (end >= pokemonArray.length) {
    const loadMoreButton = document.getElementById("loadMore");
    loadMoreButton.disabled = true;
    loadMoreButton.textContent = "No hay más Pokémon";
  }
};

const fetchPokemonList = async (limit = 100, offset = 0) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener la lista de Pokémon:", error);
  }
};

const pokemonList = async () => {
  const datos = await fetchPokemonList(10000);
  if (datos) {
    loadMore(datos);
    document
      .getElementById("loadMore")
      .addEventListener("click", () => loadMore(datos));
  }
};

document.addEventListener("DOMContentLoaded", pokemonList);
