var shelf = [];
var htmlShelf = document.querySelector('.shelf');
var addButton = document.querySelector('.add-book');
var bookForm = document.querySelector('form');

class Book {

    constructor(title,pages,author,status,color) {
        this.title = title;
        this.pages = pages + ' pages';
        this.author = author;
        this.status = status;
        this.position;
        this.color = color;
    }

}

function addBook(title,pages,author,status,color) {
    let newBook = new Book(title,pages,author,status,color);
    shelf.push(newBook);
    newBook.position = shelf.length;
    renderBook(newBook);
    getData(shelf);
}

function renderBook(book) {
    let newBook = document.createElement('div');
    let changeStatus = document.createElement('button');
    changeStatus.textContent = 'Change Reading Status'
    let remove = document.createElement('button');
    remove.textContent = 'Remove book'

    for (i = 0; i < 3; i++) {
        let data = document.createElement('p');
        if (i == 0) {
            data.textContent = book.title;
        } else if (i == 1) {
            data.textContent = book.pages;
        } else if (i == 2) {
            data.textContent = book.author;
        }
        newBook.appendChild(data);
    }

    let status = document.createElement('p');
    status.textContent = book.status;
    newBook.appendChild(status);

    let bookCover = `rgb(${book.color[0]},${book.color[1]},${book.color[2]})`

    changeStatus.addEventListener('click', () => {
        if (book.status == 'read') {
            book.status = 'not read';
        } else {
            book.status = 'read';
        }
        status.textContent = book.status;
        getData(shelf);
    });

    remove.addEventListener('click', () => {
        htmlShelf.removeChild(newBook);
        shelf.splice(book.position-1,1);
        getData(shelf);
    });

    newBook.appendChild(changeStatus);
    newBook.appendChild(remove);
    newBook.classList.add('book');
    newBook.style.setProperty('background-color', `${bookCover}`);
    htmlShelf.appendChild(newBook);
}

function renderShelf() {
    let i = 0;
    while (i < shelf.length) {
        renderBook(shelf[i]);
        i++;
    }
}

addButton.addEventListener('click', () => {
    if (shelf.length < 10) {
        bookForm.style.setProperty('display', 'flex');
    } else {
        alert('There is a limit of 10 books in this shelf. Please remove at least one in order to add a new book.');
    }
});

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let title = document.querySelector('.title').value;
    let pages = document.querySelector('.pages').value;
    let author = document.querySelector('.author').value;
    let yes = document.querySelector('.yes');
    let no = document.querySelector('.no');
    let status;
    let color = generateColor();

    if (yes.checked) {
        status = 'read';
    } else {
        status = 'not read';
    }

    addBook(title,pages,author,status,color);
    bookForm.reset();
    bookForm.style.setProperty('display', 'none');
    console.log(shelf);
});

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

// Getter function to save data
function getData(shelf) {
    localStorage.clear();
    localStorage.setItem('savedShelf', JSON.stringify(shelf));
}

if (localStorage.getItem('savedShelf')) {
    let savedShelf = JSON.parse(localStorage.getItem('savedShelf'));
    shelf = savedShelf;
    renderShelf();
}

// MISC STUFF

function generateColor() {
    let newColor = [];
    let red, green, blue;
    red = Math.floor(Math.random() * 256);
    green = Math.floor(Math.random() * 256);
    blue = Math.floor(Math.random() * 256);
    newColor.push(red,green,blue);
    return newColor;
}