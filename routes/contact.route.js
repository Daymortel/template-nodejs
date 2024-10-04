import express from 'express';
import { send } from '../controllers/contact.controller.js';

export const contactRoute = () => {
    const router = express.Router();

    router.use(express.json());
    router.use(express.urlencoded({ extended: true }));

    router.post('/', send);

    return router;
}
