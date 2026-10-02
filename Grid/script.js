/*=========================================
        EMPLEATE - SCRIPT
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    console.log("Empléate iniciado correctamente");

});

/*=========================================
        MENSAJES
=========================================*/

function mensaje(texto){

    alert(texto);

}

/*=========================================
        POSTULARSE
=========================================*/

document.querySelectorAll("button").forEach((boton)=>{

    if(boton.textContent.includes("Postularme")){

        boton.addEventListener("click",()=>{

            mensaje("✅ Te postulaste correctamente. La empresa revisará tu hoja de vida.");

        });

    }

});

/*=========================================
        CONTACTAR
=========================================*/

document.querySelectorAll("button").forEach((boton)=>{

    if(boton.textContent.includes("Contactar")){

        boton.addEventListener("click",()=>{

            mensaje("📩 Solicitud enviada al candidato.");

        });

    }

});

/*=========================================
        ADMINISTRAR
=========================================*/

document.querySelectorAll("button").forEach((boton)=>{

    if(boton.textContent.includes("Administrar")){

        boton.addEventListener("click",()=>{

            mensaje("👨‍💼 Accediendo al panel de administración.");

        });

    }

});

/*=========================================
        EDITAR PERFIL
=========================================*/

document.querySelectorAll("button").forEach((boton)=>{

    if(boton.textContent.includes("Editar Perfil")){

        boton.addEventListener("click",()=>{

            mensaje("✏️ Perfil actualizado correctamente.");

        });

    }

});

/*=========================================
        PUBLICAR VACANTE
=========================================*/

document.querySelectorAll("button").forEach((boton)=>{

    if(boton.textContent.includes("Publicar")){

        boton.addEventListener("click",()=>{

            mensaje("🎉 Vacante publicada correctamente.");

        });

    }

});

/*=========================================
        VER OFERTA
=========================================*/

document.querySelectorAll("button").forEach((boton)=>{

    if(boton.textContent.includes("Ver Oferta")){

        boton.addEventListener("click",()=>{

            mensaje("📄 Abriendo información de la vacante.");

        });

    }

});

/*=========================================
            CHAT IA
=========================================*/

function agregarMensaje(texto, tipo){

    const chat = document.getElementById("chatBox");

    if(!chat) return;

    const mensaje = document.createElement("div");

    mensaje.className = "mensaje " + tipo;

    mensaje.innerHTML = texto;

    chat.appendChild(mensaje);

    chat.scrollTop = chat.scrollHeight;

}

function responder(texto){

    texto = texto.toLowerCase();

    let respuesta = "";

    if(texto.includes("empleo")){

        respuesta = "💼 Tenemos vacantes para Desarrollador Web, Diseñador UI/UX y Analista de Sistemas.";

    }

    else if(texto.includes("hoja")){

        respuesta = "📄 Mantén tu hoja de vida actualizada con estudios, experiencia y habilidades.";

    }

    else if(texto.includes("empresa")){

        respuesta = "🏢 Las empresas pueden publicar vacantes y administrar candidatos desde su panel.";

    }

    else if(texto.includes("perfil")){

        respuesta = "👤 Puedes actualizar tu perfil desde el Panel del Candidato.";

    }

    else if(texto.includes("postul")){

        respuesta = "📨 Puedes consultar tus postulaciones en la sección 'Mis Postulaciones'.";

    }

    else if(texto.includes("hola")){

        respuesta = "👋 Hola, soy EmpléIA. ¿Cómo puedo ayudarte?";

    }

    else{

        respuesta = "🤖 Lo siento, aún estoy aprendiendo. Intenta preguntarme sobre empleos, empresas, hoja de vida o postulaciones.";

    }

    setTimeout(()=>{

        agregarMensaje("🤖 " + respuesta,"ia");

    },700);

}

function enviarMensaje(){

    const input = document.getElementById("pregunta");

    if(!input) return;

    if(input.value.trim()=="") return;

    agregarMensaje("👤 " + input.value,"usuario");

    responder(input.value);

    input.value="";

}

function respuestaRapida(opcion){

    switch(opcion){

        case "empleos":

            responder("empleo");

        break;

        case "hoja":

            responder("hoja");

        break;

        case "empresa":

            responder("empresa");

        break;

        case "perfil":

            responder("perfil");

        break;

        case "postulacion":

            responder("postulacion");

        break;

        case "contacto":

            agregarMensaje("👤 ¿Cómo contacto con Empléate?","usuario");

            setTimeout(()=>{

                agregarMensaje("🤖 Puedes escribir al correo contacto@empleate.com o comunicarte al +57 300 123 4567.","ia");

            },700);

        break;

    }

}

/*=========================================
        ENTER PARA ENVIAR
=========================================*/

const input = document.getElementById("pregunta");

if(input){

    input.addEventListener("keypress",(e)=>{

        if(e.key==="Enter"){

            enviarMensaje();

        }

    });

}