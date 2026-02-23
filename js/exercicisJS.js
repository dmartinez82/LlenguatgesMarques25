//inicialització
_get("calculaFact").onclick = () => executaFuncio(calculaFactorial, "resultat", "num1");
_get("calculaArrel").onclick = () => executaFuncio(arrel, "resultat", "num1");
_get("calculaMajor").onclick = () => executaFuncio(major, "resultat", "num1", "num2");
_get("calculaPot").onclick = () => executaFuncio(potencia, "resultat", "num1", "num2");
_get("calculaRAND").onclick = () => executaFuncio(aleatori, "resultat");
_get("fonsAleatori").onclick = () => fonsAleatori();

let intervalRanndId;
_get("randomGenerator").onclick = () => {

    if (!intervalRanndId) {
        intervalRanndId = setInterval(randomGenerator, 100);
    } else {
        clearInterval(intervalRanndId);
        intervalRanndId = null;
    }
};

function randomGenerator() {
    _get("randText").value = aleatori(36);
}

function cuentaAtras() {
    let num = 60;
    let intervalId = setInterval(() => {
        _get("randText").value = num;
        num--;
        if (num < 0) {
            clearInterval(intervalId);
            location.reload();
        }
    }, 100);
}

_get("cuentaAtras").onclick = () => cuentaAtras();

//funcions d'ajuda
function _get(idElement) { return document.getElementById(idElement); }

function executaFuncio(funcio, output, input1, input2) {
    var num1 = input1 ? parseInt(_get(input1).value) : null;
    var num2 = input2 ? parseInt(_get(input2).value) : null;

    var resultat;
    if (num1 != null && num2 != null) {
        resultat = funcio(num1, num2);
    } else if (num1 != null) {
        resultat = funcio(num1);
    } else {
        resultat = funcio();
    }

    _get(output).value = resultat;
}
//fi funcions ajuda

//funcions que heu d'implementar
function calculaFactorial(numero) {
    for (let i = numero - 1; i >= 1; i--) {
        numero = numero * i;
    }
    return numero;
}


function calculaFactorial(numero) {
    return (numero == 1) ? 1 : numero * calculaFactorial(numero - 1);
}

//Version Miquel
function major(numero1, numero2) {
    return (numero1 > numero2) ? numero1 : numero2;
}

//Version Mario PRO (0.75x)
function major(numero1, numero2) {
    if (numero1 > numero2) {
        return numero1;
    } else {
        return numero2;
    }
}

//Version Ruben 
// function potencia(base, exp) {
//     let potencia = 1
//     for(let i = 1; i <= exp; i++){
//         potencia *= base;
//     }
//     return potencia;
// }

//Version Max 
function potencia(base, exp) {
    return Math.pow(base, exp);
}

//Version Max 
// function potencia(base, exp) {
//     return base**exp;
// }

function arrel(num) {
    return (num ** (1 / 2)).toFixed(3);
}

function aleatori(limit = 100) {
    return Math.round(Math.random() * (limit + 1));
}

function fonsAleatori() {
}