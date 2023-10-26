const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function setCatID(id) {
    localStorage.setItem("catID", id);
    window.location = "products.html"
}

function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))){

            htmlContentToAppend += `
            <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${category.imgSrc}" alt="${category.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${category.name}</h4>
                            <small class="text-muted">${category.productCount} artículos</small>
                        </div>
                        <p class="mb-1">${category.description}</p>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    const catID = localStorage.getItem("catID");

    getJSONData(CATEGORIES_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data
            showCategoriesList()
            //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    // Modificar la solicitud de productos para usar el catID
    getJSONData(PRODUCTS_URL + "?category=" + catID).then(function(productsResultObj) {
        if (productsResultObj.status === "ok") {
            // Manejar la lista de productos de la categoría seleccionada
            // Puedes utilizar productsResultObj.data para mostrar la lista de productos.
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList();
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