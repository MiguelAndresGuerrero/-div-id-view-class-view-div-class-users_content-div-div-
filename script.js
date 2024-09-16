// Modularizado
class AddTittlee extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <div class="container mt-5">
            <div class="text-center">
                <h2>Live User Filter</h2>
                <p>Search by name and/or location</p>
            </div>
            <div class="mb-3">
                <input type="text" id="Search" class="form-control" placeholder="Search by name or ID">
            </div>
        </div>
        `
    }
}
customElements.define('container-uno',AddTittlee);

class AddTittlee2 extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div id="view" class="view">
                <div class="users_content"></div>
            </div>
        `
    }
}
customElements.define('conteiner-dos',AddTittlee2);

function search_ID() {
    let search = document.getElementById("Search").value.trim();
    if (search === "") {
        return;
    }

    let URL;

    // Si es un número, asumimos que es una búsqueda por ID
    if (!isNaN(search)) {
        URL = `https://66df33d5de4426916ee3e11d.mockapi.io/Filter_Users/${search}`;
    } else {
        // Si es texto, hacemos búsqueda por nombre
        URL = `https://66df33d5de4426916ee3e11d.mockapi.io/Filter_Users?name_full=${search}`;
    }

    fetch(URL)
        .then(res => res.json())
        .then(data => {

            // Si es una búsqueda por nombre
            if (Array.isArray(data)) {
                if (data.length === 0) {
                    document.getElementById("view").innerHTML = `<p>No se encontraron usuarios</p>`;
                    return;
                }

                // Limpiar el contenedor de vista
                let UsersHTML = '<ul class="list-group">';

                //Busqueda por Nombre
                data.forEach(user => {
                    UsersHTML += `
                    <div class="blue2">
                        <img id="characterImage" src="${user.avatar}" class="img-thumbnail mb-3" alt="${user.name_full}">
                        <table class="table table-striped">
                            <tr class="Name"><th scope="col">Nombre: </th><td>${user.name_full}</td></tr>
                            <tr class="Descripcion"><th scope="col">Descripción: </th><td>${user.description}</td></tr>
                            <tr class="ID"><th scope="col">ID: </th><td>${user.id}</td></tr>
                        </table>
                    </div>
                    `;
                });

                UsersHTML += '</ul>';
                document.getElementById("view").innerHTML = UsersHTML;

            } else {

                if (!data.name_full) {
                    document.getElementById("view").innerHTML = `<p>Usuario no encontrado</p>`;
                    return;
                }
                //Busqueda por ID
                let UsersHTML = `
                <div class="blue">    
                        <h2>${data.name_full}</h2>
                        <img id="characterImage" src="${data.avatar}" class="img-thumbnail mb-3" alt="${data.name_full}">
                    <table class="table table-striped">
                        <tr><th scope="col">Nombre: </th><td>${data.name_full}</td></tr>
                        <tr><th scope="col">Descripción: </th><td>${data.description}</td></tr>
                        <tr><th scope="col">ID: </th><td>${data.id}</td></tr>
                    </table>
                </div>
                `;
                document.getElementById("view").innerHTML = UsersHTML;
            }
        })
        .catch(error => {
            document.getElementById("view").innerHTML = `<p>Error al buscar usuario.</p>`;
            console.error('Error al buscar usuario:', error);
        });
}

// Búsqueda en tiempo real al escribir
document.getElementById("Search").addEventListener("input", function () {
    search_ID();
});
