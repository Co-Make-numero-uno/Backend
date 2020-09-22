const express = require("express")
const Issues = require("./issues-model")
const authenticate = require("./issues-middleware")

const router = express.Router()

router.get("/", async (req, res, next) => {
    try{
        res.json(await Issues.findAll())
    }catch(err) {
        next(err)
    }
})

router.get("/:id", authenticate.restrict(), async (req, res, next) => {
    try{
        const issue = await Issues.findById(req.params.id)
        if(!issue) {
            return res.status(404).json({
                error: "Unable to find the issue with that id"
            })
        }
        res.json(issue)
    }catch(err) {
        next(err)
    }
})

router.post("/issues", authenticate.restrict(), async (req, res, next) => {
    try{
        const { title, description, city, state } = req.body
        const issue= await Issues.findBy({ title }).first()

        if(issue) {
            return res.status(409).json({
                message: "issue already exists"
            })
        }
        const newIssue= await Issues.add({
            title,
            description,
            city,
            state
        })
        res.status(201).json(newIssue)
    }catch(err) {
        next(err)
    }
})

router.put("/:id", authenticate.restrict(), async (req, res, next) => {
    try{
        const issue = await req.body

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

        const updateThisIssue = await Issues.findById(req.params.id)
            if(issue) {
                Issues.update(issue, req.params.id).then(updatedIssue => {
                    Issues.findById(req.params.id).then(updatedIssue => {
                        res.status(200).json({
                            message: "Issue has been successfully update", 
                            updatedIssue
                        })
                    })
                })
            } else {
                return res.status(404).json({
                    message: "Issue with that id could not be found"
                })
            }
    }catch(err) {
        next(err)
    }
})

router.delete("/:id", authenticate.restrict(), async (req, res, next) => {
    try{
        await Issues.remove(req.params.id)
        res.status(204).json({
            message: "The issue has been removed"
        })
    }catch (err) {
        next(err)
    }
})

module.exports = router