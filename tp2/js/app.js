const especie = document.getElementById("especie");
const estado = document.getElementById("estado");
const nombre = document.getElementById("nombre");
const consultar = document.getElementById("consultar");
const imagen = document.getElementById("imagen");
const episodio = document.getElementById("episodios");
const cantEpisodios = document.getElementById("cantEpisodios");
let numero = document.getElementById("numero");
let resultado = {};

async function logJSONData() {
  const response = await fetch(`https://rickandmortyapi.com/api/character`);
  const json = await response.json();

  resultado = json.results;
}
logJSONData();

consultar.addEventListener("click", () => {
  if (resultado[numero.value].status === 'Alive') {
    estado.style.color = 'green';
  } else {
    estado.style.color = 'red';
  }
  let episodios = resultado[numero.value].episode;
  especie.textContent = resultado[numero.value].species === 'Human' ? 'Humano' : 'Alien';
  estado.textContent = resultado[numero.value].status === 'Alive' ? 'Vivo' : 'Muerto';
  nombre.textContent = resultado[numero.value].name;
  episodio.innerHTML = episodios
    .map((episodio) => episodio.slice(-1) + ", ")
    .join("");
  imagen.src = resultado[numero.value].image;
  cantEpisodios.textContent = resultado[numero.value].episode.length;

});
