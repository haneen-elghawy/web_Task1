const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json()); 

let books = [
    { id: 1, title: "The Maze Runner", author: "James Dashner" },
    { id: 2, title: "It Ends with Us", author: "Colleen Hoover" },
    { id: 3, title: "The Fault in Our Stars", author: "John Green" }
];


app.get('/books', (req, res) => {
    res.json(books);
});


app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id == req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
});


app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };

    books.push(newBook);
    res.status(201).json(newBook);
});


app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id == req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    res.json(book);
});


app.delete('/books/:id', (req, res) => {
    books = books.filter(b => b.id != req.params.id);
    res.json({ message: "Book deleted" });
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
