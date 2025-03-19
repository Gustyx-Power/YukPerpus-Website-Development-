function openModal(id) {
    document.getElementById(id).style.display = "flex";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

function showRegister() {
    closeModal('userModal');
    openModal('registerModal');
}

// Fungsi Login User
function loginUser() {
    let username = document.getElementById("userUsername").value;
    let password = document.getElementById("userPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.username === username && u.password === password);

    if (user) {
        alert("Login berhasil!");
        sessionStorage.setItem("loggedUser", JSON.stringify(user));
        window.location.href = "user.html";
    } else {
        alert("Username atau password salah!");
    }
}

// Fungsi Login Admin
function loginAdmin() {
    let username = document.getElementById("adminUsername").value;
    let password = document.getElementById("adminPassword").value;

    if (username === "admin" && password === "admin123") {
        alert("Login Admin Berhasil!");
        sessionStorage.setItem("loggedAdmin", "true");
        window.location.href = "admin.html";
    } else {
        alert("Username atau Password Salah!");
    }
}

// Fungsi Pendaftaran User
function registerUser() {
    let username = document.getElementById("registerUsername").value;
    let password = document.getElementById("registerPassword").value;
    let telegram = document.getElementById("registerTelegram").value;

    if (username && password && telegram) {
        let users = JSON.parse(localStorage.getItem("users")) || [];

        let existingUser = users.find(user => user.username === username);
        if (existingUser) {
            alert("Username sudah terdaftar! Gunakan username lain.");
            return;
        }

        users.push({ username, password, telegram });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Pendaftaran Berhasil! Silakan login.");
        closeModal('registerModal');
        openModal('userModal');
    } else {
        alert("Harap isi semua data!");
    }
}
