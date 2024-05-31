require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(cors());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/contact', require('../routes/contact.route'));
app.use('/upload', require('../routes/upload.route'));
app.use('/', require('../routes/view.route'));

app.listen(port, () => console.log(`Server connected to port ${port}`));