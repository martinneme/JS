// document.addEventListener("DOMContentLoader",()=>{
//PENDIENTE REVISAR SCOPE DE VARIABLES PORQUE AL INTEGRARLO ROMPE ALGUNAS FUNCIONES.
// });

class Evento {
  constructor(name, description, address, date, time, invitadosLimite) {
    this.name = name;
    this.description = description;
    this.address = address;
    this.date = date;
    this.time = time;
    this.limiteInvitados = invitadosLimite;
  }
}

class Persona {
  constructor(id, nombre, edad, dieta, email) {
    this.id = id;
    this.nombre = nombre;
  }
}

const agregar = document.querySelector("#submit");
const generar = document.querySelector("#generar");
const guardar = document.querySelector("#guardar");
const add = document.querySelector("#add");
const allGuest = document.querySelector("#allGuest");

const limiteInvitados = document.querySelector("#limiteInvitados");
const cantidadDeInvitados = document.querySelector("#cantidadDeInvitados");
const porcentajeOcupacion = document.querySelector("#porcentajeOcupacion");

const reportlist = document.querySelector("#reportlist");

let invitados = [];
let flagLimiteInvitados = 0;
let flagGenerate = 0;
let ultimoId = 0;
let select;

limiteInvitados.textContent = 0;
cantidadDeInvitados.textContent = 0;
porcentajeOcupacion.textContent = 0;

function generarID(ultimoId) {
  let id = ultimoId + 1;
  return id;
}

agregar.addEventListener("click", () => {
  let nombre = document.querySelector("#invitado").value;

  ultimoId = generarID(ultimoId);

  if (nombre) {
    if (isNaN(nombre)) {
      if (flagGenerate == "0") {
        alert("Debes generar el evento primero");
      } else {
        const cardName = document.createElement("div");
        const tagName = document.createElement("p");
        const buttonAdd = document.createElement("button");
        const buttonDel = document.createElement("button");

        cardName.classList.add("Card-Body");
        cardName.classList.add("item");
        tagName.classList.add("Card-text");
        buttonAdd.classList.add("btn-primary");
        buttonAdd.classList.add("btn");
        buttonAdd.classList.add("add");
        buttonDel.classList.add("btn-primary");
        buttonDel.classList.add("btn");
        buttonDel.classList.add("add");

        tagName.textContent = nombre;
        tagName.setAttribute("id", ultimoId);
        buttonAdd.setAttribute("tag", ultimoId);
        buttonAdd.setAttribute("id", nombre);
        buttonAdd.setAttribute("onclick", "addName(this)");
        buttonAdd.textContent = ">";

        buttonDel.setAttribute("tag", ultimoId);
        buttonDel.setAttribute("id", nombre);
        buttonDel.setAttribute("onclick", "delName(this)");
        buttonDel.textContent = "Quitar";

        let codigoHTMl = cardName.appendChild(tagName);
        codigoHTMl.appendChild(buttonAdd);
        codigoHTMl.appendChild(buttonDel);

        document.querySelector("#item").appendChild(codigoHTMl);
        document.querySelector("#invitado").value = "";

        const persona = new Persona(ultimoId, nombre, "", "", "");
        invitados.push(persona);
      }
    }
  }

  cantidadDeInvitados.textContent = invitados.length;
  let altInvit = invitados.length;
  let result = (altInvit * 100) / parseInt(limiteInvitados.textContent);
  result = result.toFixed(2);
  if (result == 100.0) {
    document
      .querySelector("#limite")
      .setAttribute("style", "border-bottom:3px solid #f00;");
    document
      .querySelector("#cantidad")
      .setAttribute("style", "border-bottom:3px solid #f00;");
    const test = document
      .querySelector("#porcentaje")
      .setAttribute("style", "border-bottom:3px solid #f00;");
  }
  porcentajeOcupacion.textContent = result + "%";
});

generar.addEventListener("click", () => {
  let title = document.querySelector("#title").value;
  let details = document.querySelector("#details").value;
  let address = document.querySelector("#address").value;
  let date = document.querySelector("#date").value;
  let time = document.querySelector("#time").value;
  let invitadosLimite = document.querySelector("#limit").value;

  if (title && details && address && date && time && invitadosLimite) {
    flagGenerate = 1;
    const evento = new Evento(
      title,
      details,
      address,
      date,
      time,
      invitadosLimite
    );
    localStorage.setItem("Evento", JSON.stringify(evento));
    const limit = document.querySelector("#limiteInvitados");
    limit.textContent = invitadosLimite;
    location.hash = "#item";

    disabledEventInput(true);
  } else {
    alert("Debe completar todos los campos");
  }
});

function addName(addbtn) {
  let name = addbtn.id;
  select = document.getElementById(name).getAttribute("tag");
  nombre = document.querySelector("#nombreInvitado");
  nombre.textContent = name;
}

function wait(t) {
  return new Promise(function (resolve) {
    setTimeout(resolve, t * 1000);
  });
}

