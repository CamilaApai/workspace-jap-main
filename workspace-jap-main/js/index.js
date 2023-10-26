document.addEventListener("DOMContentLoaded",function(){
   
  document.getElementById("autos").addEventListener("click", function() {
      localStorage.setItem("catID", 101);
      window.location = "products.html";
  });
  document.getElementById("juguetes").addEventListener("click", function() {
      localStorage.setItem("catID", 102);
      window.location = "products.html";
  });
  document.getElementById("muebles").addEventListener("click", function() {
      localStorage.setItem("catID", 103);
      window.location = "products.html";
  });

 
  let usuarioInicioSesion = localStorage.getItem("usuarioInicioSesion");
  
  if (!usuarioInicioSesion) {
      window.location.href = "login.html"; 
  }

 
  const enlaceInicioSesion = document.getElementById('inicioSesion').querySelector('a');
  const usuariovalue = localStorage.getItem('usuariovalue');
  if (usuariovalue !== null) {
      enlaceInicioSesion.href = "my-profile.html" 
      enlaceInicioSesion.textContent = usuariovalue;
  }

});


// Agrega un evento de click para cerrar sesión.
const cerrarSesionLink = document.getElementById("cerrarSesion");
cerrarSesionLink.addEventListener("click", function(event) {
  // Evita que el evento predeterminado del clic se produzca.
  event.preventDefault();

  // Elimina la información de autenticación del localStorage.
  localStorage.removeItem("usuarioInicioSesion");
  localStorage.removeItem("usuariovalue");

  // Redirecciona a la página de inicio de sesión (login.html).
  window.location.href = "login.html";
});


// Función de modo día/noche
document.addEventListener("DOMContentLoaded", function() {
const body = document.body;
const logoImage = document.getElementById('logoImage'); // Elemento de la imagen del logo
const logoDaySrc = 'logo-day.png'; // Ruta de la imagen para el modo día
const logoNightSrc = 'logo-night.png'; // Ruta de la imagen para el modo noche

// Obtiene el estado actual del modo día/noche usando localStorage
let currentMode = localStorage.getItem('mode') || 'light';

// Aplica el estado almacenado
if (currentMode === 'dark') {
  body.classList.add("noche");
  // Cambia la imagen del logo a la versión nocturna y ajusta el ancho y alto
  logoImage.src = logoNightSrc;
  logoImage.width = 170; // Ancho deseado
  logoImage.height = 70; // Alto deseado
}

// Evento para cambiar entre día y noche 
const modoToggle = document.getElementById('modo-toggle');
modoToggle.addEventListener('click', function() {
  body.classList.toggle('noche');
  // Actualiza el estado en el localStorage
  currentMode = currentMode === 'light' ? 'dark' : 'light';
  localStorage.setItem('mode', currentMode);

  // Cambia la imagen del logo según el modo seleccionado y ajusta el ancho y alto
  if (currentMode === 'light') {
    logoImage.src = logoDaySrc; // Cambia a la versión diurna
    logoImage.width = 170; // Ancho deseado
    logoImage.height = 70; // Alto deseado
  } else if (currentMode === 'dark') {
    logoImage.src = logoNightSrc; // Cambia a la versión nocturna
    logoImage.width = 170; // Ancho deseado
    logoImage.height = 70; // Alto deseado
  }
});
});
