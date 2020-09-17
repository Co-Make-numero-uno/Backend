const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Issues = require("./issues-model")


const router = express.Router()

router.get("/", async (req, res, next) => {
    try{
        res.json(await Issues.findAll())
    }catch(err) {
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try{
        const issue = await Issues.findById(req.params.id)
        if(!issue) {
            return res.status(404).json({
                message: "Unable to find the issue with that id"
            })
        }
        res.json(issue)
    }catch(err) {
        next(err)
    }
})

router.put("/:id", (req, res, next) => {
    try{
        const issue = req.body

        if (
            !issue.title ||
            !issue.description ||
            !issue.city ||
            !issue.state
        ) {
            return res.status(404).json({
                message: "Please enter all required fields"
            })
        }

        Issues.findById(req.params.issueId)
        .then((issue) => {
            if (issue) {
                Issues.update(issue, req.params.issueId).then((issue) => {
                    res.json({
                        message: "Issue has been successfully updated"
                    })
                })
            }
            res.status(404).json({
                message: "The issue with that id could not be found"
            })
        })
    }catch(err) {
        next(err)
    }
})

router.delete("/:id", async (req, res, next) => {
    try{
        await Issues.remove(req.params.id)
        res.status(204).end()
    }catch (err) {
        next(err)
    }
})

module.exports = router