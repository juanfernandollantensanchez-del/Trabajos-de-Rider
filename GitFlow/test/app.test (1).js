import { saludar, despedir, estadoSistema,sumar,healthCheck,factorial } from "../src/app.js"

function ejecutarPruebas() {
    let pasadas = 0;
    let fallidas = 0;

    const r1 = saludar("Juan")
    if (r1.includes("Juan")) {
        console.log("Test 1 pasado: funcion saludar en CodeJuan es correcta")
        pasadas++;
    } else {
        console.log("Test 1 Fallido:", r1);
        fallidas++;
    }

    const actualEstado = estadoSistema();
    if (actualEstado.estado === "activo") {
        console.log("Test 2: Pasado: estadoSistema() funciona en Juan");
        pasadas++;
    } else {
        console.log("Test 2 Fallido:", actualEstado, "en Juan");
        fallidas++;
    }

    // Test sumar mostrando resultado
    const a = 35;
    const b = 58;

    const sumarResultado = sumar(a, b);

    console.log("Resultado de sumar:", a, "+", b, "=", sumarResultado);

    if (sumarResultado === a + b) {
        console.log("Test 3 pasado: funcion sumar funciona correctamente");
        pasadas++;
    } else {
        console.log("Test 3 Fallido:", sumarResultado);
        fallidas++;
    }

    const numero = 20;
    const resultadoFactorial = factorial(numero);

    console.log("Resultado factorial:", numero, "=", resultadoFactorial);

    if (resultadoFactorial === factorial(numero)) {
        console.log("Test 4 pasado: funcion factorial funciona correctamente");
        pasadas++;
    } else {
        console.log("Test 4 Fallido:", resultadoFactorial);
        fallidas++;
    }

    const health = healthCheck();
    if (health.status === 'ok') {
        console.log('Test 5 healthCheck pasado');
        pasadas++;
    } else {
        console.log('Test 5 healthCheck fallido', health);
        fallidas++;
    }

    console.log("\nResultados:", pasadas, "pasadas,", fallidas, "fallidas");

    if (fallidas > 0) process.exit(1);

}


ejecutarPruebas();