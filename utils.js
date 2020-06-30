

const makeResponse = (result, status = 200, message = "success") => {
    return { status, message, result }
}

const internalErr = (res) => {
    res.send(makeResponse("Something went wrong", 500, "internalErr"))
}

module.exports = {
    makeResponse,
    internalErr
}