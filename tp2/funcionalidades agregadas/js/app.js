const especie = document.getElementById("especie");
const estado = document.getElementById("estado");
const nombre = document.getElementById("nombre");
const consultar = document.getElementById("consultar");
const imagen = document.getElementById("imagen");
const episodio = document.getElementById("episodios");
let numero = document.getElementById("numero");
let resultado = {};

async function logJSONData() {
  const response = await fetch(`https://rickandmortyapi.com/api/character`);
  const json = await response.json();
  resultado = json.results;
}
logJSONData();

async function obtenerEpisodios(id) {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const json = await response.json();
  const listaEpisodios = json.episode;
  const nombresEpisodios = []

  for (const episodioUrl of listaEpisodios) {
    const episodioResponse = await fetch(episodioUrl)
    const episodioJson = await episodioResponse.json()
    nombresEpisodios.push(episodioJson.name)
  }
  return nombresEpisodios
}


consultar.addEventListener("click", async () => {
  const idPersonaje = numero.value
  const nombresEpisodios = await obtenerEpisodios(idPersonaje)
  especie.textContent = resultado[numero.value].species;
  estado.textContent = resultado[numero.value].status;
  nombre.textContent = resultado[numero.value].name;
  episodio.innerHTML = "";

  for (const nombreEpisodio of nombresEpisodios) {
    const li = document.createElement("li")
    li.textContent = nombreEpisodio
    episodio.appendChild(li)
  }
  imagen.src = resultado[numero.value].image;
});
