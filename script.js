const myLibrary = [];

// Buttons
const displayBooksBTN = document.getElementById('displayBooks')
const addBookBTN = document.getElementById('addBook')
const submitBTN = document.getElementById('submit')
const closeDialogBTN = document.getElementById('closeDialog')

// HTML Elements
const dialogNewBook = document.getElementById('dialog-new-book')
const booksRead = document.getElementById('booksRead')
const form = document.getElementById('form')
// HTML Element from dialog box
const title = document.getElementById('title')
const author = document.getElementById('author')
const pages = document.getElementById('pages')
const readBook = document.getElementById('readBook')


function Book(author, title, pages, readBook) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.readBook = readBook;
    this.bookID = crypto.randomUUID();
}

Book.prototype.toggleReadStatus = function () {
    this.readBook = !this.readBook;
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

function deleteBookFromLibrary(id) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].bookID === id) {
            myLibrary.splice(i, (i + 1))
        }
    }
}

////// DISPLAYING ALL OF THE BOOKS DYNAMICALLY

displayBooksBTN.addEventListener('click', (e) => {
    e.preventDefault();

    // Before showing the library book display, clear it first
    const oldBookDisplay = document.querySelectorAll('.book-row');
    oldBookDisplay.forEach(book => {
        book.remove();
    })

    // Unhide the library book display
    booksRead.classList.toggle('hidden')

    // Loop through each book from myLibrary array
    // Create new HTML Elements and assign values from the book object
    // Add HTML Elements to do list
    myLibrary.forEach(book => {
        const newUL = document.createElement("UL");
        newUL.classList.add('book-row')
        // This class is so we can clear the books each time we display it
        newUL.classList.add('book-record')
        booksRead.append(newUL);

        const title = document.createElement("LI");
        newUL.append(title);
        title.append(book.title);

        const author = document.createElement("LI");
        newUL.append(author);
        author.append(book.author);

        const pages = document.createElement("LI");
        newUL.append(pages);
        pages.append(book.pages);

        const read = document.createElement("LI");
        newUL.append(read);
        read.append(book.readBook);

        const changeReadStatusBTN = document.createElement("BUTTON");
        changeReadStatusBTN.innerText = 'Change Read Status';
        newUL.append(changeReadStatusBTN);

        // When botton is clicked change property of book and the display of all the books
        changeReadStatusBTN.addEventListener('click', () => {
            book.toggleReadStatus()
            read.innerText = book.readBook;
        })

        const deleteBookBTN = document.createElement("BUTTON");
        deleteBookBTN.innerText = 'Delete';
        deleteBookBTN.classList = 'delete'
        newUL.append(deleteBookBTN);

        deleteBookBTN.addEventListener('click', () => {
            newUL.remove();
            deleteBookFromLibrary(book.bookID)
        })
    })
})

////// ADDING A NEW BOOK

addBookBTN.addEventListener('click', () => {
    dialogNewBook.showModal();
})

closeDialogBTN.addEventListener('click', () => {
    dialogNewBook.close();
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // If the books are currently displayed then hide it. Then when it is displayed,
    // it will have the latest books
    if(booksRead.classList.contains('hidden')) {

    } else {
        booksRead.classList.add('hidden')
    }

    const newBook = new Book(author.value, title.value, pages.value, readBook.checked)
    addBookToLibrary(newBook);
    
    dialogNewBook.close();
})

