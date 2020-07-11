const express = require('express');
const router = express.Router();
const { signUpUser, login, googleOAuthURL, googleOauthCallback } = require("./user.controller")

/* GET home page. */
router.post('/', signUpUser);

router.post('/login', login)

router.get("/googleURL", googleOAuthURL)

router.get("/googleOauthCallback", googleOauthCallback)

module.exports = router;
