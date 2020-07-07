const User = require("./user.model");

const getAllWatchingIssueIds = (userId) => {
    return User.findById(userId, 'watching_issues')
}

module.exports = { getAllWatchingIssueIds }