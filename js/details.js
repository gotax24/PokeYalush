const typeEmojis = {
  steel: "⚙️",
  water: "🌊",
  bug: "🪲",
  dragon: "🐉",
  electric: "⚡",
  ghost: "👻",
  fire: "🔥",
  fairy: "🧚",
  ice: "❄️",
  fighting: "🥊",
  normal: "⚪️",
  grass: "🌱",
  psychic: "🔮",
  rock: "🪨",
  dark: "💣",
  ground: "⛰",
  poison: "☠️",
  flying: "🪽",
};

//Mostrar el nombre el tipo y la base experience
const nameType = (data) => {
  const ul = document.getElementById("type");
  ul.innerHTML = ""; // Limpiamos cualquier dato previo.

  const h1 = document.getElementById("name");
  h1.textContent = data.name.toUpperCase();

  data.types.forEach((tipo) => {
    const li = document.createElement("li");
    li.textContent = `${typeEmojis[tipo.type.name] || ""} ${tipo.type.name}`;
    ul.appendChild(li);
  });

  const p = document.getElementById("base");
  p.innerHTML = `Base experience = ${data.base_experience} XP`;
};

const divImage = document.getElementById("image");

//Funcion para traer la imagen
const createPokemonImage = (data, gender) => {
  const container = document.createElement("div");
  container.className = "container";
  container.id = `div${gender}`;
  container.classList.add(gender === "Male" ? "borderMale" : "borderFemale");

  const card = document.createElement("div");
  card.className = "card";

  const imgFront = document.createElement("img");
  const imgBack = document.createElement("img");

  imgFront.src =
    gender === "Male"
      ? data.sprites.front_default
      : data.sprites.front_female;
  imgBack.src =
    gender === "Male" ? data.sprites.back_default : data.sprites.back_female;

  imgFront.className = "front";
  imgFront.id = `imgFront${gender}`;

  imgBack.className = "back";
  imgBack.id = `imgBack${gender}`;

  card.appendChild(imgFront);
  card.appendChild(imgBack);

  container.appendChild(card);
  divImage.appendChild(container);
};

const gender = () => {
  const radiusMale = document.getElementById("male");
  const radiusFemale = document.getElementById("female");
  const radiusNoneGender = document.getElementById("noneGender");

  const imgFrontMale = document.getElementById("imgFrontMale");
  const imgBackMale = document.getElementById("imgBackMale");

  const imgFrontFemale = document.getElementById("imgFrontFemale");
  const imgBackFemale = document.getElementById("imgBackFemale");

  const divMale = document.getElementById("divMale");
  const divFemale = document.getElementById("divFemale");

  if (radiusMale && radiusMale.checked) {
    if (imgFrontFemale && imgBackFemale) {
      imgFrontFemale.classList.add("none");
      imgBackFemale.classList.add("none");
    }

    imgFrontMale.classList.remove("none");
    imgBackMale.classList.remove("none");

    divFemale?.classList.remove("borderFemale");
    divMale?.classList.add("borderMale");
  }

  if (radiusFemale && radiusFemale.checked) {
    imgFrontMale.classList.add("none");
    imgBackMale.classList.add("none");

    if (imgFrontFemale && imgBackFemale) {
      imgFrontFemale.classList.remove("none");
      imgBackFemale.classList.remove("none");
    }

    divMale?.classList.remove("borderMale");
    divFemale?.classList.add("borderFemale");
  }
  if (radiusNoneGender && radiusNoneGender.checked) {
    // Verificamos si existen las imágenes de ambos géneros
    if (imgFrontMale && imgBackMale) {
      imgFrontMale.classList.remove("none");
      imgBackMale.classList.remove("none");
    }
    if (imgFrontFemale && imgBackFemale) {
      imgFrontFemale.classList.remove("none");
      imgBackFemale.classList.remove("none");
    }

    // Añadimos las clases de borde a ambos contenedores si existen
    divMale?.classList.add("borderMale");
    divFemale?.classList.add("borderFemale");
  }
};

//Mostramos las habilidades
const abilities = (data) => {
  const ul = document.getElementById("skills");
  ul.innerHTML = ""; // Limpiar el contenido anterior

  data.abilities.forEach((abilityObject) => {
    const li = document.createElement("li");
    li.innerText = abilityObject.ability.name;
    ul.appendChild(li);
  });
};

//Mostrar la altura peso y national number
const heigth_weigth = (data) => {
  const div = document.getElementById("divHeight");
  div.innerHTML = `
    <p>Height = ${data.height / 10} M</p>
    <p>Weight = ${data.weight / 10} Kg</p>
    <p>National number = ${data.order}</p>`;
};

//Mostrando las estadisticas
const stats = (data) => {
  const ul = document.getElementById("statistics");
  ul.innerHTML = ""; // Limpiar el contenido anterior

  data.stats.forEach((stat) => {
    const li = document.createElement("li");
    li.innerText = `${stat.stat.name} = ${stat.base_stat}`;
    ul.appendChild(li);
  });
};

//Ejecutando las funciones
const pokemonDetails = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const pokemonName = urlParams.get("pokemon");

  if (pokemonName) {
    try {
      const respuesta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      if (respuesta.ok) {
        const pokemon = await respuesta.json();

        nameType(pokemon);
        createPokemonImage(pokemon, "Male");

        if (pokemon.sprites.front_female && pokemon.sprites.back_female) {
          createPokemonImage(pokemon, "Female");
        } else {
          document.getElementById("gender").classList.add("none");
        }

        heigth_weigth(pokemon);
        stats(pokemon);
        abilities(pokemon);
      } else {
        alert(`Error: Pokémon ${pokemonName} not found.`);
      }
    } catch (error) {
      console.error("Error getting Pokémon details:", error);
      alert("There was a problem loading the Pokémon details.");
    }
  } else {
    alert("Pokemon name not provided.");
  }
};

document.addEventListener("DOMContentLoaded", pokemonDetails);
document.getElementById("male").addEventListener("change", gender);
document.getElementById("female").addEventListener("change", gender);
document.getElementById("noneGender").addEventListener("change", gender);
