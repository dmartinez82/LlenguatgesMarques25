const DOM = {
    inputNombre: document.querySelector("#nombre"),
    boton: document.querySelector("#myButton"),
    btnPapelera: document.querySelector("form button[type='reset']"),
    titol: document.querySelector("body > h1"),
    inputEdad: document.querySelector("#edat"),
    body: document.querySelector("body"),
    intereses: document.querySelector("#intereses"),
    btnAfegir: document.querySelector("#btnAfegir"),
    resultatInteresos: document.querySelector("#resultatInteresos")
}

DOM.boton.onclick = function () { saluda() };
DOM.btnPapelera.onclick = neteja;
DOM.btnAfegir.onclick = afegir;

let interesos = [];

function saluda() {

    if (!DOM.inputEdad.value) {
        alert("Debes introducir tu edad.");
        return;
    }

    if (!compruebaEdad()) {
        alert("No puedes usar esta aplicación.");
        DOM.body.style.backgroundColor = "#c13d3d";
        return;
    }

    let nom = DOM.inputNombre.value.trim();
    if (nom == "") {
        alert("Debes introducir un nombre")
    } else {
        DOM.titol.textContent = "Hola " + nom + ".";
        DOM.body.style.backgroundColor = "#12FB33";
    }
}

function neteja() {
    DOM.inputNombre.value = "";
    DOM.inputEdad.value = "";
    DOM.titol.textContent = "Hello World";
    DOM.body.style.backgroundColor = "";
}

function compruebaEdad() {
    let edad = DOM.inputEdad.value;
    return (edad >= 18);
}

function afegir(){
    let interesUsuari = DOM.intereses.value;
    // interesos[interesos.length] = interesUsuari;
    interesos.push(interesUsuari);
    mostraResultats();
}

function mostraResultats(){
    // DOM.resultatInteresos.textContent = interesos;

    DOM.resultatInteresos.textContent = "";

    let i = 0;
    while(i< interesos.length){
        DOM.resultatInteresos.textContent += interesos[i] + ",";
        i++;
    }

    DOM.resultatInteresos.textContent = "";

    for(let i = 0; i< interesos.length; i++){
        DOM.resultatInteresos.textContent += interesos[i] + ";";
    }

    DOM.resultatInteresos.textContent = "";

    for(let interes of interesos){
        DOM.resultatInteresos.textContent += interes + "/";
    }

    DOM.resultatInteresos.textContent = "";

    interesos.forEach(function(element){
        DOM.resultatInteresos.textContent += element + "-";
    });



}