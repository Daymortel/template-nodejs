import express from 'express';
import { token } from '../middlewares/token.js';

export const viewRoute = () => {
    const router = express.Router();

    router.get('/', (req, res) => {
        const token = req.cookies.token;
        console.log(token);
        
        res.render('index', {
            token: token
        });
    });

    router.get('/auth/signup', (req, res) => {
        const token = req.cookies.token;
        res.render('auth/signup', {
            token: token
        });
    });

    router.get('/auth/signin', (req, res) => {
        const token = req.cookies.token;
        res.render('auth/signin', {
            token: token
        });
    });

    router.get('/auth/profil', [token], (req, res) => {
        const token = req.cookies.token;
        res.render('auth/profil', {
            token: token,
            user: req.user
        });
    });

    return router;
}
