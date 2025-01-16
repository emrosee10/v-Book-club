let books = [];

// Load books from localStorage
function loadBooksFromLocalStorage() {
    const savedBooks = localStorage.getItem('books');
    if (savedBooks) {
        books = JSON.parse(savedBooks);
    }
    renderBooks();
}

// Save books to localStorage
function saveBooksToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(books));
}

// Render the book list
function renderBooks(filteredBooks = books) {
    const booksList = document.getElementById('books');
    booksList.innerHTML = ''; // Clear current list
    
    filteredBooks.forEach((book, index) => {
        const bookItem = document.createElement('li');
        bookItem.innerHTML = `
            <strong>${book.title}</strong> by ${book.author} - Rating: ${book.rating}/5
            <p>${book.review}</p>
        `;
        booksList.appendChild(bookItem);
    });
}

// Add a new book
document.getElementById('book-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const rating = document.querySelector('input[name="rating"]:checked') ? document.querySelector('input[name="rating"]:checked').value : 0;
    const review = document.getElementById('review').value;

    if (!title || !author || !review || !rating) {
        alert('Please fill in all fields.');
        return;
    }

    const newBook = {
        title: title,
        author: author,
        rating: rating,
        review: review
    };

    books.push(newBook);
    saveBooksToLocalStorage();
    renderBooks();

    // Reset form
    document.getElementById('book-form').reset();
    // Reset the star rating
    document.querySelectorAll('input[name="rating"]').forEach(input => input.checked = false);
});

// Search function
function searchBooks() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) || 
        book.author.toLowerCase().includes(searchTerm)
    );
    renderBooks(filteredBooks);
}

// Sorting function
function sortBooks() {
    const sortBy = document.getElementById('sort-dropdown').value;
    let sortedBooks = [...books];
    
    if (sortBy === 'title') {
        sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'author') {
        sortedBooks.sort((a, b) => a.author.localeCompare(b.author));
    } else if (sortBy === 'rating') {
        sortedBooks.sort((a, b) => b.rating - a.rating);
    }

    renderBooks(sortedBooks);
}

// Add rating system (stars)
function createStarRating() {
    const starRating = document.getElementById('star-rating');
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('input');
        star.type = 'radio';
        star.name = 'rating';
        star.id = 'star' + i;
        star.value = i;
        const label = document.createElement('label');
        label.setAttribute('for', 'star' + i);
        starRating.appendChild(star);
        starRating.appendChild(label);
    }
}

createStarRating();

// Call loadBooks function to show saved books when the page loads
loadBooksFromLocalStorage();
