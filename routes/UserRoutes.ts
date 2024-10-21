import express, { Router } from 'express';
import upload from '../configs/uploads';
import { UserController } from '../controllers/UserController';

export class UserRoute {
    public router: Router;
    private userController: UserController;

    constructor() {
        this.router = express.Router();
        this.userController = new UserController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/show/:id', this.userController.getOne);
        this.router.post('/register', upload.single('photo'), this.userController.create);
        this.router.post('/login', this.userController.login);
        this.router.post('/logout', this.userController.logout);
    }
}
