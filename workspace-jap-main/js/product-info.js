document.addEventListener("DOMContentLoaded", function (e) {
  const enlaceInicioSesion = document.getElementById('inicioSesion').querySelector('a');
  const usuariovalue = localStorage.getItem('usuariovalue');

  if (usuariovalue !== null) {
      enlaceInicioSesion.href = "my-profile.html";
      enlaceInicioSesion.textContent = usuariovalue;
  }

  // Se obtiene el prodID almacenado en el almacenamiento local
  const prodID = localStorage.getItem("ProdID");

  if (prodID) {
      // Realiza una solicitud (fetch) a la API con el prodID para obtener los detalles del producto
      const productoInfoURL = `https://japceibal.github.io/emercado-api/products/${prodID}.json`;

      fetch(productoInfoURL)
          .then(function (response) {
              return response.json();
          })
          .then(function (data) {
              document.getElementById("producto-titulo").textContent = data.name;

              // Crear el botón "Comprar"
              const comprarButton = document.createElement("button");
              comprarButton.id = "comprarButton"; // Asigna un ID al botón
              comprarButton.textContent = "Comprar";
              comprarButton.onclick = function () {
                  // Obtener el producto actual
                  const productoActual = {
                      id: prodID,
                      name: data.name,
                      currency: data.currency,
                      cost: data.cost,
                      count: 1, // Por defecto, se agrega con una cantidad de 1
                      image: data.images[0], // Agregamos la imagen del producto
                  };

                  // Agrega el producto al carrito
                  agregarAlCarrito(productoActual);

                  // Redirige al usuario de vuelta al catálogo
                  window.location.href = "products.html";

                  alert("Producto agregado al carrito");
              };

              document.getElementById("producto-titulo").appendChild(comprarButton);
              document.getElementById("producto-descripcion").textContent = data.description;
              document.getElementById("producto-precio").textContent = `${data.currency} ${data.cost}`;
              document.getElementById("producto-categoria").textContent = `${data.category}`;
              document.getElementById("producto-vendidos").textContent = `${data.soldCount}`;

              // Actualiza las imágenes del producto
              const contenedorImagenes = document.querySelector(".carousel-inner");
              data.images.forEach(function (imageUrl, index) {
                  // Crea un div con la clase "carousel-item" para cada imagen
                  const carouselItemDiv = document.createElement("div");
                  carouselItemDiv.className = "carousel-item";

                  // La primera imagen debe tener la clase "active" para indicar que es la diapositiva inicial
                  if (index === 0) {
                      carouselItemDiv.classList.add("active");
                  }

                  const imgElement = document.createElement("img");
                  imgElement.src = imageUrl;
                  imgElement.className = "d-block w-100"; // Para que las imágenes sean responsive
                  carouselItemDiv.appendChild(imgElement);
                  contenedorImagenes.appendChild(carouselItemDiv);
              });

              // Después de mostrar la información del producto, obtiene y muestra los comentarios
              obtenerYMostrarComentarios(prodID);

              // Obtiene los productos relacionados y los muestra
              const relacionados = data.relatedProducts;
              const divRelacionados = document.getElementById('aCAVANLOSRELACIONADOS');

              for (let i = 0; i < relacionados.length; i++) {
                  const productoRelacionado = relacionados[i];
                  const divCardRelacionado = document.createElement('div');
                  divCardRelacionado.classList.add('card');
                  divCardRelacionado.id = `divcardREL${i}`;

                  const tituloRelacionado = document.createElement('p');
                  tituloRelacionado.textContent = productoRelacionado.name;
                  tituloRelacionado.classList.add('tituloRel');

                  const imagenProductoRelacionado = document.createElement('img');
                  imagenProductoRelacionado.src = productoRelacionado.image;
                  imagenProductoRelacionado.classList.add('card-body');

                  // Asignar el evento "onclick" para redirigir al usuario al producto relacionado
                  divCardRelacionado.onclick = function () {
                      ParallevarmeaproductinfoREL(productoRelacionado.id);
                  };

                  divRelacionados.appendChild(divCardRelacionado);
                  divCardRelacionado.appendChild(tituloRelacionado);
                  divCardRelacionado.appendChild(imagenProductoRelacionado);
              }
          })
          .catch(function (error) {
              console.error("Error al obtener los detalles del producto:", error);
          });
  } else {
      // Maneja el caso en el que no haya un prodID en el almacenamiento local.
      alert("No funcionó");
  }

  // Función para obtener y mostrar los comentarios
  function obtenerYMostrarComentarios(prodID) {
      // Realiza una solicitud (fetch) para obtener los comentarios del producto
      const comentariosURL = `https://japceibal.github.io/emercado-api/products_comments/${prodID}.json`;

      fetch(comentariosURL)
          .then((response) => response.json())
          .then((data) => {
              const ulContenedor = document.getElementById("ulContenedor");
              data.forEach((comment) => {
                  const comentarioCard = document.createElement("div");
                  comentarioCard.className = "card mb-3";

                  const cardHeader = document.createElement("div");
                  cardHeader.className = "card-header";
                  const username = document.createElement("h6");
                  username.className = "card-subtitle text-muted";
                  username.textContent = comment.user;
                  cardHeader.appendChild(username);

                  const commentDate = document.createElement("small");
                  commentDate.className = "text-muted float-end";
                  commentDate.textContent = comment.dateTime;
                  cardHeader.appendChild(commentDate);

                  comentarioCard.appendChild(cardHeader);

                  const cardBody = document.createElement("div");
                  cardBody.className = "card-body";

                  const pComment = document.createElement("p");
                  pComment.className = "card-text";
                  pComment.textContent = comment.description;
                  cardBody.appendChild(pComment);

                  comentarioCard.appendChild(cardBody);

                  const cardFooter = document.createElement("div");
                  cardFooter.className = "card-footer text-muted";

                  const puntuacion = document.createElement("p");
                  puntuacion.innerHTML = "Puntuación: ";
                  for (let i = 1; i <= 5; i++) {
                      const starIcon = document.createElement("i");
                      starIcon.className = `fa fa-star${i <= comment.score ? "" : "-o"}`;
                      puntuacion.appendChild(starIcon);
                  }
                  cardFooter.appendChild(puntuacion);

                  comentarioCard.appendChild(cardFooter);
                  ulContenedor.appendChild(comentarioCard);
              });
          })
          .catch((err) => console.log("Solicitud fallida", err));
  }

  // Función para agregar un producto al carrito
  function agregarAlCarrito(producto) {
      // Recuperar el carrito del localStorage
      const carrito = JSON.parse(localStorage.getItem("CARRITO")) || [];

      // Verificar si el producto ya está en el carrito
      const productoExistente = carrito.find((item) => item.id === producto.id);

      if (productoExistente) {
          // Si el producto ya está en el carrito, aumentar la cantidad
          productoExistente.count += 1;
      } else {
          // Si el producto no está en el carrito, agregarlo
          carrito.push(producto);
      }

      // Guardar el carrito actualizado en el localStorage dentro de "CARRITO"
      localStorage.setItem("CARRITO", JSON.stringify(carrito));
  }
});

