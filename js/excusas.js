/* Arrays con las partes de la excusa */
const quien = [
    "Mi perro",
    "Mi abuela",
    "Mi tortuga",
    "Un alienígena",
    "Mi vecino del quinto",
    "Un fantasma burlón",
    "El presidente del gobierno",
    "Mi clon malvado",
    "Un ninja invisible",
    "El repartidor de Amazon"
];

const queHizo = [
    "se comió",
    "quemó",
    "robó",
    "rompió",
    "escondió",
    "desintegró",
    "lanzó por la ventana",
    "convirtió en polvo",
    "bailó encima de",
    "usó de servilleta"
];

const cuando = [
    "mis deberes",
    "mi coche",
    "mis zapatos",
    "mi ordenador",
    "mi desayuno",
    "mi proyecto final",
    "mis ganas de vivir",
    "mi colección de sellos",
    "las llaves de casa",
    "mi dignidad"
];

const excusaElement = document.getElementById('excusa');
const btnGenerar = document.getElementById('btnGenerar');
const btnCopiar = document.getElementById('btnCopiar');

function generarExcusa() {
    const randomQuien = Math.floor(Math.random() * quien.length);
    const randomQue = Math.floor(Math.random() * queHizo.length);
    const randomCuando = Math.floor(Math.random() * cuando.length);
    const frase = `${quien[randomQuien]} ${queHizo[randomQue]} ${cuando[randomCuando]}`;
    excusaElement.innerText = frase;

    // Resetear icono de copiar si estaba en "check"
    resetIconoCopiar();
}

function copiarExcusa() {
    const texto = excusaElement.innerText;

    // Evitar copiar el texto inicial
    if (texto === "¡Pulsa el botón para generar una excusa!") return;

    navigator.clipboard.writeText(texto).then(() => {
        // Feedback visual: cambiar icono a check
        const icono = btnCopiar.querySelector('i');
        icono.className = 'fa-solid fa-check'; // Cambiamos a Solid para el check
        btnCopiar.style.color = '#27ae60';

        // Volver al icono original después de 2 segundos
        setTimeout(resetIconoCopiar, 2000);
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}

function resetIconoCopiar() {
    const icono = btnCopiar.querySelector('i');
    icono.className = 'fa-regular fa-copy'; // Volvemos a Regular para copy
    btnCopiar.style.color = ''; // Volver al color original (CSS)
}

btnGenerar.addEventListener('click', generarExcusa);
btnCopiar.addEventListener('click', copiarExcusa);