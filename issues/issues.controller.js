const Issue = require("./issue.model")
const { makeResponse, internalErr } = require("../utils")


const getAllIssues = async (req, res) => {
    try {
        const allIssues = await Issue.find()
            .populate("reporter", ["_id", "name", "email"])
            .populate("assigned_to", ["_id", "name", "email"])
            .populate("comments.created_by", ["_id", "name", "email"])
            .populate("watchers", ["_id", "name", "email"])
        res.json(makeResponse(allIssues))
    } catch (error) {
        console.log("err ::: ", error)
        internalErr(res)
    }

}

module.exports = { getAllIssues }