import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { User } from '../entities/User';
import { UserService } from '../services/UserService';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    getOne = async (req: Request, res: Response) => {
        try {
            await this.userService.getOne(res.locals.user.id);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    create = async (req: Request, res: Response) => {
        try {
            const newUser = {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                photo: req.file?.filename || null
            } as User;
            await this.userService.create(newUser);
            res.status(200).send('<script>alert(\'Account creation successfull !\'); window.location.href = \'/auth/signin\';</script>');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const result = await this.userService.login(req.body.email, req.body.password);
            if (result.success) {
                res.cookie('token', result.token);
                res.cookie('id', result.user.id);
                res.cookie('username', result.user.username);
                res.send('<script>alert(\'Connection successfull !\'); window.location.href = \'/auth/profil\';</script>');
            } else {
                res.send('<script>alert(\'Incorrect credentials !\'); window.location.href = \'/auth/signin\';</script>');
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    logout = async (req: Request, res: Response) => {
        try {
            res.clearCookie('token');
            res.clearCookie('id');
            res.clearCookie('username')
            res.send('<script>alert(\'Disconnection successfull !\'); window.location.href = \'/auth/signin\';</script>');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}
