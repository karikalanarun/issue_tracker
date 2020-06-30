const { internalErr, makeResponse } = require("../utils")
const Issue = require("./issue.model");
const issue = require("./issue.route");
const User = require("../user/user.model");

const create = async ({ body: { title, description, assigned_to, reporter } }, res) => {
    try {
        const issue = new Issue({ title, description, assigned_to, reporter })
        await issue.save();
        res.send(makeResponse({ created: issue.id }))
    } catch (error) {
        console.log("errr ::: ", error)
        internalErr(res)
    }
}

const update = async ({ params: { issue_id }, body: { title, description, assigned_to } }, res) => {
    try {
        await Issue.updateOne({ _id: issue_id }, { title, description, assigned_to })
        res.send(makeResponse({ udpated: issue_id }))
    } catch (error) {
        console.log("errr ::: ", error)
        internalErr(res)
    }
}

const remove = async ({ params: { issue_id } }, res) => {
    try {
        await Issue.deleteOne({ _id: issue_id })
        res.send(makeResponse({ deleted: issue_id }))
    } catch (error) {
        console.log("errr ::: ", error)
        internalErr(res)
    }
}

const addComment = async ({ params: { issue_id }, body: { body, created_by } }, res) => {
    try {
        await Issue.updateOne({ _id: issue_id }, { $push: { comments: { body, created_by } } })
        res.send(makeResponse({ udpated: issue_id }))
    } catch (error) {
        console.log("errr ::: ", error)
        internalErr(res)
    }
}

const addWatcher = async ({ params: { issue_id }, body: { watcher } }, res) => {
    try {
        await Issue.updateOne({ _id: issue_id }, { $push: { watchers: watcher } })
        await User.updateOne({ _id: watcher }, { $push: { watching_issues: issue_id } })
        res.send(makeResponse({ udpated: issue_id }))
    } catch (error) {
        console.log("errr ::: ", error)
        internalErr(res)
    }
}

const removeWatcher = async ({ params: { issue_id }, body: { watcher } }, res) => {
    try {
        await Issue.updateOne({ _id: issue_id }, { $pull: { watchers: watcher } })
        await User.updateOne({ _id: watcher }, { $pull: { watching_issues: issue_id } })
        res.send(makeResponse({ udpated: issue_id }))
    } catch (error) {
        console.log("errr ::: ", error)
        internalErr(res)
    }
}

module.exports = { create, update, remove, addComment, addWatcher, removeWatcher }