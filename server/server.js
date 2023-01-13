const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./middleWare/errorMiddleware.js');
const cookieParser = require('cookie-parser');

// Importing Routes
const userRoute = require('./routes/userRoute');

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routes Middleware
app.use('/api/users', userRoute);

// Creating Routes
app.get('/', (req, res) => {
  res.send('Home Page');
});

// Custom middleware
app.use(errorHandler);

mongoose.set('strictQuery', true);
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
