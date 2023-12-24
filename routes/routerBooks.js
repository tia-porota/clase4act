const express = require("express");
const router = express.Router();
const books = require("../books/data");
const Joi = require("joi");
const app = express();

const booksSchema = Joi.object({
  title: Joi.string().required().label("Title"),
  author: Joi.string().required().label("Author"),
});

router.get("/", (req, res, next) => {
  try {
    res.json(books);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    const book = books.find((l) => l.id == id);
    if (!book) {
      const error = new Error(`El libro con el ID ${id} no existe`);
      error.status = 404;
      throw error;
    }

    res.json(book);
  } catch (err) {
    next(err);
  }
});

router.post("/", (req, res, next) => {
  try {
    const { error, value } = booksSchema.validate(req.body);

    if (error) {
      const validationError = new Error(
        "Error de validación, verifique los campos"
      );
      validationError.status = 400;
      throw validationError;
    }

    const { title, author } = value;
    const newBook = {
      id: books.length + 1,
      title,
      author,
    };
    books.push(newBook);
    res.status(200).json(newBook);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    const { error, value } = booksSchema.validate(req.body);
    if (error) {
      const validationError = new Error(
        "Error de validación, verifique los campos"
      );
      validationError.status = 400;
      throw validationError;
    }
    const { title, author } = value;

    const book = books.find((l) => l.id == id);
    if (!book) {
      const error = new Error(`El libro con el ID ${id} no existe`);
      error.status = 404;
      throw error;
    }
    book.title = title || book.title;
    book.author = author || book.author;
    res.json(book);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    const index = books.findIndex((l) => l.id == id);
    if (index === -1) {
      const error = new Error(`El libro con el ID ${id} no existe`);
      error.status = 404;
      throw error;
    }
    const deletedBook = books.splice(index, 1);

    res.json(deletedBook[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
