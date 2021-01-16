const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const model = require("./models")
const {restrict} = require("./middleware")

const router = express.Router()

router.get("/users", (req, res, next)=> {
    try{
        model.find()
            .then((user)=> {
                res.json(user)
            })

    }
    catch(err){
        next(err)
    }
})


router.post("/login", async (req, res, next)=> {
    try {
        const {username, password} = req.body
        const user = await model.findByUsername({username}).first()

        if(!user){
            return res.status(401).json({
                message: "User doesn't exisit"
            })
        }
         const passwordValid = await bcrypt.compare(password, user.password)

         if(!passwordValid){
             return res.status(401).json({
                 message: "Not the right password!"
             })
         }

         //req.session.user = user
         //generate token instead

         const token = jwt.sign({
             userID: user.id,
             userRole: "basic"
         }, "keep it secret")

         res.json({
             message: `Welcome ${user.username}!`
         })
    }
    catch(err){
        next(err)
    }
})


module.exports = router
