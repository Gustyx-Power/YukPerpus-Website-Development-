document.addEventListener("DOMContentLoaded", function () {
    let user = JSON.parse(sessionStorage.getItem("loggedUser"));
    if (!user) {
        window.location.href = "index.html";
    } else {
        document.getElementById("user-name").textContent = user.username;
        document.getElementById("user-telegram").textContent = user.telegram;
    }
    loadBooks();
});

function loadBooks() {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    let loans = JSON.parse(localStorage.getItem("loans")) || [];
    let userTable = document.getElementById("book-table");
    let loanTable = document.getElementById("loan-table");

    userTable.innerHTML = `<tr><th>Judul Buku</th><th>Penulis</th><th>Aksi</th></tr>`;
    books.forEach((book, index) => {
        let isBorrowed = loans.find(loan => loan.title === book.title);
        let row = userTable.insertRow();
        row.innerHTML = `<td>${book.title}</td><td>${book.author}</td>
            <td>${isBorrowed ? "<b>Dipinjam</b>" : `<button onclick="borrowBook(${index})">Pinjam</button>`}</td>`;
    });

    loanTable.innerHTML = `<tr><th>Judul Buku</th><th>Penulis</th><th>Aksi</th></tr>`;
    loans.forEach((loan, index) => {
        let row = loanTable.insertRow();
        row.innerHTML = `<td>${loan.title}</td><td>${loan.author}</td>
            <td><button onclick="returnBook(${index})">Kembalikan</button></td>`;
    });
}

function borrowBook(index) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    let loans = JSON.parse(localStorage.getItem("loans")) || [];
    let book = books[index];

    let user = JSON.parse(sessionStorage.getItem("loggedUser"));
    if (!user) {
        alert("Anda harus login!");
        return;
    }

    let existingLoan = loans.find(loan => loan.title === book.title);
    if (existingLoan) {
        alert("Buku ini sudah dipinjam!");
        return;
    }

    loans.push({ title: book.title, author: book.author, user: user.username });
    localStorage.setItem("loans", JSON.stringify(loans));
    alert(`Buku "${book.title}" berhasil dipinjam!`);
    loadBooks();
}

function returnBook(index) {
    let loans = JSON.parse(localStorage.getItem("loans")) || [];
    loans.splice(index, 1);
    localStorage.setItem("loans", JSON.stringify(loans));
    alert("Buku telah dikembalikan!");
    loadBooks();
}

function logout() {
    sessionStorage.clear();
    window.location.href = "index.html";
}
