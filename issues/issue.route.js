const express = require('express');
const issue = express.Router();
const { create, update, remove } = require("./issue.controller")

issue.post('/', create);

issue.put('/:issue_id', update)
issue.delete('/:issue_id', remove)

module.exports = issue;
