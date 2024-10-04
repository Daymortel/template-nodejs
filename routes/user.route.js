import express from 'express';
import { show, register, login, logout } from '../controllers/user.controller.js';

export const userRoute = () => {
    const router = express.Router();

    router.use(express.json());
    router.use(express.urlencoded({ extended: true }));

    router.get('/show/:id', show);
    router.post('/register', register);
    router.post('/login', login);
    router.post('/logout', logout);

    return router;
}