const Project = require("./project.model")
const { makeResponse, internalErr } = require("../utils")

const create = async ({ body: { name, created_by } }, res) => {
    try {
        const project = new Project({ name, created_by })
        await project.save()
        res.send(makeResponse({ created: project.id }))
    } catch (error) {
        console.log("errr ::: ", error);
        internalErr(res)
    }
}

module.exports = { create }