const express = require('express');
const router = express.Router();
const { create } = require("./project.controller")

/* GET home page. */
router.post('/', create);

module.exports = router;
