const User = require("./user.model");
const { internalErr, makeResponse } = require("../utils")
const jwt = require("jsonwebtoken")
const config = require("config")

const secret = config.get("session.secret")

const signUpUser = async ({ body: user }, res) => {
    try {
        const usr = new User(user);
        await usr.save()
        res.send({
            created: usr.id, token: jwt.sign(
                { id: user.id, email: user.email },
                secret,
                { expiresIn: "7d" }
            )
        })
    } catch (error) {
        console.log("err ::: ", error)
        internalErr(res)
    }

}

const unAuthorized = (res) => {
    res.status(401).json(makeResponse("You are not authorized", 401, "invalidAuth"))
}

const login = async ({ body: { email, password } }, res) => {
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return unAuthorized(res)
        } else {
            if (user.password === password) {
                res.send(
                    makeResponse({
                        token: jwt.sign(
                            { id: user.id, email: user.email },
                            secret,
                            { expiresIn: "7d" }
                        )
                    })
                )
            } else {
                return unAuthorized(res)
            }
        }
    } catch (error) {
        console.log("err ::: ", error)
        internalErr(res)
    }

}


module.exports = {
    signUpUser,
    login
}