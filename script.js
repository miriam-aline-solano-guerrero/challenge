const textArea = document.getElementById("text-area");
const mensaje = document.querySelector(".mensaje");
const tituloMensaje = document.getElementById("titulo-mensaje");
const parrafo = document.getElementById("parrafo");
const muneco = document.getElementById("muneco");
const btnCopiar = document.querySelector(".btn-copiar");

textArea.addEventListener('input', () => {
    const regex = /[^a-z\s]/g;

    if (regex.test(textArea.value)) {
        swal({
            title: "Caracter no permitido",
            text: "Solo se permiten letras minúsculas y sin acentos.",
            icon: "warning",
        });
        textArea.value = textArea.value.replace(regex, '');
    }

    textArea.style.height = "48px"; 
    textArea.style.height = textArea.scrollHeight + "px"; 
});

function btnEncriptar() {
    manejarTexto(encriptar, "Texto encriptado con éxito", "./Assets/encriptado.jpg");
}

function btnDesencriptar() {
    manejarTexto(desencriptar, "Texto desencriptado con éxito", "./Assets/desencriptado.jpg");
}

function manejarTexto(funcion, mensajeTitulo, imagenMuneco) {
    const texto = textArea.value;
    const areaEncriptada = document.querySelector('.area-encriptada');

    if (texto.length !== 0) {
        const textoProcesado = funcion(texto);
        mensaje.value = textoProcesado;
        textArea.value = "";
        mensaje.style.backgroundImage = "none";

        mensaje.style.display = "flex";
        btnCopiar.style.display = "flex";

        ajustarAltura(mensaje);

        if (window.innerWidth > 1200) {
            tituloMensaje.textContent = mensajeTitulo;
            tituloMensaje.style.display = "flex";
            muneco.src = imagenMuneco;
            muneco.style.display = "flex";

            if (document.contains(parrafo)) {
                parrafo.remove();
            }
        } else {
            areaEncriptada.style.height = "auto"; 
            areaEncriptada.style.gap = "32px"; 
            tituloMensaje.style.display = "none";
            
            if (document.contains(parrafo)) {
                parrafo.remove(); 
            }
        }
    } else {
        if (window.innerWidth <= 1200) {
            areaEncriptada.style.height = "auto";
            areaEncriptada.style.gap = "0px"; 
            if (!document.contains(parrafo)) {
                areaEncriptada.appendChild(parrafo); 
            }
        }

        swal({
            title: "Alerta!",
            text: "Debes ingresar un texto",
            icon: "warning",
        }).then(() => {
            location.reload(); 
        });
    }
}

function encriptar(string) {
    const matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    return procesarTexto(string, matrizCodigo);
}

function desencriptar(string) {
    const matrizCodigo = [["enter", "e"], ["imes", "i"], ["ai", "a"], ["ober", "o"], ["ufat", "u"]];
    return procesarTexto(string, matrizCodigo);
}

function procesarTexto(string, matrizCodigo) {
    let resultado = string.toLowerCase();
    for (const [clave, valor] of matrizCodigo) {
        resultado = resultado.replaceAll(clave, valor);
    }
    return resultado;
}

function copiarTexto() {
    mensaje.select();
    document.execCommand("copy");
    swal("Éxito", "Texto copiado al portapapeles", "success");
}

function ajustarAltura(elemento) {
    elemento.style.height = "auto"; 
    elemento.style.height = elemento.scrollHeight + "px"; 
}
