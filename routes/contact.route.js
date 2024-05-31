require('dotenv').config();
const express = require('express');
const { send } = require('../controllers/contact.controller');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/', send);

module.exports = router;
