// 1. Buscamos el botón en el HTML
const boton = document.getElementById('boton-tema');

// 2. Escuchamos el clic
boton.addEventListener('click', () => {
    
    // Buscamos si el archivo CSS ya existe en la página
    const cssExistente = document.getElementById('css-dinamico');
    
    if (!cssExistente) {
        // MODO OSCURO: NO EXISTE, ASÍ QUE LO CREAMOS E INYECTAMOS
        const enlaceCSS = document.createElement('link');
        enlaceCSS.id = 'css-dinamico';
        enlaceCSS.rel = 'stylesheet';
        enlaceCSS.href = 'tema-oscuro.css';
        
        document.head.appendChild(enlaceCSS);
        
        // Actualizamos el botón para que indique cómo apagarlo
        boton.innerText = "Desactivar Modo Oscuro";
        boton.style.backgroundColor = "#10B981"; // Cambia a verde
        boton.style.color = "white";
        
    } else {
        // MODO CLARO: YA EXISTE, ASÍ QUE LO DESTRUIMOS
        cssExistente.remove();
        
        // Regresamos el botón a su estado original
        boton.innerText = "Activar Modo Oscuro";
        boton.style.backgroundColor = "#333"; // Regresa a gris oscuro
    }
});