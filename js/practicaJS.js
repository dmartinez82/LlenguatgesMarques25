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
    let interesUsuari = DOM.intereses.value.trim();
    const indexTrobat = interesos.findIndex(function (element) {
        if (element.toUpperCase() == interesUsuari.toUpperCase())
            return true;
        else 
            return false;
    });

    if (interesUsuari && indexTrobat == -1){
        interesos.push(interesUsuari);
        mostraResultats();
    }
    
}

function mostraResultats(){
    DOM.resultatInteresos.innerHTML = "";

    let resultatHTML = "<ul>";
    for(let interes of interesos){
        resultatHTML += "<li>" + interes + "</li>";
    }
    resultatHTML += "</ul>";

    DOM.resultatInteresos.innerHTML = resultatHTML;
}