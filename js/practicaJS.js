const $ = (selector) => document.querySelector(selector);

const DOM = {
    inputNombre: $("#nombre"),
    boton: $("#myButton"),
    btnPapelera: $("form button[type='reset']"),
    titol: $(".contenedor > h1"),
    inputEdad: $("#dataNaix"),
    body: $("body"),
    intereses: $("#intereses"),
    btnAfegir: $("#btnAfegir"),
    btnElimina: $("#btnElimina"),
    resultatInteresos: $("#resultatInteresos")
}

DOM.boton.onclick = saluda;
DOM.btnPapelera.onclick = neteja;
DOM.btnAfegir.onclick = afegir;
DOM.btnElimina.onclick = elimina;

DOM.inputEdad.onblur = compruebaEdad;

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
    let fechaInput = DOM.inputEdad.value;

    let fecha = new Date(fechaInput);
    let avui = new Date();

    let edad = avui.getFullYear() - fecha.getFullYear();

    console.log(fechaInput);
    console.dir(fecha);

    console.log(edad);

}

function afegir(){
    let interesUsuari = DOM.intereses.value.trim();
    // const indexTrobat = interesos.findIndex(function (element) {
    //     if (element.toUpperCase() == interesUsuari.toUpperCase())
    //         return true;
    //     else 
    //         return false;
    // });

    const indexTrobat = interesos.findIndex((element) =>
         (element.toUpperCase() == interesUsuari.toUpperCase())
);

    if (interesUsuari && indexTrobat == -1){
        interesos.push(interesUsuari);
        mostraResultats();
    }
    
}

function mostraResultats(){
    DOM.resultatInteresos.innerHTML = "";

    let resultatHTML = "<ul>";
    let index = 0;
    for(let interes of interesos){
        // resultatHTML += "<li id=\"elemento" + index++ +"\">" + interes + "</li>";
        resultatHTML += `<li id="elemento${index++}">${interes}</li>`;
    }
    resultatHTML += "</ul>";

    DOM.resultatInteresos.innerHTML = resultatHTML;
}

function elimina(){
    //TODO: refactorizar para no duplicar con "afegir"
    let interesUsuari = DOM.intereses.value.trim();
    const indexTrobat = interesos.findIndex(function (element) {
        if (element.toUpperCase() == interesUsuari.toUpperCase())
            return true;
        else 
            return false;
    });

    if (interesUsuari && indexTrobat > -1){
        interesos.splice(indexTrobat, 1); //TODO: usar splice tanto para eliminar como para añadir
        mostraResultats();
    }


}