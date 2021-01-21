const urlBase = "https://tp-3-c1096-default-rtdb.firebaseio.com/";

const tableUsers = document.getElementById("users-list");
const createTable = () => {
  fetch(urlBase + "/users.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const tbody = tableUsers.querySelector("tbody");
      tbody.innerHTML = "";

      for (let prop in data) {
        const user = data[prop];
        const tr = document.createElement("tr");

        // const checkBox = document.createElement('span');
        // const input = document.createElement('input');
        // input.type = 'checkbox'
        // input.className = 'custom-checkbox';
        // const td2 = document.createElement('td');
        // checkBox.appendChild(input);
        // // input.appendChild(td2);
        // td2.appendChild(checkBox);
        // tr.appendChild(td2);
        // tbody.appendChild(tr)

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
    })
    //
    .catch((error) => console.log(error));
};

const editarObjeto = () => {};

const deleteUser = (id) => {
  fetch(`${urlBase}/users/${id}.json`, {
    method: "DELETE",
  })
    .then((data) => {
      console.log(data);
      $("#deleteEmployeeMododal").modal("hide");
      document.querySelector("#deleteEmployeeMododal");
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
    .then(() => createTable());
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

createTable();
