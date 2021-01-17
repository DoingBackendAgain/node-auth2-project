const jwt = require("jsonwebtoken")

const roles = ["basic", "admin"]

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

            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if(err) {
                    return res.status(401).json(authError)
                }

                // if (role && role.indexOf(decoded.userRole)< roles.indexOf(role)){
                //     return res.status(403).json({
                //         message: "You are not allowed here"
                //     })
                // }

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

//tokens instead of sessions-----
//don't forget to put token from "login" and copy it without
//quotations. Put it in header of insomnia and name it authorization
//or whatever you want to call it in this file "const token = "

//replace hard coded "token, secret" with .env

//COOKIES!!
// store local data and can store session Id and the token
// in login route
// res.cookie("token", token)
// sessions was doing that for us but now we have to install cookie-parser
// index.js const cookieParser = require("cookie-parser")
// server.use(cookieParser())
// middleware  const token = req.cookies.token
// nothing needed in insomnia