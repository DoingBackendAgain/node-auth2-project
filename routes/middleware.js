const jwt = require("jsonwebtoken")



function restrict(role){
    const roles = ["student", "admin"]
    return async (req, res, next) => {
        const authError = {
            message: "Invalid Credentials"
        }

        try {
            const token = req.headers.authorization
            //const token = req.cookies.token

            if(!token){
                return res.status(401).json(authError)
            }

            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if(err) {
                    return res.status(401).json(authError)
                }


                if (role && roles.indexOf(decoded.userRole)< roles.indexOf(role)){
                    return res.status(403).json({
                        message: "You are not allowed here"
                    })
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

//tokens-------
//don't forget to put token from "login" and copy it without
//quotations. Put it in header of insomnia and name it authorization
//or whatever you want to call it in this file "const token = "

//replace hard coded "token, secret" with .env
//.env ---- server need .env, change any hardcoded secrets in routes 

//COOKIES!!
// store local data and can store session Id and the token
// in login route
// res.cookie("token", token)
// sessions was doing that for us but now we have to install cookie-parser
// index.js const cookieParser = require("cookie-parser")
// server.use(cookieParser())
// middleware  const token = req.cookies.token
// nothing needed in insomnia


//Restrict Roles
// give restrict function role perameter
// if (role !== decoded.userRole){
//  return res.status(403).json({
//      message: "You are not allowed!"
// }) 
// }
// give restrict perameter(whichever role you want to have access)
// in route your restricting in route file.
// 
//user role is being defined and is hard coded in login route
//