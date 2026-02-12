/* 1. ORGANIZACIÓN DEL DOM */
const DOM = {
    num1: document.getElementById('num1'),
    num2: document.getElementById('num2'),
    operation: document.getElementById('operation'),
    result: document.getElementById('result'),
    calcular: document.getElementById('calcular'), // Unificamos a getElementById
    limpiarHistorial: document.getElementById('limpiarHistorial'),
    limpiarInputs: document.getElementById('limpiarInputs'),
    historialSelect: document.getElementById('historial'),
    toggleTheme: document.getElementById('toggleTheme')
};

/* 2. EVENT LISTENERS (Todo con addEventListener) */
DOM.limpiarHistorial.addEventListener('click', limpiarHistorialCompleto);
DOM.limpiarInputs.addEventListener('click', limpiarInputsCalc);
DOM.historialSelect.addEventListener('change', recuperarOperacion);
DOM.historialSelect.addEventListener('dblclick', eliminarOperacion);
DOM.toggleTheme.addEventListener('click', toggleDarkMode);
DOM.calcular.addEventListener('click', calcular);

// Eventos de teclado para calcular al pulsar Enter
DOM.num1.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calcular();
});
DOM.num2.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calcular();
});


/* 3. FUNCIONES HELPER (Para no repetir código de localStorage) */
function getHistorial() {
    const history = localStorage.getItem("historial");
    return history ? JSON.parse(history) : [];
}

function saveHistorial(lista) {
    localStorage.setItem("historial", JSON.stringify(lista));
    pintarHistorial(lista);
}

/* 4. LÓGICA PRINCIPAL */
function calcular() {
    const primerValor = parseFloat(DOM.num1.value);
    const segundoValor = parseFloat(DOM.num2.value);
    const operacion = DOM.operation.value;

    let resultado = "ERROR!";

    if (isNaN(primerValor) || isNaN(segundoValor)) {
        DOM.result.value = resultado;
        return;
    }

    switch (operacion) {
        case "+": resultado = sumar(primerValor, segundoValor); break;
        case "-": resultado = restar(primerValor, segundoValor); break;
        case "*": resultado = mult(primerValor, segundoValor); break;
        case "/": resultado = div(primerValor, segundoValor); break;
        case "%": resultado = mod(primerValor, segundoValor); break;
    }

    // Actualizar UI
    DOM.result.value = resultado;

    // Guardar en historial
    const nuevaOperacion = {
        num1: primerValor,
        operation: operacion,
        num2: segundoValor,
        result: resultado
    };

    const historial = getHistorial();
    historial.push(nuevaOperacion);
    saveHistorial(historial);
}

/* 5. GESTIÓN DEL HISTORIAL */
function pintarHistorial(array) {
    let html = "";
    array.forEach((element, index) => {
        const displayText = `${element.num1} ${element.operation} ${element.num2} = ${element.result}`;
        html += `<option value="${index}">${displayText}</option>`;
    });
    DOM.historialSelect.innerHTML = html;
}

function recuperarOperacion() {
    const historial = getHistorial();
    const selectedIndex = DOM.historialSelect.value;

    if (selectedIndex !== "" && historial[selectedIndex]) {
        const op = historial[selectedIndex];
        DOM.num1.value = op.num1;
        DOM.num2.value = op.num2;
        DOM.operation.value = op.operation;
        DOM.result.value = op.result;

        // Construir cadena legible y copiar (solo navigator.clipboard)
        const displayText = `${op.num1} ${op.operation} ${op.num2} = ${op.result}`;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(displayText).catch(() => { });
        }
    }
}

function eliminarOperacion() {
    const selectedIndex = DOM.historialSelect.value;
    if (selectedIndex === "") return;

    const historial = getHistorial();
    // Validamos que el índice exista antes de borrar
    if (historial[selectedIndex]) {
        historial.splice(selectedIndex, 1);
        saveHistorial(historial); // Esto actualiza localStorage y repinta
        limpiarInputsCalc();
    }
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

/* 6. OPERACIONES MATEMÁTICAS */
// Las dejamos simples, perfectas para entender inputs y outputs
function sumar(a, b) { return a + b; }
function restar(a, b) { return a - b; }
function mult(a, b) { return a * b; }
function mod(a, b) { return a % b; }

function div(a, b) {
    if (b === 0) return "No es pot dividir per 0";
    return parseFloat((a / b).toFixed(3));
}

/* 7. GESTIÓN DE TEMA (DARK MODE) */
function inicializarTema() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const isDark = savedTheme === 'dark';

    // Toggle acepta un segundo parámetro booleano (force), muy útil aquí
    document.body.classList.toggle('dark-mode', isDark);
    actualizarIconoTema(isDark);
}

function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    actualizarIconoTema(isDark);
}

function actualizarIconoTema(isDark) {
    DOM.toggleTheme.innerHTML = `<i class="fas fa-${isDark ? 'moon' : 'sun'}"></i>`;
}


// Inicializaciones
inicializarTema();
pintarHistorial(getHistorial());
