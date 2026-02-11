const DOM = {
    num1: document.getElementById('num1'),
    num2: document.getElementById('num2'),
    operation: document.getElementById('operation'),
    result: document.getElementById('result'),
    calcular: document.querySelector("#calcular"),
    limpiarHistorial: document.getElementById('limpiarHistorial')
};

DOM.calcular.onclick = calcular;

// Eventos de teclado para calcular al pulsar Enter
DOM.num1.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calcular();
});
DOM.num2.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calcular();
});

DOM.limpiarHistorial.onclick = limpiarHistorialCompleto;

function calcular() {
    let primerValor = parseFloat(DOM.num1.value);
    let segundoValor = parseFloat(DOM.num2.value);

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
    return parseFloat((a / b).toFixed(3));
}

function mod(a, b) {
    return a % b;
}

function limpiarHistorialCompleto() {
    localStorage.removeItem("historial");
    pintarHistorial([]);
}

pintarHistorial(localStorage.getItem("historial")?JSON.parse(localStorage.getItem("historial")):[]);
