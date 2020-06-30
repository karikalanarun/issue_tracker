const express = require('express');
const issues = express.Router();
const { getAllIssues } = require("./issues.controller")

issues.get("/", getAllIssues)

module.exports = issues