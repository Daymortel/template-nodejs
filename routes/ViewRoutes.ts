import express, { Request, Response, Router } from 'express';
import { Token } from '../middlewares/Token';

export class ViewRoute {
    public router: Router;
    public tokenMiddleware = new Token();

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', (req: Request, res: Response) => {
            const token = req.cookies.token;
            res.render('index', {
                token: token
            });
        });
        this.router.get('/auth/signup', (req: Request, res: Response) => {
            const token = req.cookies.token;
            res.render('auth/signup', {
                token: token
            });
        });
        this.router.get('/auth/signin', (req: Request, res: Response) => {
            const token = req.cookies.token;
            res.render('auth/signin', {
                token: token
            });
        });
        this.router.get('/auth/profil', [this.tokenMiddleware.handle], (req: Request, res: Response) => {
            const token = req.cookies.token;
            const user = req.cookies.username;
            res.render('auth/profil', {
                token: token,
                user: user
            });
        });
    }
}
