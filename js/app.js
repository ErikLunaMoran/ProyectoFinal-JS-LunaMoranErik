const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

/* Carrito vacío o lo que esté guardado en el Local Storage*/

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/* funcion asincrona */
const getProducts = async () => {
  const response = await fetch("data.json");
  const data = await response.json();

  data.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    {
      content.innerHTML = `<div class="card-header">
    <img src="${product.img}">
    </div>
  
    <div class="card-body">
    <h3 class="card-title">${product.titulo}</h3>
    <p class="card-description">$ ${product.precio}</p>
    </div>
    `;
    }

    /* <a href="#" id="comprar" class="btn">Comprar</a> */
    shopContent.append(content);

    /* Botón */
    let comprar = document.createElement("button");
    comprar.innerText = "Comprar";
    comprar.className = "btn";

    content.append(comprar);

    comprar.addEventListener("click", () => {
      /* alerta de que se agregó correctamente al carrito */
      swal("Perfecto", "Se ha añadido al carrito ;)!", "success");

      /* Checkeo que el producto no esté repetido */
      const repeat = carrito.some(
        (repeatProduct) => repeatProduct.id === product.id
      );
      console.log(repeat);

      /* si se repite detecto el id y sumo +1 a cantidad*/
      if (repeat) {
        carrito.map((prod) => {
          if (prod.id === product.id) {
            prod.cantidad++;
          }
        });
      } else {
        /* Pusheo producto en el carrito */
        carrito.push({
          id: product.id,
          img: product.img,
          titulo: product.titulo,
          precio: product.precio,
          cantidad: product.cantidad,
        });
        console.log(carrito);
        console.log(carrito.length);
        carritoCounter();
        saveLocal();
      }
    });
  });
};

getProducts();
/* Recorrido de Productos */

/* Local Storage */
/* seteo items  a guardar*/
const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

/* get item */
