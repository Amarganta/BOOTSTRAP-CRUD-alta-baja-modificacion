// const urlBase = 'https://tp-3-c1096-default-rtdb.firebaseio.com/';

const btn = document.getElementById("add-btn");
const formulario = document.getElementById("form-add-user");
const edicion = document.getElementById("form-edit-user");
const addName = document.getElementById("add-name");
const addEmail = document.getElementById("add-email");
const addAddress = document.getElementById("add-address");
const addPhone = document.getElementById("add-phone");

const validateName = () => {
  let name = document.getElementById("add-name").value;
  return name.length <= 50;
};

const validateAddress = () => {
  let address = document.getElementById("add-address").value;
  return address.length <= 60;
};

const validateEmail = () => {
  let email = document.getElementById("add-email").value;
  emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  //Se muestra un texto a modo de ejemplo, luego va a ser un icono
  return emailRegex.test(email);
};
const validateNumber = () => {
  let number = document.getElementById("add-phone").value;
  numberRegex = /[0-9-]+$/i;
  return numberRegex.test(number);
};

const mostrarInfo = (data) => {
  addName.value = data.user;
  addEmail.value = data.email;
  addAddress.value = data.address;
  addPhone.value = data.phone;
};

const crearObjeto = () => {
  const name = addName.value;
  const email = addEmail.value;
  const address = addAddress.value;
  const phone = addPhone.value;

  return {
    name,
    email,
    address,
    phone
  };
};

const registrarUsuario = (e) => {
  e.preventDefault();
  if (
    validateAddress() &&
    validateEmail() &&
    validateName() &&
    validateNumber()
  ) {
    fetch(`${urlBase}/users.json`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(crearObjeto()),
      })
      .then((data) => {
        console.log(data);
        $("#addEmployeeModal").modal("hide");
        document.querySelector("#addEmployeeModal form").reset();
      })
      .then(() => getUsers())
      .catch((error) => console.log(error));
  } else {
    alert("No es posible completar registro, verifique los datos ingresados");
  }
};
formulario.addEventListener("submit", registrarUsuario);