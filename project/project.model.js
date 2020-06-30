const mongoose = require('mongoose');

const Project = mongoose.model('Project', {
    name: String,
    created_by: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    // issues: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Issue' }]
});


module.exports = Project