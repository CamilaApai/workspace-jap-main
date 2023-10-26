// Espera a que el DOM esté completamente cargado antes de ejecutar el código.
document.addEventListener("DOMContentLoaded", function() {
    // Obtiene la referencia al elemento del botón mediante su ID.
    let boton = document.getElementById("botoncito");
    // Obtiene la referencia al campo de entrada del usuario mediante su ID.
    let inputUsuario = document.getElementById("inputUsuario"); 
    // Obtiene la referencia al campo de entrada de la contraseña mediante su ID.
    let inputContraseña = document.getElementById("inputContraseña");
    let alertaMostrada = false;
    // Agrega un evento de clic al botón.
    boton.addEventListener("click", function(event) {
        // Evita que el evento predeterminado del clic del botón se produzca (en este caso, el envío del formulario).
        event.preventDefault();

        // Comprueba si ambos campos, de usuario y contraseña, no están vacíos.
        if ((inputUsuario.value !== "") && (inputContraseña.value !== "")) {
            // Si ambos campos están completos, redirige al usuario a la página "index.html".
            window.location.href = "index.html";
        } else {
            // Si al menos uno de los campos está vacío, muestra una alerta para informar al usuario.
            if(!alertaMostrada) {
                const pAlerta = document.createElement("p");
                pAlerta.textContent = "Necesitas rellenar ambos campos de datos!";
                alertaContainer.appendChild(pAlerta);
                alertaMostrada = true;
                }
            }
        // Verifica si se ha ingresado un valor en el campo de usuario y en el campo de contraseña
        if (inputUsuario.value !== "" && inputContraseña.value !== "") {
        // Si ambos campos tienen valores no vacíos, procede a marcar al usuario como "inició sesión"
         // Almacena en el almacenamiento local (localStorage) un indicador de que el usuario inició sesión
        localStorage.setItem("usuarioInicioSesion", "true");
        localStorage.setItem('usuariovalue', inputUsuario.value);
        }
    });
});
