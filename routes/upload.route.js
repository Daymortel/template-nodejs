const express = require('express');
const fileUpload = require('express-fileupload');
const { send } = require('../controllers/upload.controller');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use(
    fileUpload({
        createParentPath: true
    })
)

router.post('/', send);

module.exports = router;