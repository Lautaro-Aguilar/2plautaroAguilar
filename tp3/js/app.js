const DEFAULT_CORDS = [1,1]
var map = L.map('map', { center: DEFAULT_CORDS, zoom: 1});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([-99999, -99999]);

const botonConsultar = document.getElementById("consultar");
const inputId = document.getElementById("numero");
const mapa = document.getElementById('map')
let latitudvar = ''
let longitudvar = ''
botonConsultar.addEventListener("click", async () => {
  map.removeLayer(marker)
  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const codigo = document.getElementById("codigo");
  const contenedor = document.getElementById('test')
  const latitud = document.getElementById('latitud')
  const longitud = document.getElementById('longitud')
  const imagen = document.getElementById('imagen')
  const genero = document.getElementById('genero')
  
  const response = await fetch("https://randomuser.me/api/");
  const responseJson = await response.json();
  const resultado = responseJson.results[0];

  nombre.textContent = resultado.name.title + ' ' + resultado.name.first
  apellido.textContent = resultado.name.last

  codigo.textContent = resultado.id.name + ': ' + resultado.id.value

  latitud.textContent = resultado.location.coordinates.latitude
  longitud.textContent = resultado.location.coordinates.longitude

  latitudvar = resultado.location.coordinates.latitude
  longitudvar = resultado.location.coordinates.longitude
  imagen.src = resultado.picture.medium

  genero.textContent = resultado.gender
  if (genero.textContent === 'male') {
    contenedor.className = '';
    contenedor.classList.add('textoAmarillo')
  } else {
    contenedor.className = ''
    contenedor.classList.add('textoVerde')
  }
  var myIcon = L.icon({
    iconUrl: 'https://static.vecteezy.com/system/resources/previews/009/267/042/original/location-icon-design-free-png.png',
    iconSize: [25, 25],
    iconAnchor: [30, 70],
    popupAnchor: [-16, -75],
  })
  marker = L.marker([latitudvar, longitudvar], {icon: myIcon}).addTo(map);
  marker.bindPopup(`<b>Acá vive: ${resultado.name.title + ' ' + resultado.name.first}!</b>`).openPopup();
  map.panTo(new L.LatLng(latitudvar,longitudvar))
});