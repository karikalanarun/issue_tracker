const User = require("./user.model");
const { UnsupportedMediaType, InternalServerError } = require("http-errors");

const internalErr = (res) => {
    res.send({ code: "InternalErr", message: "Something Went Wrong" })
}

const signUpUser = async ({ body: user }, res) => {
    try {
        const usr = new User(user);
        await usr.save()
        res.send({ created: usr.id })
    } catch (error) {
        internalErr(res)
    }

}


module.exports = {
    signUpUser
}