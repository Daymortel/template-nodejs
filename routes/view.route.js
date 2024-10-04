import express from 'express';

export const viewRoute = () => {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.render('index')
    });

    return router;
}
