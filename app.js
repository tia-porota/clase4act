const express = require("express");
const joi = require("joi");
const books = require("./books/data");

const app = express();
const port = 3000;

const routerBooks = require("./routes/routerBooks");
const errorHandler = require("./middleware/errorHandler");

app.use(express.json());
app.use('/books', routerBooks);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server activo en puerto ${port}`);
});
