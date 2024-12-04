class Book {
  constructor(name, author, pages, isRead = false) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(index) {
    this.books.splice(index, 1);
  }

  toggleReadStatus(index) {
    const book = this.books[index];
    if (book) {
      book.isRead = !book.isRead;
    }
  }
}

const myLibrary = new Library();

const testBooks = [
  {
    name: "Harry Potter 1",
    author: "Joanne Rowling",
    pages: 217,
    isRead: true,
  },
  {
    name: "Harry Potter 2",
    author: "Joanne Rowling",
    pages: 280,
    isRead: true,
  },
  {
    name: "Harry Potter 3",
    author: "Joanne Rowling",
    pages: 311,
    isRead: true,
  },
  {
    name: "Harry Potter 4",
    author: "Joanne Rowling",
    pages: 444,
    isRead: true,
  },
  {
    name: "Harry Potter 5",
    author: "Joanne Rowling",
    pages: 780,
    isRead: true,
  },
];

testBooks.forEach((bookData) => {
  myLibrary.addBook(new Book(bookData.name, bookData.author, bookData.pages, bookData.isRead));
});

const table = document.querySelector("table tbody");

function addBookToTable(book, index) {
  const newRow = document.createElement("tr");

  const newCellName = document.createElement("td");
  const newCellAuthor = document.createElement("td");
  const newCellPages = document.createElement("td");
  const newCellRead = document.createElement("td");
  const newCellActions = document.createElement("td");

  newCellName.textContent = book.name;
  newCellAuthor.textContent = book.author;
  newCellPages.textContent = book.pages;
  newCellRead.textContent = book.isRead ? "Yes" : "No";

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", () => {
    newRow.remove();
    myLibrary.removeBook(index);
    refreshTable();
  });

  const changeStatusButton = document.createElement("button");
  changeStatusButton.textContent = "Change status";
  changeStatusButton.addEventListener("click", () => {
    myLibrary.toggleReadStatus(index);
    newCellRead.textContent = book.isRead ? "Yes" : "No";
  });

  newCellActions.appendChild(removeButton);
  newCellActions.appendChild(changeStatusButton);

  newRow.appendChild(newCellName);
  newRow.appendChild(newCellAuthor);
  newRow.appendChild(newCellPages);
  newRow.appendChild(newCellRead);
  newRow.appendChild(newCellActions);

  table.appendChild(newRow);
}

function refreshTable() {
  table.innerHTML = "";
  myLibrary.books.forEach((book, index) => addBookToTable(book, index));
}

refreshTable();

const button = document.querySelector("#addBook");
const dialog = document.querySelector("#dialogForm");
const dialogAddBook = document.querySelector("#addBookDialog");
const dialogClose = document.querySelector("#closeDialog");

button.addEventListener("click", () => {
  dialog.showModal();
});

dialogAddBook.addEventListener("click", (event) => {
  event.preventDefault();

  const name = document.querySelector("#bookName").value;
  const author = document.querySelector("#bookAuthor").value;
  const pages = document.querySelector("#bookPages").value;
  const isRead = document.querySelector("#isRead").checked;

  const newBook = new Book(name, author, pages, isRead);
  myLibrary.addBook(newBook);

  refreshTable();

  document.querySelector("#bookName").value = "";
  document.querySelector("#bookAuthor").value = "";
  document.querySelector("#bookPages").value = "";
  document.querySelector("#isRead").checked = false;
  dialog.close();
});

dialogClose.addEventListener("click", () => {
  dialog.close();
});
