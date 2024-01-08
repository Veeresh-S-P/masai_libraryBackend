const { BookModel } = require("../models/book.model");

const addBook = async (req, res) => {
  const {title,author,category,price,quantity}= req.body;
  try {
    const book = new BookModel({title,author,category,price,quantity});
    await book.save();
    res.status(200).send({ success: true, message: "Book is added" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const editBook = async (req, res) => {
  const bookId = req.params.id;
  const updatedBookData = req.body;
  try {
    const book = await BookModel.findByIdAndUpdate(bookId, updatedBookData, {
        new: true,
      })
      res.status(200).send({ success: true, message: "Book is edit" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
    const bookId = req.params.id;
  try {
    let loki=await BookModel.findByIdAndDelete(bookId)
    res.status(200).send({ success: true, message: "BookModel is delete" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getBook = async (req, res) => {
  try {
    const { category, author } = req.query;
    const query = {};
    if (category) {
      query.category = category;
    }
    if (author) {
      query.author = author;
    }

    const books = await BookModel.find(query);

    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found with the specified criteria.' });
    }

    return res.status(200).json({ success: true, data: books, message: 'Books successfully fetched.' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const getOneBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const book = await BookModel.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found with the specified ID.' });
    }

    return res.status(200).json({ success: true, data: book, message: 'Book details successfully fetched.' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { addBook, editBook, deleteBook, getBook ,getOneBook};
