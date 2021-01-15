const jwt = require("jsonwebtoken")

function restrict(){
    return async (req, res, next) => {
        const authError = {
            message: "Invalid Credentials"
        }

        try {
            const token = req.headers.authorization

            if(!token){
                return res.status(401).json(authError)
            }

            jwt.verify(token, "keep it secret", (err, decoded) => {
                if(err) {
                    return res.status(401).json(authError)
                }

                req.token = decoded

                next()
            })
        }
        catch(err){
            next(err)
        }
    }
}

module.exports = {
    restrict
}

//don't forget to put token from "login" and copy it without
//quotations. Put it in header of insomnia and name it authorization
//or whatever you want to call it on line 10