function parseArrayBySpace(str) {
    return str ? str.trim().split(/\s+/) : [];
}

// ex26: Suma máxima de un subarreglo (Algoritmo de Kadane)
export function ex26(i) {
    let a = parseArrayBySpace(i.subarrayInput).map(Number);
    if (!a.length || isNaN(a[0])) return { result: "Array vacío o inválido" };

    let maxHastaAhora = a[0];
    let maxActual = a[0];

    for (let j = 1; j < a.length; j++) {
        maxActual = Math.max(a[j], maxActual + a[j]);
        maxHastaAhora = Math.max(maxHastaAhora, maxActual);
    }
    return { result: `Suma máxima: ${maxHastaAhora}` };
}

// ex27: Mezclar y ordenar dos listas (Merge)
export function ex27(i) {
    let a = parseArrayBySpace(i.array1Input).map(Number).filter(n => !isNaN(n));
    let b = parseArrayBySpace(i.array2Input).map(Number).filter(n => !isNaN(n));
    let res = [...a, ...b].sort((x, y) => x - y);
    return { result: `Merge ordenado: ${res.join(' ')}` };
}

// ex28: Generar números primos hasta un límite
export function ex28(i) {
    let l = Number(i.primeLimitInput);
    let p = [];
    for (let j = 2; j <= l; j++) {
        let isP = true;
        for (let k = 2; k * k <= j; k++) {
            if (j % k === 0) { isP = false; break; }
        }
        if (isP) p.push(j);
    }
    return { result: `Primos hasta ${l}: ${p.join(', ')}` };
}

// ex29: Transponer una Matriz
export function ex29(i) {
    if (!i.matrixInput || i.matrixInput.trim() === "") {
        return { result: "Formato: 1 2; 3 4 (usa ';' para filas)" };
    }
    // Divide por ';' para filas y por espacios para columnas
    let matriz = i.matrixInput.split(';').map(fila => fila.trim().split(/\s+/).map(Number));
    
    try {
        let transpuesta = matriz[0].map((_, colIndex) => matriz.map(fila => fila[colIndex]));
        let resStr = transpuesta.map(f => `[${f.join(' ')}]`).join(' ');
        return { result: `Transpuesta: ${resStr}` };
    } catch (e) {
        return { result: "Error: Asegúrate de que todas las filas tengan el mismo tamaño." };
    }
}

// ex30: Ordenar lista (Merge Sort conceptual)
export function ex30(i) {
    let a = parseArrayBySpace(i.mergeSortInput).map(Number).filter(n => !isNaN(n));
    a.sort((x, y) => x - y);
    return { result: `Ordenado: ${a.join(' ')}` };
}