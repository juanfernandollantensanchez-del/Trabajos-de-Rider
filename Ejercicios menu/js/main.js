import * as combine from './combine.js';

// Elementos de la interfaz
const numero1Input = document.getElementById('numero1');
const numero2Input = document.getElementById('numero2');
const inputGeneral = document.getElementById('inputGeneral');
const operacionSelect = document.getElementById('operacion');
const btncalcular = document.getElementById('btncalcular');
const resultadosDiv = document.getElementById('resultados');

// Elementos de testing
const btnTest = document.getElementById('btnTest');
const testStatus = document.getElementById('test-status');

// 1. FUNCIÓN CALCULADORA (Uso manual)
function calcular() {
    try {
        const operacion = operacionSelect.value; // ej: 'ex28'
        const num1 = parseFloat(numero1Input.value) || 0;
        const valGeneral = inputGeneral.value;
        let resultado;

        // Llamada dinámica usando el objeto exportado
        if (operacion === 'nombre') {
            resultado = { result: `👤 Autor: ${combine.name}` };
        } else {
            // Aquí combine.ejer[operacion] equivale a combine.ejer.ex28(...)
            resultado = combine.ejer[operacion]({ 
                subarrayInput: valGeneral,
                array1Input: valGeneral,
                array2Input: numero2Input.value,
                primeLimitInput: num1,
                matrixInput: valGeneral,
                mergeSortInput: valGeneral
            });
        }

        resultadosDiv.innerText = resultado.result;
        resultadosDiv.style.color = "#2ecc71";
    } catch (error) {
        resultadosDiv.innerText = `❌ Error: ${error.message}`;
        resultadosDiv.style.color = "#e74c3c";
    }
}

// 2. SISTEMA DE TESTING MASIVO (Verifica todos a la vez)
const baseDeTests = {
    ex26: { nombre: "Ejercicio 26 (Suma)", input: { subarrayInput: "-2,1,-3,4,-1,2,1,-5,4" }, esperado: "6" },
    ex27: { nombre: "Ejercicio 27 (Merge)", input: { array1Input: "1,3,5", array2Input: "2,4,6" }, esperado: "1, 2, 3, 4, 5, 6" },
    ex28: { nombre: "Ejercicio 28 (Primos)", input: { primeLimitInput: 10 }, esperado: "2, 3, 5, 7" },
    ex29: { nombre: "Ejercicio 29 (Matriz)", input: { matrixInput: "1,2;3,4" }, esperado: "1, 3, 2, 4" },
    ex30: { nombre: "Ejercicio 30 (Sort)", input: { mergeSortInput: "5, 2, 9, 1" }, esperado: "1, 2, 5, 9" }
};

function ejecutarTestingCompleto() {
    testStatus.innerHTML = "<strong>Iniciando Pruebas Unitarias...</strong><br><br>";
    let contadorAprobados = 0;
    const totalPruebas = Object.keys(baseDeTests).length;

    Object.keys(baseDeTests).forEach(id => {
        const prueba = baseDeTests[id];
        const linea = document.createElement('div');
        linea.style.marginBottom = "8px";

        try {
            // EJECUCIÓN CON EXPORT:
            // Accedemos a la función exportada dinámicamente
            const respuesta = combine.ejer[id](prueba.input);
            const obtenido = String(respuesta.result).trim();

            if (obtenido.includes(prueba.esperado)) {
                linea.innerHTML = `🔹 ${prueba.nombre}: <span style="color: #2ecc71; font-weight:bold;">APROBADO ✅</span>`;
                contadorAprobados++;
            } else {
                linea.innerHTML = `🔹 ${prueba.nombre}: <span style="color: #e67e22; font-weight:bold;">DESAPROBADO ❌</span> <br> <small>Esperaba "${prueba.esperado}" pero llegó "${obtenido}"</small>`;
            }
        } catch (error) {
            linea.innerHTML = `🔹 ${prueba.nombre}: <span style="color: #e74c3c; font-weight:bold;">ERROR DE CÓDIGO 💥</span> <br> <small>${error.message}</small>`;
        }
        testStatus.appendChild(linea);
    });

    // Resultado final
    const resumen = document.createElement('div');
    resumen.style.marginTop = "15px";
    resumen.style.paddingTop = "10px";
    resumen.style.borderTop = "2px solid #ddd";
    
    if (contadorAprobados === totalPruebas) {
        resumen.innerHTML = `<h3 style="color: #2ecc71;">🏆 TODO APROBADO (${contadorAprobados}/${totalPruebas})</h3>`;
    } else {
        resumen.innerHTML = `<h3 style="color: #e74c3c;">⚠️ REPROBADO (${contadorAprobados}/${totalPruebas} pasaron)</h3>`;
    }
    testStatus.appendChild(resumen);
}

// Escuchadores de eventos
btncalcular.addEventListener('click', calcular);
btnTest.addEventListener('click', ejecutarTestingCompleto);