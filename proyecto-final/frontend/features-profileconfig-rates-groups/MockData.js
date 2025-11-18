// --- Pseudo DB ---
let usersDB = JSON.parse(localStorage.getItem('usersDB')) || [];

// --- Capturar el evento del formulario ---
document.getElementById("form1").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que se recargue la página

    // Capturar los datos del formulario
    const user = {
        id: Date.now(),
        nickname: document.getElementById("nickname").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        password: document.getElementById("password").value,
        name: document.getElementById("name").value,
        lastname: document.getElementById("lastname").value,
        postalCode: document.getElementById("postalCode").value,
        birthDate: document.getElementById("birthDate").value,
        interests: Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(i => i.value),
        newsletter: document.querySelector("input[name=newsletter]:checked")?.value || "none"
    };

    // Guardar el usuario en la pseudo DB
    usersDB.push(user);

    // Guardar el array completo en localStorage
    localStorage.setItem("usersDB", JSON.stringify(usersDB));

    // Redirigir a la página de datos
    window.location.href = "data.html";
});