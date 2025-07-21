const container = document.querySelector(".container");
const dialog = document.querySelector("dialog");
const newBook = document.querySelector("#addBook");

const books = [];


// Sample Book
for(let i=0;i < 6;i++){
  addBookToLibrary(
    "Charlotte's Web",
    "E.B. White",
    192,
    "Read",
    "A book about a pig whose friend is a spider"
  )
}

function Book(name, author, page_cnt, status, description){
    this.name = name;
    this.author = author;
    this.page_cnt = page_cnt;
    this.status = status;
    this.description = description;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(name, author, page_cnt, status, description) {
    if(name === "" || author === "")
      return;
    books.push(new Book(name, author, page_cnt, status, description));
    console.log(books);
    container.innerHTML = "";
    for(let i=0;i < books.length;i++){
      let newDiv = document.createElement("p");
      newDiv.classList.add("book");
      newDiv.innerHTML = `Book Name : ${books[i].name}`;
      newDiv.addEventListener("mouseenter", function (){
        this.innerHTML = `
        <div>Book Name : ${books[i].name}</div>
        <div>Book Author : ${books[i].author}</div>
        <div>Page Count : ${books[i].page_cnt}</div>
        <div>Status: ${books[i].status}</div>
        <div>Description: ${books[i].description}</div>
        `;
        let editButton = document.createElement('button');
        editButton.innerHTML = "Edit";
        editButton.addEventListener("click", function () {
          document.querySelector('#book-name').value = `${books[i].name}`;
          document.querySelector('#author').value = `${books[i].author}`;
          document.querySelector('#page-cnt').value = `${books[i].page_cnt}`;
          document.querySelector('#status').value = `${books[i].status}`;
          document.querySelector('#description').value = `${books[i].description}`;
          dialog.showModal();
          books.splice(i, 1);
          this.parentNode.remove();
        });

        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = "Delete";
        deleteButton.addEventListener("click", function () {
          this.parentNode.remove();
          books.splice(i, 1);
        });
        newDiv.appendChild(editButton);
        newDiv.appendChild(deleteButton);
      });
      newDiv.addEventListener("mouseleave", function (){
        newDiv.innerHTML = `Book Name : ${books[i].name}`;
      })
      container.appendChild(newDiv);
    }
}

newBook.addEventListener("click", function (){
    document.querySelector('#book-name').value = "";
    document.querySelector('#author').value = "";
    document.querySelector('#page-cnt').value = 100;
    document.querySelector('#status').value = "Not Read";
    document.querySelector('#description').value = "-";
    dialog.showModal();
});

dialog.addEventListener("close", function () {
    let bname = document.querySelector('#book-name').value;
    let bauthor = document.querySelector('#author').value;
    let bpage = document.querySelector('#page-cnt').value;
    let bstatus = document.querySelector('#status').value;
    let bdesc = document.querySelector('#description').value;

    addBookToLibrary(bname, bauthor, bpage, bstatus, bdesc);
});

document.querySelector('#submitBtn').addEventListener("click", function (event) {
  if(document.querySelector('#book-name').value === "" || document.querySelector('#author').value === ""){
    alert("At least input name and author!");
    return;
  }
  event.preventDefault();
  dialog.close();
})