const socketIO = require("socket.io")
const { getAllWatchingIssueIds } = require("./user/user.utils")

module.exports = server => {
    const io = socketIO(server)
    io.on("connection", (socket) => {
        socket.on("connectToIssues", async (userId) => {
            try {
                const ids = (await getAllWatchingIssueIds(userId)).watching_issues
                socket.join(ids) // joining to rooms
                console.log("joined to issue rooms")
            } catch (err) {
                socket.emit("server:error", "Something went wrong")
            }
        })
        socket.on("update_issue", (issue_id, msg) => {
            console.log("issue_id :: ", issue_id, "msg ::: ", msg)
            socket.to(issue_id).emit("issue_updated", msg)
        })
    })
}