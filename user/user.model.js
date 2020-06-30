const mongoose = require('mongoose');

const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    watching_issues: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Issue' }]
});


module.exports = User