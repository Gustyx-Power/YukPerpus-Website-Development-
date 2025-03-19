document.addEventListener("DOMContentLoaded", function () {
    if (!sessionStorage.getItem("loggedAdmin")) {
        window.location.href = "index.html";
    }
    loadBooks();
});

function loadBooks() {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    let adminTable = document.getElementById("admin-book-table");

    adminTable.innerHTML = `<tr><th>Judul Buku</th><th>Penulis</th><th>Aksi</th></tr>`;
    books.forEach((book, index) => {
        let row = adminTable.insertRow();
        row.innerHTML = `<td>${book.title}</td><td>${book.author}</td>
            <td><button onclick="deleteBook(${index})">Hapus</button></td>`;
    });
}

function addBook() {
    let title = document.getElementById("new-title").value;
    let author = document.getElementById("new-author").value;

    if (!title || !author) {
        alert("Judul dan Penulis harus diisi!");
        return;
    }

    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.push({ title, author });
    localStorage.setItem("books", JSON.stringify(books));
    alert("Buku berhasil ditambahkan!");
    loadBooks();
}

function deleteBook(index) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    alert("Buku berhasil dihapus!");
    loadBooks();
}

function logout() {
    sessionStorage.clear();
    window.location.href = "index.html";
}
