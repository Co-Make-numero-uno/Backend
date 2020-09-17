const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("./users-model")


const router = express.Router()

router.get("/", async (req, res, next) => {
    try{
        res.json(await Users.findAll())
    }catch(err) {
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try{
        const user = await Users.findById(req.params.id)
        if(!user) {
            return res.status(404).json({
                message: "User with that id is not found"
            })
        }
        res.json(user)
    }catch(err) {
        next(err)
    }
})

router.post("/register", async (req, res, next) => {
    try{
        const { name, city, state, email, password } = req.body
        const user = await Users.findBy({ email }).first()

        if(user) {
            return res.status(409).json({
                message: "email already exists"
            })
        }
        const newUser = await Users.add({
            name,
            city,
            state,
            email,
            password : await bcrypt.hash(password, 14)
        })
        res.status(201).json(newUser)
    }catch(err) {
        next(err)
    }
})

router.post("/login", async (req, res, next) => {
    try{
        const { email, password } = req.body
        const user = await Users.findBy({ email }).first()     

        if(!user) {
            return res.status(401).json({
                message: "The email or password are incorrect"
            })
        }
        const passwordValid = await bcrypt.compare(password, user.password)

        if(!passwordValid) {
            return res.status(401).json({
                message: "Incorrect Password"
            })
        }

        const payload = {
            userId: user.id,
            username: user.email
        }

        res.json({
            message: `Welcome ${user.name}`,
            token: jwt.sign(payload, 'secKey.JWT_SECRET')
        })
    }catch(err) {
        next(err)
    }
})

router.put("/:id", (req, res, next) => {
    try{
        const user = req.body

        if (
            !user.name ||
            !user.city ||
            !user.state ||
            !user.email ||
            !user.password
        ) {
            return res.status(404).json({
                message: "Please enter all required fields"
            })
        }

        Users.findById(req.params.userId)
        .then((user) => {
            if (user) {
                Users.update(user, req.params.userId).then((user) => {
                    res.json({
                        message: "User has been successfully updated"
                    })
                })
            }
            res.status(404).json({
                message: "User with that id could not be found"
            })
        })
    }catch(err) {
        next(err)
    }
})

router.delete("/:id", async (req, res, next) => {
    try{
        await Users.remove(req.params.id)
        res.status(204).end()
    }catch (err) {
        next(err)
    }
})

router.get("logoff", async (req, res, next) => {
    try{
        res.sessions.destroy((err) => {
            if (err) {
                next(err)
            }
            res.status(204).end()
        })
    }catch(err) {
        next(err)
    }
})

module.exports = router