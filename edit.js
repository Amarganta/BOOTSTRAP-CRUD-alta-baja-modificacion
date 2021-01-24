const editName = document.getElementById("edit-name");
const editEmail = document.getElementById("edit-email");
const editAddress = document.getElementById("edit-address");
const editPhone = document.getElementById("edit-phone");
const editid = document.getElementById("userid");

const validateEditName = () => {
  let name = document.getElementById("edit-name").value;
  return name.length <= 50;
};

const validateEditAddress = () => {
  let address = document.getElementById("edit-address").value;
  return address.length <= 60;
};

const validateEditEmail = () => {
  let email = document.getElementById("edit-email").value;
  emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  //Se muestra un texto a modo de ejemplo, luego va a ser un icono
  return emailRegex.test(email);
};
const validateEditNumber = () => {
  let number = document.getElementById("edit-phone").value;
  numberRegex = /[0-9-]+$/i;
  return numberRegex.test(number);
};

const modificarObjeto = () => {
  const name = editName.value;
  const email = editEmail.value;
  const address = editAddress.value;
  const phone = editPhone.value;
  return {
    name,
    email,
    address,
    phone
  };
};

const editUser = (e) => {
  e.preventDefault();
  if (
    validateEditAddress() &&
    validateEditEmail() &&
    validateEditName() &&
    validateEditNumber()
  ) {
    fetch(`${urlBase}/users/${editid.value}.json`, {
        method: "PATCH",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(modificarObjeto()),
      })
      .then((data) => {
        console.log(data);
        $("#editEmployeeModal").modal("hide");
        document.querySelector("#editEmployeeModal");
      })
      .then(() => getUsers());
  } else {
    alert("No se puede completar la solicitud,verifique los datos ingresados")
  }
};

const formInfo = (id) => {
  fetch(`${urlBase}/users/${id}.json`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      editName.value = data.name;
      editEmail.value = data.email;
      editAddress.value = data.address;
      editPhone.value = data.phone;
      editid.value = id;
    });
};

edicion.addEventListener("submit", editUser);