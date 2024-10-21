import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import { UserRoute } from '../routes/UserRoutes';
import { ViewRoute } from '../routes/ViewRoutes';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(cors());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/user', new UserRoute().router);
app.use('/', new ViewRoute().router);

app.listen(port, () => console.log(`Server connected to port ${port}`));
