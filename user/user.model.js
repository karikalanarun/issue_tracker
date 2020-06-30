const mongoose = require('mongoose');

const User = mongoose.model('User', {
    name: String,
    email: { type: String, unique: true, index: true, },
    password: String,
    watching_issues: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Issue' }]
});



module.exports = User