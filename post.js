// const urlBase = 'https://tp-3-c1096-default-rtdb.firebaseio.com/';

const btn = document.getElementById('add-btn');
const formulario = document.getElementById('form-add-user');
const addName = document.getElementById('add-name');
const addEmail = document.getElementById('add-email');
const addAddress = document.getElementById('add-address');
const addPhone = document.getElementById('add-phone');

const params = new URLSearchParams(window.location.search)
// for (const param of params) {
//     console.log(param)
// }
// si id null quiere decir que un POST
// sino tengo que hacer un Patch
const id = params.get('name');

const mostrarInfo = (data) => {
    addName.value = data.user;
    addEmail.value = data.email;
    addAddress.value = data.address;
    addPhone.value = data.phone;
}

const user = () => {
    fetch(urlBase + '/users/' + '.json')
    .then(response => response.json())
    .then(data => {
        mostrarInfo(data)
    })
    .catch(error => console.log(error))
}
if (id) {
    user()
}
const method = id ? "PATCH" : "POST";
const url = `${urlBase}/users${id ? `/${id}` : ""}.json`;

const crearObjeto = () => {
    const name = addName.value;
    const email = addEmail.value;
    const address = addAddress.value;
    const phone = addPhone.value;

    return {name, email, address, phone}
}

const registrarUsuario = (e) => {
    e.preventDefault();
    fetch(url, {
        method,
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(crearObjeto())
    })
    .then(response => {
        console.log(response);
        return response.json()
    })
    .then(data => console.log(data))
    .catch(error => console.log(error))
}
formulario.addEventListener('submit', registrarUsuario);