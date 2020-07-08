const { internalErr, makeResponse } = require("../utils")
const Issue = require("./issue.model");
const issue = require("./issue.route");
const User = require("../user/user.model");

/**
 * create
 * @param {Object} req
 * @param {Object} res 
 */
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

/**
 * update
 * @param {Object} req
 * @param {Object} res 
 */
const update = async ({ params: { issue_id }, body: { title, description, assigned_to } }, res) => {
    try {
        await Issue.updateOne({ _id: issue_id }, { title, description, assigned_to })
        res.send(makeResponse({ udpated: issue_id }))
    } catch (error) {
        console.log("errr ::: ", error)
        internalErr(res)
    }
}

/**
 * remove
 * @param {Object} req
 * @param {Object} res 
 */
const remove = async ({ params: { issue_id } }, res) => {
    try {
        await Issue.deleteOne({ _id: issue_id })
        res.send(makeResponse({ deleted: issue_id }))
    } catch (error) {
        console.log("errr ::: ", error)
        internalErr(res)
    }
}

/**
 * addComment
 * @param {Object} req
 * @param {Object} res 
 */
const addComment = async ({ params: { issue_id }, body: { body, created_by } }, res) => {
    try {
        await Issue.updateOne({ _id: issue_id }, { $push: { comments: { body, created_by } } })
        res.send(makeResponse({ udpated: issue_id }))
    } catch (error) {
        console.log("errr ::: ", error)
        internalErr(res)
    }
}

/**
 * addWatcher
 * @param {Object} req
 * @param {Object} res 
 */
const addWatcher = async ({ params: { issue_id }, body: { watcher } }, res) => {
    try {
        const session = await Issue.startSession();
        await Issue.updateOne({ _id: issue_id }, { $push: { watchers: watcher } }).session(session)
        await User.updateOne({ _id: watcher }, { $push: { watching_issues: issue_id } }).session(session)
        res.send(makeResponse({ udpated: issue_id }))
    } catch (error) {
        console.log("errr ::: ", error)
        internalErr(res)
    }
}

/**
 * removeWatcher
 * @param {Object} req
 * @param {Object} res 
 */
const removeWatcher = async ({ params: { issue_id }, body: { watcher } }, res) => {
    try {
        const session = await Issue.startSession();
        await Issue.updateOne({ _id: issue_id }, { $pull: { watchers: watcher } }).session(session)
        await User.updateOne({ _id: watcher }, { $pull: { watching_issues: issue_id } }).session(session)
        res.send(makeResponse({ udpated: issue_id }))
    } catch (error) {
        console.log("errr ::: ", error)
        internalErr(res)
    }
}

module.exports = { create, update, remove, addComment, addWatcher, removeWatcher }