function delName(delbtn) {
  let name = delbtn.id;
  const ele = document.getElementById(name).getAttribute("tag");
  const item = document.getElementById(ele);
  item.remove();

  for (i = 0; i < invitados.length; i++) {
    if (invitados[i].id == ele) {
      invitados.splice(i, 1);
    }
  }
}

function allGuestsGenerate() {
  let cantidadCarne = 0;
  let cantidadViggie = 0;
  let cantidadCeliaco = 0;
  let adult = 0;
  let children = 0;

  for (let i = 0; i < invitados.length; i++) {
    if (invitados[i].dieta == "Carne") {
      cantidadCarne++;
    } else if (invitados[i].dieta == "Viggie") {
      cantidadViggie++;
    } else if (invitados[i].dieta == "Celiaco") {
      cantidadCeliaco++;
    }

    if (invitados[i].edad >= 18) {
      adult++;
    } else {
      children++;
    }
  }

  document.querySelector("#cantCarne").textContent =
    "Han preferido dieta de Carnes: " + cantidadCarne;
  document.querySelector("#cantViggie").textContent =
    "Han preferido dieta Viggie: " + cantidadViggie;
  document.querySelector("#cantCeliaco").textContent =
    "Han preferido dieta de Celiaca: " + cantidadCeliaco;
  document.querySelector("#adulto").textContent =
    "Hay " + adult + " personas adultas";
  document.querySelector("#menor").textContent =
    "Hay " + children + " personas menores de edad";
}

allGuest.addEventListener("click", allGuestsGenerate);

guardar.addEventListener("click", () => {
  let dietaOpt;
  select = parseInt(select);
  let edad = document.querySelector("#edad").value;
  let email = document.querySelector("#email").value;
  let dieta = document.getElementsByName("dieta");

  const position = invitados.find((el) => el.id == select);
  for (i = 0; i < dieta.length; i++) {
    if (dieta[i].checked == true) {
      dietaOpt = dieta[i].id;
    }
  }
  position.edad = edad;
  position.email = email;
  position.dieta = dietaOpt;
  document.querySelector("#edad").value = "";
  document.querySelector("#email").value = "";

  if (position.edad && position.dieta && position.email) {
    document
      .querySelector("#confirmSave")
      .setAttribute("style", "display:block");
      setTimeout(function(){
        document
        .querySelector("#confirmSave")
        .setAttribute("style", "display:none");
    },4000);
  
  }
});

window.addEventListener("load", () => {
  if (localStorage.getItem("Evento")) {
    let myModal = new bootstrap.Modal(
      document.getElementById("staticBackdrop"),
      {
        keyboard: true,
      }
    );
    let mod = document.querySelector("#staticBackdrop");

    let event = JSON.parse(localStorage.getItem("Evento"));

    let previewEvent = `<p><b>Evento:</b> ${event.name}<br>
    <b>Descricion:</b> ${event.description}<br>
    <b>Direccion:</b> ${event.address}<br>
    <b>Fecha :</b>${event.date}</p>
                        `;
    const modalBody = document.querySelector("#eventSave");
    modalBody.innerHTML = previewEvent;
    myModal.show(mod);
  }
});

let clear = document.querySelector("#delEvent");
let editEvent = document.querySelector("#continueEvent");

//*PARTE DEL MODAL QUE RETOMA DATOS EN LOCALSTORAGE
//* clear remueve el evento anterior.
clear.addEventListener("click", () => {
  localStorage.removeItem("Evento");
});

//*PARTE DEL MODAL QUE RETOMA DATOS EN LOCALSTORAGE
//* cambia la marca que permite iniciar la carga de invitados y mantiene el evento en localstorage
editEvent.addEventListener("click", () => {
  flagGenerate = 1;
  let mod = document.getElementById("close");
  mod.click();

  let event = JSON.parse(localStorage.getItem("Evento"));

  document.querySelector("#title").value = event.name;
  document.querySelector("#details").value = event.description;
  document.querySelector("#address").value = event.address;
  // PENDIENTE AGREGAR ESTOS VALORES POR FORMATO
  // let date = document.querySelector("#date").setDate()= date;
  // // let time = document.querySelector("#time").value="15:30";
  // let invitadosLimite = document.querySelector("#limit").value="11"
  disabledEventInput(true);
});

//* FRAGMENTO EN CONSTRUCCION PARA IMPLEMENTAR GET EN LOCALSTORAGE A FUTURO *
// function GetInvitados() {
//   let lista = localStorage.getItem("listaInvitados");
//   return lista;
// }

// function SaveInvitados(persona) {
//   let lista = GetInvitados();
//   for (i = 0; i < lista.length; i++) {}
// }



// FUNCION QUE SWITCHEA LOS INPUT GENERACION DE EVENTO
function disabledEventInput(value) {
  document.getElementById("title").disabled = value;
  document.getElementById("details").disabled = value;
  document.getElementById("address").disabled = value;
  document.getElementById("title").disabled = value;
  document.getElementById("date").disabled = value;
  document.getElementById("time").disabled = value;
  document.getElementById("limit").disabled = value;
}
