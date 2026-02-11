const DOM = {
    num1: document.getElementById('num1'),
    num2: document.getElementById('num2'),
    operation: document.getElementById('operation'),
    result: document.getElementById('result'),
    calcular: document.querySelector("#calcular")
};

DOM.calcular.onclick = calcular;

function calcular() {
    let primerValor = parseInt(DOM.num1.value);
    let segundoValor = parseInt(DOM.num2.value);

    let resultado = "ERROR!";

    if (isNaN(primerValor) || isNaN(segundoValor)) {
        DOM.result.value = resultado;
        return;
    }

    let operacion = DOM.operation.value;

    switch (operacion) {
        case "+":
            resultado = sumar(primerValor, segundoValor);
            break;
        case "-":
            resultado = restar(primerValor, segundoValor);
            break;
        case "*":
            resultado = mult(primerValor, segundoValor);
            break;
        case "/":
            resultado = div(primerValor, segundoValor);
            break;
        case "%":
            resultado = mod(primerValor, segundoValor);
            break;
        default:
            break;
    }

    DOM.result.value = resultado;

    let elemento = `${primerValor} ${operacion} ${segundoValor} = ${resultado};`;

    guardarLocalStorage(elemento);

}

function guardarLocalStorage(elemento){
    console.log(localStorage.getItem("historial"));
    let historial = !localStorage.getItem("historial")?[]:JSON.parse(localStorage.getItem("historial"));
    historial.push(elemento);
    pintarHistorial(historial);
    localStorage.setItem("historial", JSON.stringify(historial));
}

function pintarHistorial(array){
    let html = "";
    array.forEach(element => {
        html += `<option>${element}</option>`;
    });
    document.querySelector("#historial").innerHTML = html;
}

function sumar(a, b) {
    return a + b;
}

function restar(a, b) {
    return Math.abs(a - b);
}

function mult(a, b) {
    return a * b;
}

function div(a, b) {
    if (b == 0) return "No es pot dividir per 0";
    return a / b;
}

function mod(a, b) {
    return a % b;
}

pintarHistorial(localStorage.getItem("historial")?JSON.parse(localStorage.getItem("historial")):[]);
