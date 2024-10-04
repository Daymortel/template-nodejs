import express from 'express';
import fileUpload from 'express-fileupload';
import { send } from '../controllers/upload.controller.js';

export const uploadRoute = () => {
    const router = express.Router();

    router.use(express.json());
    router.use(express.urlencoded({ extended: true }));

    router.use(
        fileUpload({
            createParentPath: true
        })
    )

    router.post('/', send);

    return router;
}
