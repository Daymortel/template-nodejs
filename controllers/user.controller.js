import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '../models/user.model.js';

export const show = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findAll({
            where: {
                id: id
            },
            attributes: ['email', 'username', 'password']
        })
        res.status(200).json(user)
    } catch(err) {
        res.send(err.message);
    } 
};

export const register = async (req, res) => {
    try {
        const user = await User.create({
            "email": req.body.email,
            "username": req.body.username,
            "password": crypto.createHash('sha256').update(req.body.password).digest('hex')
        });
        // res.status(200).json({ "id": user.id });
        res.send('<script>alert(\'Account created successfull !\'); window.location.href = \'/auth/signin\';</script>');
    } catch(err) {
        res.send(err.message);
    }
};

export const login = async (req, res) => {
    try {
        const result = await User.findOne({
            where: { 
                email: req.body.email,
                password: crypto.createHash('sha256').update(req.body.password).digest('hex')
            }
        });
        if(result.length === 0) {
            res.status(404).send('Account not found !');
        } else {
            const token = jwt.sign(result.dataValues, "secretkey");
            const user = result.dataValues;
            // res.status(200).json({user, token});
            res.cookie('token', token);
            res.cookie('user', user);
            res.send('<script>alert(\'Connected successfull !\'); window.location.href = \'/auth/profil\';</script>');
        }
    } catch(err) {
        res.send('<script>alert(\'Incorrect email or password !\'); window.location.href = \'/auth/signin\';</script>');
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.clearCookie('user');
        res.send('<script>alert(\'Disconnected successfull !\'); window.location.href = \'/auth/signin\';</script>');
    } catch (err) {
        res.send(err.message);
    }
}