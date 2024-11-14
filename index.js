const myLibrary = [];
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

function Book(name, author, pages, isRead = false) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBooksToLibrary(books) {
  for (let book of books) {
    myLibrary.push(new Book(book.name, book.author, book.pages, book.isRead));
  }
}

addBooksToLibrary(testBooks);

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
    myLibrary.splice(index, 1);
  });

  const changeStatus = document.createElement("button");
  changeStatus.textContent = "Change status";
  changeStatus.addEventListener("click", () => {
    book.isRead = !book.isRead;
    newCellRead.textContent = book.isRead ? "Yes" : "No";
  });

  newCellActions.appendChild(removeButton);
  newCellActions.appendChild(changeStatus);

  newRow.appendChild(newCellName);
  newRow.appendChild(newCellAuthor);
  newRow.appendChild(newCellPages);
  newRow.appendChild(newCellRead);
  newRow.appendChild(newCellActions);

  table.appendChild(newRow);
}

myLibrary.forEach((book, index) => addBookToTable(book, index));

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
  myLibrary.push(newBook);

  addBookToTable(newBook, myLibrary.length - 1);

  document.querySelector("#bookName").value = "";
  document.querySelector("#bookAuthor").value = "";
  document.querySelector("#bookPages").value = "";
  document.querySelector("#isRead").checked = false;
  dialog.close();
});
