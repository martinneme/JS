const agregar = document.querySelector("#submit");
const generar = document.querySelector("#generar");
const guardar = document.querySelector("#guardar");
const add = document.querySelector("#add");
const allGuest = document.querySelector("#allGuest");

const limiteInvitados = document.querySelector("#limiteInvitados");
const cantidadDeInvitados = document.querySelector("#cantidadDeInvitados");
const porcentajeOcupacion = document.querySelector("#porcentajeOcupacion");

let invitados = [];
let flagLimiteInvitados = 0;
let ultimoId = 0;
let select;

limiteInvitados.textContent = 0;
cantidadDeInvitados.textContent = 0;
porcentajeOcupacion.textContent = 0;

class Persona {
  constructor(id, nombre, edad, dieta, email) {
    this.id = id;
    this.nombre = nombre;
  }
}

// * FRAGMENTO EN CONSTRUCCION PARA IMPLEMENTAR GET EN LOCALSTORAGE A FUTURO *
// function GetInvitados() {
//   let lista = localStorage.getItem("listaInvitados");
//   return lista;
// }

function generarID(ultimoId) {
  let id = ultimoId + 1;
  return id;
}

agregar.addEventListener("click", () => {
  let nombre = document.querySelector("#invitado").value;

  ultimoId = generarID(ultimoId);

  if (nombre) {
    if (isNaN(nombre)) {
      if (flagLimiteInvitados == 0) {
        let cantidad = prompt("ingrese el limite total de invitados:");
        limiteInvitados.textContent = cantidad;
        flagLimiteInvitados = 1;
      }

      const cardName = document.createElement("DIV");
      const TagName = document.createElement("p");
      const buttonAdd = document.createElement("button");

      cardName.classList.add("Card-Body");
      cardName.classList.add("item");
      TagName.classList.add("Card-text");
      buttonAdd.classList.add("btn-primary");
      buttonAdd.classList.add("btn");
      buttonAdd.classList.add("add");

      TagName.textContent = nombre;
      buttonAdd.setAttribute("tag", ultimoId);
      buttonAdd.setAttribute("id", nombre);
      buttonAdd.setAttribute("onclick", "addName(this)");
      buttonAdd.textContent = ">";

      let codigoHTMl = cardName.appendChild(TagName);
      codigoHTMl.appendChild(buttonAdd);

      document.querySelector("#item").appendChild(codigoHTMl);
      document.querySelector("#invitado").value = "";

      const persona = new Persona(ultimoId, nombre, "", "", "");
      invitados.push(persona);
    }
  }

  cantidadDeInvitados.textContent = invitados.length;
  let AltInvit = invitados.length;
  let result = (AltInvit * 100) / parseInt(limiteInvitados.textContent);
  result = result.toFixed(2);
  if (result == 100.0) {
    document
      .querySelector("#limite")
      .setAttribute("style", "background-color:red;");
    document
      .querySelector("#cantidad")
      .setAttribute("style", "background-color:red;");
    const test = document
      .querySelector("#porcentaje")
      .setAttribute("style", "background-color:red;");
  }
  porcentajeOcupacion.textContent = result + "%";
  // * FRAGMENTO EN CONSTRUCCION PARA IMPLEMENTAR SET Y GET EN LOCALSTORAGE A FUTURO *
  // if (localStorage.length != 0) {
  //     let lista=[];
  //   lista = GetInvitados();
  //   lista.push(nombre);
  //   localStorage.setItem("listaInvitados", lista);

  // }
  // else {
  //   invitados.push(nombre);
  //  localStorage.setItem("listaInvitados",invitados);
  // }
});

generar.addEventListener("click", () => {
  let title = document.querySelector("#title").value;
  let details = document.querySelector("#details").value;
  let address = document.querySelector("#address").value;
  let date = document.querySelector("#date").value;

  titulo = document.querySelector("#titulo");
  detalles = document.querySelector("#detalle");
  fecha = document.querySelector("#fecha");
  direccion = document.querySelector("#direccion");

  titulo.textContent = title;
  detalles.textContent = details;
  fecha.textContent = date;
  direccion.textContent = address;
});

function addName(addbtn) {
  let name = addbtn.id;
  select = document.getElementById(name).getAttribute("tag");
  console.log(select);
  nombre = document.querySelector("#nombreInvitado");
  nombre.textContent = name;
}

async function allGuestsGenerate() {
  let nombre = document.querySelector("#nombreInvitado");
  for (let i = 0; i < invitados.length; i++) {
    await wait(2);
    nombre.textContent = invitados[i];
    console.log(invitados[i]);
  }
}

function wait(t) {
  return new Promise(function (resolve) {
    setTimeout(resolve, t * 1000);
  });
}

allGuest.addEventListener("click", allGuestsGenerate);

guardar.addEventListener("click", () => {
  select = parseInt(select);
  let edad = document.querySelector("#edad").value;
  let email = document.querySelector("#email").value;
  const position = invitados.find((el) => el.id == select);

  position.edad = edad;
  position.email = email;

  document.querySelector("#edad").value = "";
  document.querySelector("#email").value = "";
});
