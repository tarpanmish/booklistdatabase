//Book Class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI Class
class UI {
    static displayBooks() {
        
        //Call Local Storage
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));

    }

    static addBookToList(book){
        const list = document.querySelector("#book-list")

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">Delete Entry</a></td>
        `;

         list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {
           el.parentElement.parentElement.remove();
        }
    }
       
    static showAlerts(message, className){
        const div = document.createElement('div');

        div.className = `alert alert-${className}`;

        div.appendChild(document.createTextNode(message));


        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        container.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 3000);

    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
    
}

//Storage Class
class Store{
    static getBooks(){
       let books;
       if(localStorage.getItem('books') === null){
          books = [];
       }
       else{
          books = JSON.parse(localStorage.getItem('books'));
       }
       
       return books;
    }
    
    static addBooks(book) {
       const books = Store.getBooks();

       books.push(book)

       localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        
        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Event: Display Book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

 
//Event: Add Book
document.querySelector('#book-form').addEventListener('submit', (e)=> {

    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;


    //Alert
    if(title === '' || author === '' || isbn === '') {
        UI.showAlerts('Please fill in the given fields', 'danger');
    }
    else {
        //Book class Instantiated
        const book = new Book(title, author, isbn);
    
        UI.showAlerts('Book Successfully Added', 'success');
    

        UI.addBookToList(book);

        Store.addBooks(book);

        //Clear Field 
        UI.clearFields()
    }

  
})

//Event: Remove Book
document.querySelector('#book-list').addEventListener('click', (e)=> {

    UI.deleteBook(e.target);

    //Remove From Storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    UI.showAlerts('Book Successfully Removed', 'success');
    
    

    
})