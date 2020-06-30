const express = require('express');
const router = express.Router();
const { signUpUser } = require("./user.controller")

/* GET home page. */
router.post('/', signUpUser);

module.exports = router;
