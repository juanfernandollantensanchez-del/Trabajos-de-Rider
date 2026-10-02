export function saludar(nombre){
return "Hola" + nombre + ", bienvenido a aplicacion de MiguelFlow!";
}

export function despedir(nombre){
return "hasta pronto," + nombre + "!MiguelFlow";
}

export function estadoSistema() {
return {
estado: "activo",
version:"1.0.0",
message: "Sistema MiguelFlow funcionando correctamente"
 };
}

export function sumar(a,b){
return a + b;
}

export function healthCheck() {
    return {
status:'ok',
timestamp: new Date().toISOString(),
servicio: 'StreamFlow API',
version:'1.0.0'
    };
}


export function factorial(n) {
  if (n < 0) {
    return "Error: el factorial no está definido para números negativos";
  }

  let result = 1;

  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return result;
}

