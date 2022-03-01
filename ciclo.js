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
let flagGenerate=0;
let ultimoId = 0;
let select;

limiteInvitados.textContent = 0;
cantidadDeInvitados.textContent = 0;
porcentajeOcupacion.textContent = 0;

class Evento{
  constructor(name,description,address,date,time,InvitadosLimite){
    this.name=name;
    this.description=description;
    this.address=address;
    this.date=date;
    this.time=time;
    this.limiteInvitados=InvitadosLimite;
  }
}

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
      if (flagGenerate == '0') {
         alert("Debes generar el evento primero");
      }else{
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
  }

  cantidadDeInvitados.textContent = invitados.length;
  let AltInvit = invitados.length;
  let result = (AltInvit * 100) / parseInt(limiteInvitados.textContent);
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
  let InvitadosLimite = document.querySelector("#limit").value;

if(title != "" && details != "" && address != "" && date != "" && time != "" && InvitadosLimite != ""){
  flagGenerate=1;
}
const evento = new Evento(title,details,address,date,time,InvitadosLimite);
localStorage.setItem("Evento",JSON.stringify(evento));
  const limit = document.querySelector("#limiteInvitados");
limit.textContent=InvitadosLimite;
location.hash = "#item";

document.getElementById("title").value="";
document.getElementById("details").value="";
document.getElementById("address").value="";
document.getElementById("title").value="";
document.getElementById("date").value="";
document.getElementById("time").value="";
document.getElementById("limit").value="";

});

function addName(addbtn) {
  let name = addbtn.id;
  select = document.getElementById(name).getAttribute("tag");
  console.log(select);
  nombre = document.querySelector("#nombreInvitado");
  nombre.textContent = name;
}

async function allGuestsGenerate() {
  let cantidadCarne = 0;
  let cantidadViggie = 0;
  let cantidadCeliaco = 0;


  for (let i = 0; i < invitados.length; i++) {
    if (invitados[i].dieta == "Carne") {
      cantidadCarne++;
    } else if (invitados[i].dieta == "Viggie") {
      cantidadViggie++;
    }else if(invitados[i].dieta == "Celiaco"){
      cantidadCeliaco++;
    }


  }

document.querySelector("#cantCarne").textContent="Han preferido dieta de Carnes: "+cantidadCarne;
document.querySelector("#cantViggie").textContent="Han preferido dieta Viggie: "+cantidadViggie;
document.querySelector("#cantCeliaco").textContent="Han preferido dieta de Celiaca: "+cantidadCeliaco;


}

function wait(t) {
  return new Promise(function (resolve) {
    setTimeout(resolve, t * 1000);
  });
}

allGuest.addEventListener("click", allGuestsGenerate);

guardar.addEventListener("click",async () => {
  let dietaOpt;
  select = parseInt(select);
  let edad = document.querySelector("#edad").value;
  let email = document.querySelector("#email").value;
  let dieta = document.getElementsByName("dieta");

  const position = invitados.find((el) => el.id == select);
  console.log(dieta);
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
  
  if(position.edad && position.dieta && position.email){
    document.querySelector("#confirmSave").setAttribute("style","display:block");
    await wait(4);
    document.querySelector("#confirmSave").setAttribute("style","display:none");
  }
});

