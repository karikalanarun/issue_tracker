const User = require("./user.model");
const { internalErr } = require("../utils")

const signUpUser = async ({ body: user }, res) => {
    try {
        const usr = new User(user);
        await usr.save()
        res.send({ created: usr.id })
    } catch (error) {
        console.log("err ::: ", error)
        internalErr(res)
    }

}


module.exports = {
    signUpUser
}