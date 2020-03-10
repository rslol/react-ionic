const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongooseSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const db = require('./config/key').mongoURI;

// App Setup/Security Setup 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(xss());
app.use(express.json({ limit: '10kb' }));
app.use(mongooseSanitize());

// DB Setuo 
mongoose.connect(db)
    .then(() => console.log('DB Connected Successfully'))
    .catch(err => console.error(err));

// Route Configuration
// app.use('/users', users);
// app.use('/data', tennisData);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server Listening on Port ${port}`));