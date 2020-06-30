const mongoose = require('mongoose');

const comment = new mongoose.Schema({
    body: String,
    created_by: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' }
}, { timestamps: true })

const IssueSchema = new mongoose.Schema({
    title: String,
    description: String,
    reporter: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    assigned_to: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    comments: [comment],
    watchers: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }]
}, { timestamps: true })

const Issue = mongoose.model('Issue', IssueSchema);


module.exports = Issue