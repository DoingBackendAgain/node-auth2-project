const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const model = require("./models")
const {restrict} = require("./middleware")

const router = express.Router()

router.get("/users", restrict(), async (req, res, next)=> {
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

router.post("/users", async (req, res, next)=> {
    try{
    const {username, password, department} = req.body
    const user = await model.findByUsername({username}).first()
    
    if(user){
        return res.status(409).json({
            message: "This user already exisits. Try another name"
        })
    }

    const newUser = await model.add({
        username,
        password: await bcrypt.hash(password, 10),
        department
    })

    res.status(201).json(newUser)


    }
    catch(err){
        next(err)
    }
})


router.post("/login", async (req, res, next)=> {
    try {
        const {username, password} = req.body
        const user = await model.findBy({username}).first()

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

         req.session.user = user
         //generate token instead

         const token = jwt.sign({
             userID: user.id,
             userRole: "basic"
         }, process.env.JWT_SECRET)

         res.json({
             message: `Welcome ${user.username}!`,
             token: token
         })
    }
    catch(err){
        next(err)
    }
})


module.exports = router
