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
  constructor(id, nombre) {
    this.id = id;
    this.nombre = nombre;
    this.edad = "";
    this.tel = "";
    this.dieta = "";
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
const limit = document.querySelector("#limiteInvitados");
const reportlist = document.querySelector("#reportlist");

let invitados = [];
let flagLimiteInvitados = 0;
let flagGenerate = 0;
let Id;
let select;
let eventVar = {};

limiteInvitados.textContent = 0;
cantidadDeInvitados.textContent = 0;
porcentajeOcupacion.textContent = 0;

function generarID() {
  let ultimoId = 0;
  let id;

  if (localStorage.getItem("ultimoId")) {
    ultimoId = JSON.parse(localStorage.getItem("ultimoId"));
    id = ultimoId + 1;
  } else {
    id = ultimoId;
  }

  localStorage.setItem("ultimoId", JSON.stringify(id));
  return id;
}

agregar.addEventListener("click", () => {
  let nombre = document.querySelector("#invitado").value;

  id = generarID();

  if (nombre) {
    if (isNaN(nombre)) {
      if (flagGenerate == "0") {
        err("Debes generar el evento primero");
      } else {
        const persona = new Persona(id, nombre);
        invitados.push(persona);
        localStorage.setItem("Invitados", JSON.stringify(invitados));
        renderInvitado(nombre, id);
        eventVar.invitados = invitados;
        panelInvitados();
      }
    }
  }
});

function renderInvitado(nombre, id) {
  const cardName = document.createElement("div");
  const tagName = document.createElement("p");
  const buttonAdd = document.createElement("button");
  const buttonDel = document.createElement("button");
  const buttonWpp = document.createElement("button");

  cardName.classList.add("Card-Body");
  cardName.classList.add("item");
  tagName.classList.add("Card-text");
  buttonAdd.classList.add("btn-primary");
  buttonAdd.classList.add("btn");
  buttonAdd.classList.add("add");
  buttonDel.classList.add("btn-primary");
  buttonDel.classList.add("btn");
  buttonDel.classList.add("add");
  buttonWpp.classList.add("btn");
  buttonWpp.classList.add("btn-primary");
  buttonWpp.classList.add("add");

  tagName.setAttribute("id", id);
  buttonAdd.setAttribute("tag", id);
  buttonAdd.setAttribute("id", nombre);
  buttonAdd.setAttribute("onclick", "addName(this)");
  buttonAdd.textContent = nombre;

  buttonDel.setAttribute("tag", id);
  buttonDel.setAttribute("id", nombre);
  buttonDel.setAttribute("onclick", "delName(this)");
  buttonDel.textContent = "Quitar";

  buttonWpp.innerHTML = '<img src="img/whatsapp.png"></img>';
  buttonWpp.setAttribute("tag", nombre);
  buttonWpp.setAttribute("id", id);
  buttonWpp.setAttribute("onclick", "sendInvitations(this)");

  let codigoHTMl = cardName.appendChild(tagName);
  codigoHTMl.appendChild(buttonAdd);
  codigoHTMl.appendChild(buttonDel);
  codigoHTMl.appendChild(buttonWpp);

  document.querySelector("#item").appendChild(codigoHTMl);
  document.querySelector("#invitado").value = "";
}

function panelInvitados() {
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
}

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
    eventVar = evento;

    limit.textContent = invitadosLimite;
    location.hash = "#sectionDos";

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

function delName(delbtn) {
  let name = delbtn.id;
  const ele = document.getElementById(name).getAttribute("tag");
  const item = document.getElementById(ele);
  item.remove();

  select = undefined;
  nombre = document.querySelector("#nombreInvitado");
  nombre.textContent = "";

  for (i = 0; i < invitados.length; i++) {
    if (invitados[i].id == ele) {
      invitados.splice(i, 1);
    }
  }
}

async function allGuestsGenerate() {
  let cantidadCarne = 0;
  let cantidadVeggie = 0;
  let cantidadCeliaco = 0;
  let adult = 0;
  let children = 0;

  for (let i = 0; i < invitados.length; i++) {
    if (invitados[i].dieta == "Carne") {
      cantidadCarne++;
    } else if (invitados[i].dieta == "Veggie") {
      cantidadVeggie++;
    } else if (invitados[i].dieta == "Celiaco") {
      cantidadCeliaco++;
    }

    invitados[i].edad >= 18 ? adult++ : children++;
  }

  const priceCarne = await getPriceMenu("carne");
  const priceVegano = await getPriceMenu("vegano");
  const priceCeliaco = await getPriceMenu("celiaco");

  document.querySelector("#cantCarne").textContent =
    "Han preferido dieta de Carnes: " +
    cantidadCarne +
    " y un presupuesto de $" +
    priceCarne * cantidadCarne;
  document.querySelector("#cantVeggie").textContent =
    "Han preferido dieta Veggie: " +
    cantidadVeggie +
    " y un presupuesto de $" +
    priceVegano * cantidadVeggie;
  document.querySelector("#cantCeliaco").textContent =
    "Han preferido dieta de Celiaca: " +
    cantidadCeliaco +
    " y un presupuesto de $" +
    priceCeliaco * cantidadCeliaco;
  document.querySelector("#adulto").textContent =
    "Hay " + adult + " personas adultas";
  document.querySelector("#menor").textContent =
    "Hay " + children + " personas menores de edad";
}

allGuest.addEventListener("click", allGuestsGenerate);

guardar.addEventListener("click", () => {
  try {
    if (select == undefined) {
      throw "No se ha seleccionado ningun invitado";
    }
    let dietaOpt;
    select = parseInt(select);
    let edad = document.querySelector("#edad").value;
    let tel = document.querySelector("#tel").value;
    let dieta = document.getElementsByName("dieta");

    const position = invitados.find((el) => el.id == select);
    for (i = 0; i < dieta.length; i++) {
      if (dieta[i].checked == true) {
        dietaOpt = dieta[i].id;
      }
    }
    if (edad > 0 && edad < 100 && tel.length < 11 && tel.length >= 8) {
      position.edad = edad;
      position.tel = tel;
      position.dieta = dietaOpt;
      document.querySelector("#edad").value = "";
      document.querySelector("#tel").value = "";
    } else {
      throw "Los campos no cumplen los requisitos";
    }
    if (position.edad && position.dieta && position.tel) {
      toastSave.showToast();
      eventVar = JSON.parse(localStorage.getItem("Evento"));
      eventVar.invitados = invitados;
      localStorage.setItem("Evento", JSON.stringify(eventVar));
      localStorage.setItem("Invitados", JSON.stringify(invitados));
    }
  } catch (e) {
    err(e);
  }
});

function welcome() {
  Swal.fire({
    title: "Bienvenido",
    text: "Comencemos!",
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
}

function err(msj) {
  Swal.fire({
    title: "Error",
    text: msj,
    icon: "error",
    showConfirmButton: false,
    timer: 3000,
  });
}

window.addEventListener("load", () => {
  localStorage.getItem("Evento") ? showModal() : welcome();
});

function showModal() {
  let myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"), {
    keyboard: true,
  });

  let mod = document.querySelector("#staticBackdrop");

  const { name, description, address, date } = JSON.parse(
    localStorage.getItem("Evento")
  );

  let previewEvent = `<p><b>Evento:</b> ${name}</p>
    <p><b>Descricion:</b> ${description}</p>
    <p><b>Direccion:</b> ${address}</p>
    <p><b>Fecha :</b>${date}</p>
                        `;
  const modalBody = document.querySelector("#eventSave");
  modalBody.innerHTML = previewEvent;
  myModal.show(mod);
}

//*PARTE DEL MODAL QUE RETOMA DATOS EN LOCALSTORAGE
let clear = document.querySelector("#delEvent");
//* clear remueve el evento anterior.
clear.addEventListener("click", () => {
  localStorage.removeItem("Evento");
  localStorage.removeItem("ultimoId");
  localStorage.removeItem("Invitados");
});

//*PARTE DEL MODAL QUE RETOMA DATOS EN LOCALSTORAGE
let editEvent = document.querySelector("#continueEvent");

//* cambia la marca que permite iniciar la carga de invitados y mantiene el evento en localstorage
editEvent.addEventListener("click", () => {
  flagGenerate = 1;
  let mod = document.getElementById("close");
  mod.click();

  eventVar = JSON.parse(localStorage.getItem("Evento"));
  invitados = JSON.parse(localStorage.getItem("Invitados"));
  document.querySelector("#title").value = eventVar.name;
  document.querySelector("#details").value = eventVar.description;
  document.querySelector("#address").value = eventVar.address;
  document.querySelector("#date").value = eventVar.date;
  document.querySelector("#time").value = eventVar.time;
  document.querySelector("#limit").value = eventVar.limiteInvitados;

  limit.textContent = eventVar.limiteInvitados;

  if (invitados) {
    eventVar.invitados = invitados;
    invitados.forEach((element) => {
      renderInvitado(element.nombre, element.id);
    });
    panelInvitados();
  }

  location.hash = "#sectionDos";
  disabledEventInput(true);
});

// FUNCION QUE SWITCHEA LOS INPUT GENERACION DE EVENTO
function disabledEventInput(value) {
  document.getElementById("title").disabled = value;
  document.getElementById("details").disabled = value;
  document.getElementById("address").disabled = value;
  document.getElementById("title").disabled = value;
  document.getElementById("date").disabled = value;
  document.getElementById("time").disabled = value;
  document.getElementById("limit").disabled = value;
  document.querySelector("#generar").disabled = value;
}

const toastSave = Toastify({
  text: "Guardado!",
  duration: 3000,
  newWindow: true,
  gravity: "top",
  position: "right",
  stopOnFocus: true,
  style: {
    background: "#ECECEC",
    color: "Green",
  },
  onClick: function () {},
});

async function getPriceMenu(menu) {
  const response = await fetch("./Data/data.json");
  const data = await response.json();
  let price = 0;

  data.forEach((element) => {
    if (element.type == menu) {
      price = element.price;
    }
  });

  return price;
}

async function sendInvitations(wppbtn) {
  let idbtn = wppbtn.id;
  let celular = undefined;

  try {
    for (i = 0; i < invitados.length; i++) {
      if (eventVar.invitados[i].id == idbtn) {
        if (eventVar.invitados[i].tel != "") {
          celular = eventVar.invitados[i].tel;
        }
      }
    }
    if (celular == undefined) {
      throw "No existe telefono registrado para este invitado";
    }
    const { name, description, date, time } = eventVar;

    let wppSend = `https://wa.me/54${celular}?text=Hola,%20quisiera%20invitarte a mi ${name}-%20${description},%20el%${date}%20a%20las%20${time}.%20Te%20espero!%20.Gracias`;
    window.open(wppSend);
  } catch (e) {
    err(e);
  }
}
