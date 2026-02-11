const DOM = {
    num1: document.getElementById('num1'),
    num2: document.getElementById('num2'),
    operation: document.getElementById('operation'),
    result: document.getElementById('result'),
    calcular: document.querySelector("#calcular"),
    limpiarHistorial: document.getElementById('limpiarHistorial'),
    limpiarInputs: document.getElementById('limpiarInputs'),
    historialSelect: document.getElementById('historial'),
    toggleTheme: document.getElementById('toggleTheme')
};

DOM.limpiarHistorial.onclick = limpiarHistorialCompleto;
DOM.limpiarInputs.onclick = limpiarInputsCalc;
DOM.historialSelect.addEventListener('change', recuperarOperacion);
DOM.historialSelect.addEventListener('dblclick', eliminarOperacion);
DOM.toggleTheme.addEventListener('click', toggleDarkMMode);
DOM.calcular.onclick = calcular;

// Eventos de teclado para calcular al pulsar Enter
DOM.num1.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calcular();
});
DOM.num2.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calcular();
});


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

    let operacionObj = {
        num1: primerValor,
        operation: operacion,
        num2: segundoValor,
        result: resultado
    };

    guardarLocalStorage(operacionObj);
}

function guardarLocalStorage(operacionObj){
    let historial = !localStorage.getItem("historial")?[]:JSON.parse(localStorage.getItem("historial"));
    historial.push(operacionObj);
    pintarHistorial(historial);
    localStorage.setItem("historial", JSON.stringify(historial));
}

function pintarHistorial(array){
    let html = "";
    array.forEach((element, index) => {
        let displayText = `${element.num1} ${element.operation} ${element.num2} = ${element.result}`;
        html += `<option value="${index}">${displayText}</option>`;
    });
    DOM.historialSelect.innerHTML = html;
}

function sumar(a, b) {
    return a + b;
}

function restar(a, b) {
    return a - b;
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

function limpiarInputsCalc() {
    DOM.num1.value = '';
    DOM.num2.value = '';
    DOM.result.value = '';
    DOM.operation.value = '+';
    DOM.num1.focus();
}

function recuperarOperacion() {
    let historial = !localStorage.getItem("historial")?[]:JSON.parse(localStorage.getItem("historial"));
    let selectedIndex = DOM.historialSelect.value;
    
    if (selectedIndex !== "" && historial[selectedIndex]) {
        let operacion = historial[selectedIndex];
        DOM.num1.value = operacion.num1;
        DOM.num2.value = operacion.num2;
        DOM.operation.value = operacion.operation;
        DOM.result.value = operacion.result;
    }
}

function eliminarOperacion() {
    let selectedIndex = DOM.historialSelect.value;
    if (selectedIndex === "") return;
    
    let historial = !localStorage.getItem("historial")?[]:JSON.parse(localStorage.getItem("historial"));
    
    if (historial[selectedIndex]) {
        historial.splice(selectedIndex, 1);
        localStorage.setItem("historial", JSON.stringify(historial));
        pintarHistorial(historial);
    }
    limpiarInputsCalc();
}

function inicializarTema() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-mode', savedTheme === 'dark');
    actualizarIconoTema();
}

function actualizarIconoTema() {
    const isDarkMode = localStorage.getItem('theme') === 'dark';
    DOM.toggleTheme.innerHTML = `<i class="fas fa-${isDarkMode ? 'moon' : 'sun'}"></i>`;
}

function toggleDarkMMode() {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    actualizarIconoTema();
}

// Inicializaciones
inicializarTema();

pintarHistorial(localStorage.getItem("historial")?JSON.parse(localStorage.getItem("historial")):[]);
