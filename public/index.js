import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import { contactRoute } from '../routes/contact.route.js';
import { uploadRoute } from '../routes/upload.route.js';
import { viewRoute } from '../routes/view.route.js';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(cors());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/contact', contactRoute());
app.use('/upload', uploadRoute());
app.use('/', viewRoute());

app.listen(port, () => console.log(`Server connected to port ${port}`));
