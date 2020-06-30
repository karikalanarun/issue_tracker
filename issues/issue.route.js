const express = require('express');
const issue = express.Router();
const { create, update, remove, addComment, addWatcher, removeWatcher } = require("./issue.controller")

issue.post('/', create);

issue.put('/:issue_id', update)
issue.delete('/:issue_id', remove)

issue.post('/:issue_id/comment', addComment)

issue.post('/:issue_id/addWatcher', addWatcher)

issue.post('/:issue_id/removeWatcher', removeWatcher)

module.exports = issue;
