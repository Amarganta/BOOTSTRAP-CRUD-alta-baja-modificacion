const urlBase = "https://tp-3-c1096-default-rtdb.firebaseio.com/";
var fullUserList = [];
const tableUsers = document.getElementById("users-list");

const createTable = (userList) => {
  const tbody = tableUsers.querySelector("tbody");
  tbody.innerHTML = "";
  for (let prop in userList) {
    const user = userList[prop];
    const tr = document.createElement("tr");
    tbody.appendChild(tr);

    const campos = [user.name, user.email, user.address, user.phone];
    for (campo of campos) {
      const td = document.createElement("td");
      td.innerHTML = campo;
      tr.appendChild(td);
    }
    const botonEliminar = document.createElement("button");
    botonEliminar.className = "btn btn-danger";
    botonEliminar.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
    const td = document.createElement("td");
    botonEliminar.setAttribute("data-toggle", "modal");
    botonEliminar.setAttribute("data-target", "#deleteEmployeeModal");
    botonEliminar.addEventListener("click", () => deleteUser(prop));

    td.appendChild(botonEliminar);
    tr.appendChild(td);
    tbody.appendChild(tr);

    const botonEditar = document.createElement("button");
    botonEditar.className = "btn btn-info";
    botonEditar.innerHTML = `<i class="fa fa-edit" aria-hidden="true"></i>`;
    const td2 = document.createElement("td");
    botonEditar.setAttribute("data-toggle", "modal");
    botonEditar.setAttribute("data-target", "#editEmployeeModal");
    botonEditar.addEventListener("click", () => formInfo(prop));
    td2.appendChild(botonEditar);
    tr.appendChild(td2);
    tbody.appendChild(tr);
  }
};

const getUsers = () => {
  fetch(urlBase + "/users.json")
    .then((response) => response.json())
    .then((data) => {
      fullUserList = data;
      createTable(data);
    })
    .catch((error) => console.log(error));
};
const deleteUser = (id) => {
  fetch(`${urlBase}/users/${id}.json`, {
    method: "DELETE",
  })
    .then((data) => {
      console.log(data);
      $("#deleteEmployeeMododal").modal("hide");
      document.querySelector("#deleteEmployeeMododal").reset();
    })
    .then(() => createTable());

  console.log("Eliminar" + id);
};

const editName = document.getElementById("edit-name");
const editEmail = document.getElementById("edit-email");
const editAddress = document.getElementById("edit-address");
const editPhone = document.getElementById("edit-phone");

const modificarObjeto = () => {
  const name = editName.value;
  const email = editEmail.value;
  const address = editAddress.value;
  const phone = editPhone.value;
  return { name, email, address, phone };
};

const editUser = (e) => {
  e.preventDefault();
  fetch(`${urlBase}/users/${id}.json`, {
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
  // .catch((error) => console.log(error));
};

const formInfo = (id) => {
  fetch(`${urlBase}/users/${id}.json`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log({ editName });
      console.log(data);
      console.log(id);
      editName.value = data.name;
      editEmail.value = data.email;
      editAddress.value = data.address;
      editPhone.value = data.phone;
    });
};

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
/*esta funcion convierte el objeto users que retorna la API en un array de objetos
y le agrega una propiedad ID porque esta se usa para editar y eliminar users y de otro modo
estas funcionalidades se comportarian con errores, como por ejemplo: despues de filtrar no me dejaba eliminar*/
const turnUserListIntoArray = () => {
  let result = [];
  for (let prop in fullUserList) {
    let newElement = fullUserList[prop];
    newElement["id"] = prop;
    result.push(newElement);
  }
  return result;
};
/*esta otra funcion revierte lo anterior para poder obtener la lista de users en el mismo formato que retorna 
la API, es decir un objeto con ID identeficatorios de cada uno*/
const turnArrayofUsersIntoList = (userList) => {
  let result = {};
  userList.forEach((elem) => {
    result[elem["id"]] = fullUserList[elem["id"]];
  });
  return result;
};

$(document).ready(function () {
  getUsers();

  $(document.getElementById("search")).on("keyup", function () {
    let value = $(this).val().toLowerCase();
    let results = turnUserListIntoArray().filter((el) => {
      return el.name.toLowerCase().indexOf(value) > -1;
    });
    createTable(turnArrayofUsersIntoList(results));
  });
});
