const myLibrary = [];

// Buttons
const displayBooksBTN = document.getElementById('displayBooks')
const addBookBTN = document.getElementById('addBook')

// HTML Elements
const booksRead = document.getElementById('booksRead')

// The next 7 lines is dummy date
const book1 = new Book('Dennis Lehane', 'Live By Night', 400, false)
const book2 = new Book('Dennis Lehane', 'Darkness Take My Hand', 400, false)
const book3 = new Book('Dennis Lehane', 'A Drink Before the War', 400, false)
const book4 = new Book('Dennis Lehane', 'Sacred', 400, false)
addBookToLibrary(book1)
addBookToLibrary(book2)
addBookToLibrary(book3)
addBookToLibrary(book4)

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
        newUL.append(deleteBookBTN);

        deleteBookBTN.addEventListener('click', () => {
            newUL.remove();
            deleteBookFromLibrary(book.bookID)
        })
    })
})

addBookBTN.addEventListener('click', () => {
})

function deleteBookFromLibrary(id) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].bookID === id) {
            myLibrary.splice(i, (i + 1))
        }
    }
}