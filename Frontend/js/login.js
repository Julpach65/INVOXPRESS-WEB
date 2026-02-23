// Manejador del formulario tradicional
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir recarga de página

    // Obtener datos del formulario
    const correo = document.getElementById("correo").value;
    const contraseña = document.getElementById("contraseña").value;

    // Validar que los campos no estén vacíos
    if (correo === "" || contraseña === "") {
        alert("Por favor, ingresa un correo y una contraseña.");
        return;
    }

    // Enviar datos al backend con fetch (login tradicional)
    fetch("http://localhost:8080/Facturacion/resources/usuarios/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ correo: correo, contraseña: contraseña })  // Enviar los datos como JSON
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);  // Ver la respuesta completa
        if (data.success) {
            alert("Login exitoso");
            window.location.href = "index.html";  // Cambié a "index.html"
        } else {
            alert("Credenciales incorrectas.");
        }
    })
    .catch(error => console.error("Error en login:", error));
});

// Función callback para Google Login
function handleCredentialResponse(response) {
    const data = parseJwt(response.credential); // Decodificar el token JWT

    // Preparar objeto con datos del usuario
    const usuario = {
        nombreUsuario: data.name,
        correo: data.email,
        rol: "cliente", // Asignamos el rol como "cliente" por defecto
        origenAuth: "google", // Identificador de origen de autenticación
        fotoPerfil: data.picture
    };

    // Enviar los datos al backend para registro/inicio de sesión (Google login)
    fetch("http://localhost:8080/Facturacion/resources/usuarios/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)  // Enviar los datos como JSON
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);  // Ver la respuesta completa
        if (data.success) {
            alert("Login exitoso con Google");
            window.location.href = "index.html";  // Cambié a "index.html"
        } else {
            alert("Hubo un problema al iniciar sesión con Google.");
        }
    })
    .catch(error => console.error("Error en Google Login:", error));
}

// Función auxiliar para decodificar el token JWT de Google
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// Hacer una solicitud GET al endpoint de usuarios cuando la página cargue
window.onload = function() {
    fetch("http://localhost:8080/Facturacion/resources/usuarios")
        .then(response => response.json())
        .then(data => {
            console.log(data);  // Ver la lista de usuarios en la consola
            displayUsuarios(data); // Llamar a la función para mostrar los usuarios en el frontend
        })
        .catch(error => console.error('Error al obtener usuarios:', error));
};

// Función para mostrar los usuarios en el frontend
function displayUsuarios(usuarios) {
    const usuariosContainer = document.getElementById("usuariosContainer");
    usuariosContainer.innerHTML = "";  // Limpiar el contenedor antes de agregar nuevos usuarios

    usuarios.forEach(usuario => {
        const userElement = document.createElement("div");
        userElement.classList.add("usuario");
        userElement.innerHTML = `
            <h3>${usuario.nombreUsuario}</h3>
            <p>Email: ${usuario.correo}</p>
            <p>Rol: ${usuario.rol}</p>
            <p><img src="${usuario.fotoPerfil}" alt="${usuario.nombreUsuario}" width="50"></p>
            <hr>
        `;
        usuariosContainer.appendChild(userElement);
    });


    
}


