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

