let signUp = document.getElementById("signUp");
let signIn = document.getElementById("signIn");
let nameInput = document.getElementById("nameInput");
let title = document.getElementById("tittle"); // Cambié "title" a "tittle" para coincidir con el ID del HTML.

signIn.onclick = function () {
  nameInput.style.maxHeight = "0"; // Oculta el campo de nombre
  title.innerHTML = "Login"; // Cambia el título a "Login"
  signUp.classList.add("disable"); // Deshabilita el botón de registro
  signIn.classList.remove("disable"); // Habilita el botón de login
};

signUp.onclick = function () {
  nameInput.style.maxHeight = "60px"; // Muestra el campo de nombre
  title.innerHTML = "Registro"; // Cambia el título a "Registro"
  signUp.classList.remove("disable"); // Habilita el botón de registro
  signIn.classList.add("disable"); // Deshabilita el botón de login
};

let submitBtn = document.getElementById("submitBtn");
let nameField = document.querySelector("#nameInput input");
let emailField = document.querySelector(".input-field input[type='email']");
let passwordField = document.querySelector(
  ".input-field input[type='password']"
);

submitBtn.onclick = function () {
  let formData = {};

  // Validación de campos
  if (nameInput.style.maxHeight === "60px") {
    // Si el campo de nombre está visible (es un registro)
    if (
      nameField.value.trim() === "" ||
      emailField.value.trim() === "" ||
      passwordField.value.trim() === ""
    ) {
      alert("Por favor, completa todos los campos.");
    } else {
      // Si los campos son válidos, recopilamos los datos
      formData = {
        name: nameField.value.trim(),
        email: emailField.value.trim(),
        password: passwordField.value.trim(),
      };

      // Mostrar los datos en el objeto resultBox
      document.getElementById("userName").innerText =
        "Nombre: " + formData.name;
      document.getElementById("userEmail").innerText =
        "Correo: " + formData.email;
      document.getElementById("userPassword").innerText =
        "Contraseña: " + formData.password;

      // Cambiar el mensaje de acuerdo a si es un registro
      document.getElementById("thankYouMessage").innerText =
        "Usted se ha registrado correctamente";

      // Mostrar la imagen
      document.getElementById("resultImage").style.display = "block";

      // Mostrar el cuadro con los datos
      document.getElementById("resultBox").style.display = "block";

      // Opcional: Puedes ocultar el formulario después de enviar
      document.querySelector("form").style.display = "none";

      alert("Formulario enviado correctamente.");
    }
  } else {
    // Si el campo de nombre está oculto (es un login)
    if (emailField.value.trim() === "" || passwordField.value.trim() === "") {
      alert("Por favor, completa todos los campos.");
    } else {
      // Si los campos son válidos, recopilamos los datos
      formData = {
        email: emailField.value.trim(),
        password: passwordField.value.trim(),
      };

      // Mostrar los datos en el objeto resultBox
      document.getElementById("userEmail").innerText =
        "Correo: " + formData.email;
      document.getElementById("userPassword").innerText =
        "Contraseña: " + formData.password;

      // Cambiar el mensaje de acuerdo a si es un login
      document.getElementById("thankYouMessage").innerText =
        "Usted ha iniciado sesión correctamente";

      // Mostrar la imagen
      document.getElementById("resultImage").style.display = "block";

      // Mostrar el cuadro con los datos
      document.getElementById("resultBox").style.display = "block";

      // Opcional: Puedes ocultar el formulario después de enviar
      document.querySelector("form").style.display = "none";

      alert("Formulario enviado correctamente.");
    }
  }
};

// Función para cargar productos desde el archivo JSON
async function cargarProductos() {
  const response = await fetch("productos.json");
  const productos = await response.json();

  const productosContainer = document.getElementById("productos-container");

  productos.forEach((producto) => {
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("producto");

    productoDiv.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <p>Precio: $${producto.precio}</p>
      <button class="agregar-carrito" data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Agregar al carrito</button>
    `;

    productosContainer.appendChild(productoDiv);
  });
}

// Función para cargar el carrito desde localStorage
function cargarCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const carritoLista = document.getElementById("carrito-lista");
  const totalElement = document.getElementById("total");

  carritoLista.innerHTML = ""; // Limpiar el carrito antes de recargarlo
  let total = 0;

  carrito.forEach((item) => {
    const itemLi = document.createElement("li");
    itemLi.innerHTML = `${item.nombre} - $${item.precio} <button class="eliminar-item" data-id="${item.id}">Eliminar</button>`;
    carritoLista.appendChild(itemLi);
    total += item.precio;
  });

  totalElement.textContent = total;
}

// Función para agregar un producto al carrito
function agregarAlCarrito(event) {
  const button = event.target;
  const id = button.getAttribute("data-id");
  const nombre = button.getAttribute("data-nombre");
  const precio = parseFloat(button.getAttribute("data-precio"));

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const itemEnCarrito = carrito.find((item) => item.id === id);

  if (itemEnCarrito) {
    itemEnCarrito.cantidad++;
  } else {
    carrito.push({
      id,
      nombre,
      precio,
      cantidad: 1,
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  cargarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(event) {
  const button = event.target;
  const id = button.getAttribute("data-id");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito = carrito.filter((item) => item.id !== id);

  localStorage.setItem("carrito", JSON.stringify(carrito));
  cargarCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
  localStorage.removeItem("carrito");
  cargarCarrito();
}

// Función para manejar la compra
function comprarCarrito() {
  alert("¡Compra realizada con éxito!");
  localStorage.removeItem("carrito");
  cargarCarrito();
}

// Eventos
document
  .getElementById("productos-container")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("agregar-carrito")) {
      agregarAlCarrito(event);
    }
  });

document
  .getElementById("carrito-lista")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("eliminar-item")) {
      eliminarDelCarrito(event);
    }
  });

document
  .getElementById("vaciarCarrito")
  .addEventListener("click", vaciarCarrito);
document
  .getElementById("comprarCarrito")
  .addEventListener("click", comprarCarrito);

// Cargar los productos y el carrito cuando se cargue la página
window.onload = function () {
  cargarProductos();
  cargarCarrito();
};
