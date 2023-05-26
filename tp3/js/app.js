const map = L.map("map", { zoom: 12 });
let latitudvar = "";
let longitudvar = "";
var marker = L.marker([latitudvar, longitudvar]);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 20,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const botonConsultar = document.getElementById("consultar");
const ocultos = document.querySelectorAll(".oculto");
const mensajeMatch = document.getElementById("match");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".btn-close");

ubicacion.addEventListener("click", () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

const obtenerDatos = async () => {
  const response = await fetch("https://randomuser.me/api/");
  const responseJson = await response.json();
  const resultado = responseJson.results[0];
  console.log(resultado);
  return resultado;
};

const actualizarTarjetaUsuario = (resultado) => {
  latitudvar = resultado.location.coordinates.latitude;
  longitudvar = resultado.location.coordinates.longitude;
  let colorPrimary = "";
  let backgroundColor = "";

  if (resultado.gender === "male") {
    colorPrimary = "#FFEA00";
    backgroundColor = "#ec7200";
  } else {
    colorPrimary = "#70E000";
    backgroundColor = "#004B23";
  }
  const genderIcon = document.querySelector(".genderIcon");
  console.log(genderIcon)
  const license = document.querySelector(".license");
  const telefono = document.getElementById("telefono");
  const phoneIcon = document.querySelector(".phoneIcon");
  const locationIcon = document.querySelector(".locationIcon");
  const contenedorImagenUsuario = document.querySelector(
    ".imagenWrapperUsuario"
  );
  const tarjetaUsuario = document.getElementById("tarjetaUser");
  const textoUsuario = document.querySelectorAll(".textoUsuario");
  const nombre = document.getElementById("nombre");
  const codigo = document.getElementById("codigo");
  const imagen = document.getElementById("imagenUsuario");
  const genero = document.getElementById("genero");
  const email = document.getElementById("email");
  email.textContent = resultado.email;
  nombre.textContent = `${resultado.name.first} ${resultado.name.last}`;
  telefono.textContent = resultado.phone;
  codigo.textContent =
    resultado.id.value === null
      ? "No tiene Documentos"
      : `${resultado.id.name}: ${resultado.id.value}`;
  imagen.src = resultado.picture.medium;
  genero.textContent = resultado.gender === "male" ? "Hombre" : "Mujer";
  const iconoGenero =
    genero.textContent === "Hombre" ? "genderIcon fas fa-mars" : "genderIcon fas fa-venus";

  textoUsuario.forEach((element) => {
    element.style.setProperty("--color-primary", colorPrimary);
  });
  contenedorImagenUsuario.style.setProperty("border-color", colorPrimary);
  tarjetaUsuario.style.setProperty("background-color", backgroundColor);
  genderIcon.className = iconoGenero;
  genderIcon.style.setProperty("color", colorPrimary);
  license.style.setProperty("color", colorPrimary);
  phoneIcon.style.setProperty("color", colorPrimary);
  locationIcon.style.setProperty("color", colorPrimary);

  var myIcon = L.icon({
    iconUrl:
      "https://static.vecteezy.com/system/resources/previews/009/267/042/original/location-icon-design-free-png.png",
    iconSize: [25, 25],
    iconAnchor: [30, 70],
    popupAnchor: [-16, -75],
  });
  map.removeLayer(marker);
  marker = L.marker([latitudvar, longitudvar], { icon: myIcon }).addTo(map);
  marker
    .bindPopup(
      `<b>Acá vive: ${resultado.name.title} ${resultado.name.first}!</b>`
    )
    .openPopup();
  map.panTo(new L.LatLng(latitudvar, longitudvar));
};

const actualizarTarjetaPersonaje = (resultadoRM) => {
  const tarjetaPersonaje = document.getElementById("tarjetaPersonaje");
  const textoPersonaje = document.querySelectorAll(".textoPersonaje");
  const contenedorImagenPersonaje = document.querySelector(
    ".imagenWrapperPersonaje"
  );

  const imagen = document.getElementById("imagenPersonaje");
  const nombre = document.getElementById("nombrePersonaje");
  const tipo = document.getElementById("tipoPersonaje");
  const genero = document.getElementById("generoPersonaje");
  const especie = document.getElementById("especie");
  const estado = document.getElementById("estado");
  const codigo = document.getElementById("codigoPersonaje");
  console.log(resultadoRM);

  let gender = "";
  let colorPrimary = "";
  let backgroundColor = "";
  if (resultadoRM.gender.toLowerCase() === "male") {
    gender = "Hombre";
    colorPrimary = "#FFEA00";
    backgroundColor = "#ec7200";
  } else if (resultadoRM.gender.toLowerCase() === "female") {
    gender = "Mujer";
    colorPrimary = "#70E000";
    backgroundColor = "#004B23";
  } else {
    gender = "No identificado";
    colorPrimary = "#FF0000";
    backgroundColor = "#000000";
  }
  contenedorImagenPersonaje.style.setProperty("border-color", colorPrimary);

  textoPersonaje.forEach((element) => {
    element.style.setProperty("--color-primary", colorPrimary);
  });
  tarjetaPersonaje.style.setProperty("background-color", backgroundColor);

  imagen.src = resultadoRM.image;
  nombre.textContent = resultadoRM.name;
  tipo.textContent = resultadoRM.type;
  genero.textContent = gender;
  especie.textContent = resultadoRM.species;
  estado.textContent = resultadoRM.status;
  codigo.textContent = resultadoRM.id;
};

const obtenerPersonajes = async (numeroAleatorio) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${numeroAleatorio}`
  );
  const responseJson = await response.json();
  const resultadoRM = responseJson;
  return resultadoRM;
};

botonConsultar.addEventListener("click", async () => {
  let numeroAleatorio = Math.floor(Math.random() * 826) + 1;
  const resultado = await obtenerDatos();
  const personajeRM = await obtenerPersonajes(numeroAleatorio);
  const usuarioGenero = resultado.gender.toLowerCase();
  const personajeGenero = personajeRM.gender.toLowerCase();
  mensajeMatch.textContent =
    usuarioGenero === personajeGenero ? "¡Es un match!" : "No es un match :(";

  ocultos.forEach((element) => {
    element.classList.remove("oculto");
  });

  actualizarTarjetaUsuario(resultado);
  actualizarTarjetaPersonaje(personajeRM);
});
