const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
mongoose.set('strictQuery', true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Creating Routes
app.get('/', (req, res) => {
  res.send('Home Page');
});

// Connect to Database and start Server
const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started and listening to the Port ${PORT}...`);
    });
  })
  .then('Error', (err) => console.log(err));
