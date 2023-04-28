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
  console.log(resultado);
}
logJSONData();

consultar.addEventListener("click", () => {
  let episodios = resultado[numero.value].episode;
  especie.textContent = resultado[numero.value].species;
  estado.textContent = resultado[numero.value].status;
  nombre.textContent = resultado[numero.value].name;
  episodio.innerHTML = episodios
    .map((episodio) => episodio.slice(-1) + ", ")
    .join("");
  imagen.src = resultado[numero.value].image;
});
