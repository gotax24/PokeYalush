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

const nameType = (datos) => {
  const ul = document.getElementById("tipo");
  ul.innerHTML = ""; // Limpiamos cualquier dato previo.

  const h1 = document.getElementById("nombre");
  h1.textContent = datos.name.toUpperCase();

  datos.types.forEach((tipo) => {
    const li = document.createElement("li");
    li.textContent = `${typeEmojis[tipo.type.name] || ""} ${tipo.type.name}`;
    ul.appendChild(li);
  });

  const p = document.getElementById("base");
  p.innerHTML = `Base experience = ${datos.base_experience} XP`;
};

const divImage = document.getElementById("image");

const createPokemonImage = (datos, gender) => {
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
      ? datos.sprites.front_default
      : datos.sprites.front_female;
  imgBack.src =
    gender === "Male" ? datos.sprites.back_default : datos.sprites.back_female;

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

const abilities = (datos) => {
  const ul = document.getElementById("habilidades");
  ul.innerHTML = ""; // Limpiar el contenido anterior

  datos.abilities.forEach((abilityObject) => {
    const li = document.createElement("li");
    li.innerText = abilityObject.ability.name;
    ul.appendChild(li);
  });
};

const heigth_weigth = (datos) => {
  const div = document.getElementById("divAltura");
  div.innerHTML = `
    <p>Height = ${datos.height / 10} M</p>
    <p>Weight = ${datos.weight / 10} Kg</p>
    <p>National number = ${datos.order}</p>`;
};

const stats = (datos) => {
  const ul = document.getElementById("estadistica");
  ul.innerHTML = ""; // Limpiar el contenido anterior

  datos.stats.forEach((stat) => {
    const li = document.createElement("li");
    li.innerText = `${stat.stat.name} = ${stat.base_stat}`;
    ul.appendChild(li);
  });
};

const pokemonDetails = async () => {
  const urlParams = new URLSearchParams(window.location.search); // Corrección de typo
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
        alert(`Error: Pokémon ${pokemonName} no encontrado.`);
      }
    } catch (error) {
      console.error("Error al obtener los detalles del Pokémon:", error);
      alert("Hubo un problema al cargar los detalles del Pokémon.");
    }
  } else {
    alert("Nombre de Pokémon no proporcionado.");
  }
};

document.addEventListener("DOMContentLoaded", pokemonDetails);
document.getElementById("male").addEventListener("change", gender);
document.getElementById("female").addEventListener("change", gender);
document.getElementById("noneGender").addEventListener("change", gender);
