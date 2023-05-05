const especie1 = document.getElementById("especie1");
const estado1 = document.getElementById("estado1");
const nombre1 = document.getElementById("nombre1");
const imagen1 = document.getElementById("imagen");
const episodio1 = document.getElementById("episodios1");
const cantEpisodios1 = document.getElementById("cantEpisodios1");
const consultar = document.getElementById("consultar");
const especie2 = document.getElementById("especie2");
const estado2 = document.getElementById("estado2");
const nombre2 = document.getElementById("nombre2");
const imagen2 = document.getElementById("imagenTwo");
const episodio2 = document.getElementById("episodios2");
const cantEpisodios2 = document.getElementById("cantEpisodios2");

const ganador = document.getElementById("ganador");

let numero1 = document.getElementById("numero1");
let numero2 = document.getElementById("numero2");
let resultado = {};

consultar.addEventListener('click', async () => {
  const prueba = await fetch(`https://rickandmortyapi.com/api/character/${[numero2.value]}, ${[numero1.value]} `)
  const pruebaJson = await prueba.json()
  console.log('pj1: ', pruebaJson[0].name, 'pj2: ', pruebaJson[1].name)

  especie1.textContent = pruebaJson[0].species === 'Human' ? 'Humano' : 'Alien';
  especie2.textContent = pruebaJson[1].species === 'Human' ? 'Humano' : 'Alien';

  nombre1.textContent = pruebaJson[0].name;
  nombre2.textContent = pruebaJson[1].name;

  estado1.textContent = pruebaJson[0].status === 'Alive' ? 'Vivo' : 'Muerto';
  estado2.textContent = pruebaJson[1].status === 'Alive' ? 'Vivo' : 'Muerto';

  cantEpisodios1.textContent = pruebaJson[0].episode.length;
  cantEpisodios2.textContent = pruebaJson[1].episode.length;


  imagen1.src = pruebaJson[0].image;
  imagen2.src = pruebaJson[1].image;
  ganador.textContent = pruebaJson[0].episode.length > pruebaJson[1].episode.length ? 'Ganador: ' + pruebaJson[0].name : pruebaJson[0].episode.length < pruebaJson[1].episode.length ? 'Ganador: ' + pruebaJson[1].name : pruebaJson[0].episode.length === pruebaJson[1].episode.length ? 'Empate' : '';

})
