const urlBase = 'https://tp-3-c1096-default-rtdb.firebaseio.com/';

const tableUsers = document.getElementById('users-list');
const createTable = () => {
    fetch(urlBase + '/users.json')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const tbody = tableUsers.querySelector('tbody');
        tbody.innerHTML = '';
        
        for(let prop in data) {
            const user = data[prop];
            const tr = document.createElement('tr');

            const checkBox = document.createElement('span');
            const input = document.createElement('input');
            input.type = 'checkbox'
            input.className = 'custom-checkbox';
            const td2 = document.createElement('td');
            checkBox.appendChild(input);
            // input.appendChild(td2);
            td2.appendChild(checkBox);
            tr.appendChild(td2);
            tbody.appendChild(tr)
            
            const campos = [user.name, user.email, user.address, user.phone]
            for(campo of campos) {

                const td = document.createElement('td');
                td.innerHTML = campo;
                tr.appendChild(td);
                
            }
            

            const botonEliminar = document.createElement('button');
                botonEliminar.className = 'btn btn-danger';
                botonEliminar.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
                const td = document.createElement('td');
                botonEliminar.addEventListener('click', () => deleteUser(prop))

                td.appendChild(botonEliminar);
                tr.appendChild(td);
                tbody.appendChild(tr);
            
        }
    })            
    .catch((error => console.log(error)))

}
const deleteUser = (id) => {
    fetch(`${urlBase}/users/${id}.json`, {
        method: 'DELETE',
    }).then(() => createTable())

    console.log('Eliminar' + id)
}
createTable();