console.log("Hola mundo!as");

// const checkboxes = document.querySelectorAll('.checkboxes');
const checkboxes = document.querySelectorAll(".checkboxes");
let radioSeleccionado = "";
let checkboxSeleccionado = "";
function enviar() {
  // const color = document.getElementsByName("colores");
  const color = document.querySelector('input[name="colores"]:checked');

  // for (let i = 0; i < color.length; i++) {
  //   if (color[i].checked) {
  //     radioSeleccionado = color[i].value;
  //   }
  // }
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkboxSeleccionado = checkboxes[i].value;
    }
  }
  alert('Color de radio seleccionado: ' + color.value + '\nCheckbox seleccionado: ' + checkboxSeleccionado);
}
