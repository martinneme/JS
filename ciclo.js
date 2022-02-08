const agregar = document.querySelector("#submit");

agregar.addEventListener("click", ()=>{
let resp;
do{ 
let nombre = prompt("ingrese un nombre");
console.log(nombre);
let codigoHTMl = `<div class="card-body">
    <p class="card-text" id="">${nombre}</p>
</div>`;
document.querySelector("#item").innerHTML+=codigoHTMl;
resp = confirm("desea agregar otro nombre?"); 
}while(resp)
});