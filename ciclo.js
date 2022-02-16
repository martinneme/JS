const agregar = document.querySelector("#submit");
const generar = document.querySelector("#generar");
const add = document.querySelector("#add");
const allGuest = document.querySelector("#allGuest");

const limiteInvitados = document.querySelector("#limiteInvitados");
const cantidadDeInvitados = document.querySelector("#cantidadDeInvitados");
const porcentajeOcupacion = document.querySelector("#porcentajeOcupacion");

let invitados = [];
let flagLimiteInvitados = 0;

limiteInvitados.textContent = 0;
cantidadDeInvitados.textContent = 0;
porcentajeOcupacion.textContent = 0;


// * FRAGMENTO EN CONSTRUCCION PARA IMPLEMENTAR GET EN LOCALSTORAGE A FUTURO *
// function GetInvitados() {
//   let lista = localStorage.getItem("listaInvitados");
//   return lista;
// }

agregar.addEventListener("click", () => {
  let nombre = document.querySelector("#invitado").value;

  if (nombre) {
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
    buttonAdd.setAttribute("id", nombre);
    buttonAdd.setAttribute("onclick", "addName(this)");
    buttonAdd.textContent = ">";

    let codigoHTMl = cardName.appendChild(TagName);
    codigoHTMl.appendChild(buttonAdd);

    document.querySelector("#item").appendChild(codigoHTMl);
    document.querySelector("#invitado").value = "";
  }

  invitados.push(nombre);
  cantidadDeInvitados.textContent = invitados.length;
  let AltInvit = invitados.length;
let result = (AltInvit * 100)/parseInt(limiteInvitados.textContent);
result = result.toFixed(2);
porcentajeOcupacion.textContent = result+"%";
  // * FRAGMENTO EN CONSTRUCCION PARA IMPLEMENTAR SET Y GET EN LOCALSTORAGE A FUTURO *
  //   if (localStorage.length != 0) {
  //       let lista=[];
  //       let listainvitadosAdd = [];
  //     lista = GetInvitados();
  //     lista.push(nombre);
  //     localStorage.setItem("listaInvitados", lista);

  //   }
  //   else {
  //     invitados.push(nombre);
  //    localStorage.setItem("listaInvitados",invitados);
  //   }
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
