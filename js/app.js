//funcion para buscar el pokemon
const searchPokemon = async () => {
  //Obtener el nombre del pokemon 
  const name = document.getElementById("pokemon").value.trim().toLowerCase(); 
  if (!name) {
    alert("Please enter a Pokémon name.");
    return;
  }
  //Pasarle la variable al otro js
  window.location.href = `details.html?pokemon=${name}`;
};

let currentPage = 0;
const resultsPerPage = 50;

//Funcion para mostrar pokemones
const loadMore = (data) => {
  const pokemonArray = data.results;

  const list = document.getElementById("list");
  const start = currentPage * resultsPerPage;
  const end = start + resultsPerPage;
  const pokemonsToShow = pokemonArray.slice(start, end); 

  pokemonsToShow.forEach((pokemon) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = `details.html?pokemon=${pokemon.name}`;
    a.textContent = pokemon.name;

    li.appendChild(a);
    list.appendChild(li);
  });

  currentPage++;

  // Ocultar el botón si ya se mostraron todos los resultados
  if (end >= pokemonArray.length) {
    const loadMoreButton = document.getElementById("loadMore");
    loadMoreButton.disabled = true;
    loadMoreButton.textContent = "There are no more Pokémon";
  }
};

//Obtencion de la info de la api
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
    console.error("Error getting list of Pokémon:", error);
  }
};

//Ejecucion de las funciones
const pokemonList = async () => {
  const data = await fetchPokemonList(10000);
  if (data) {
    loadMore(data);
    document
      .getElementById("loadMore")
      .addEventListener("click", () => loadMore(data));
  }
};

document.addEventListener("DOMContentLoaded", pokemonList);
