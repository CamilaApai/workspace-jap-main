let productCost = 0;
let productCount = 0;
let comissionPercentage = 0.13;
let MONEY_SYMBOL = "$";
let DOLLAR_CURRENCY = "Dólares (USD)";
let PESO_CURRENCY = "Pesos Uruguayos (UYU)";
let DOLLAR_SYMBOL = "USD ";
let PESO_SYMBOL = "UYU ";
let PERCENTAGE_SYMBOL = '%';
let MSG = "FUNCIONALIDAD NO IMPLEMENTADA";

//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts(){
    let unitProductCostHTML = document.getElementById("productCostText");
    let comissionCostHTML = document.getElementById("comissionText");
    let totalCostHTML = document.getElementById("totalCostText");

    let unitCostToShow = MONEY_SYMBOL + productCost;
    let comissionToShow = Math.round((comissionPercentage * 100)) + PERCENTAGE_SYMBOL;
    let totalCostToShow = MONEY_SYMBOL + ((Math.round(productCost * comissionPercentage * 100) / 100) + parseInt(productCost));

    unitProductCostHTML.innerHTML = unitCostToShow;
    comissionCostHTML.innerHTML = comissionToShow;
    totalCostHTML.innerHTML = totalCostToShow;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("productCountInput").addEventListener("change", function(){
        productCount = this.value;
        updateTotalCosts();
    });

    document.getElementById("productCostInput").addEventListener("change", function(){
        productCost = this.value;
        updateTotalCosts();
    });

    document.getElementById("goldradio").addEventListener("change", function(){
        comissionPercentage = 0.13;
        updateTotalCosts();
    });
    
    document.getElementById("premiumradio").addEventListener("change", function(){
        comissionPercentage = 0.07;
        updateTotalCosts();
    });

    document.getElementById("standardradio").addEventListener("change", function(){
        comissionPercentage = 0.03;
        updateTotalCosts();
    });

    document.getElementById("productCurrency").addEventListener("change", function(){
        if (this.value == DOLLAR_CURRENCY)
        {
            MONEY_SYMBOL = DOLLAR_SYMBOL;
        } 
        else if (this.value == PESO_CURRENCY)
        {
            MONEY_SYMBOL = PESO_SYMBOL;
        }

        updateTotalCosts();
    });


    //Configuraciones para el elemento que sube archivos
    let dzoptions = {
        url:"/",
        autoQueue: false
    };
    let myDropzone = new Dropzone("div#file-upload", dzoptions);    


    //Se obtiene el formulario de publicación de producto
    let sellForm = document.getElementById("sell-info");

    //Se agrega una escucha en el evento 'submit' que será
    //lanzado por el formulario cuando se seleccione 'Vender'.
    sellForm.addEventListener("submit", function(e){

        e.preventDefault(); 
        e.preventDefault();

        let productNameInput = document.getElementById("productName");
        let productCategory = document.getElementById("productCategory");
        let productCost = document.getElementById("productCostInput");
        let infoMissing = false;

        //Quito las clases que marcan como inválidos
        productNameInput.classList.remove('is-invalid');
        productCategory.classList.remove('is-invalid');
        productCost.classList.remove('is-invalid');

        //Se realizan los controles necesarios,
        //En este caso se controla que se haya ingresado el nombre y categoría.
        //Consulto por el nombre del producto
        if (productNameInput.value === "")
        {
            productNameInput.classList.add('is-invalid');
            infoMissing = true;
        }
        
        //Consulto por la categoría del producto
        if (productCategory.value === "")
        {
            productCategory.classList.add('is-invalid');
            infoMissing = true;
        }

        //Consulto por el costo
        if (productCost.value <=0)
        {
            productCost.classList.add('is-invalid');
            infoMissing = true;
        }
        
        if(!infoMissing)
        {
            //Aquí ingresa si pasó los controles, irá a enviar
            //la solicitud para crear la publicación.

            getJSONData(PUBLISH_PRODUCT_URL).then(function(resultObj){
                let msgToShowHTML = document.getElementById("resultSpan");
                let msgToShow = "";
    
                //Si la publicación fue exitosa, devolverá mensaje de éxito,
                //de lo contrario, devolverá mensaje de error.
                //FUNCIONALIDAD NO IMPLEMENTADA
                if (resultObj.status === 'ok')
                {
                    msgToShow = MSG;
                    document.getElementById("alertResult").classList.add('alert-primary');
                }
                else if (resultObj.status === 'error')
                {
                    msgToShow = MSG;
                    document.getElementById("alertResult").classList.add('alert-primary');
                }
    
                msgToShowHTML.innerHTML = msgToShow;
                document.getElementById("alertResult").classList.add("show");
            });
        }
    });

    // Evento que se ejecuta cuando la página se ha cargado completamente

    let usuarioInicioSesion = localStorage.getItem("usuarioInicioSesion");
    
    if (!usuarioInicioSesion) {
        window.location.href = "login.html"; 
    }

   
    const enlaceInicioSesion = document.getElementById('inicioSesion').querySelector('a');
    const usuariovalue = localStorage.getItem('usuariovalue');
    if (usuariovalue !== null) {
       
        enlaceInicioSesion.textContent = usuariovalue;
    }





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

    

    
});