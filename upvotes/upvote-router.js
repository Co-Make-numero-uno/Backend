const express = require("express")
const Upvotes = require("./upvote-model")

const router = express.Router()

router.get("/all", async (req, res, next) => {
    try{
        res.json(await Upvotes.findAll())
    } catch(err) {
        next(err)
    }
})

function getUpvoteId(baseUrl) {
    let upvoteArray = baseUrl.split("/")
    let upvoteId = upvoteArray[2]
    return upvoteId
}

router.get("/", async (req, res, next) => {
    const upvoteId = getUpvoteId(req.baseUrl)
    try{
        const upvote = await Upvotes.findById(upvoteId)
        if(!upvote) {
            return res.status(404).json({
                error: "User has not voted on this issue yet"
            })
        }
        res.json(upvote)
    } catch(err) {
        next(err)
    }
})

router.post("/", async (req, res, next) => {
    try{
        const { title, description, city, state } = req.body
        const issue= await Upvotes.findBy({ title }).first()

        if(issue) {
            return res.status(409).json({
                message: "issue already exists"
            })
        }
        const newIssue= await Upvotes.add({
            title,
            description,
            city,
            state
        })
        res.status(201).json(newIssue)
    } catch(err) {
        next(err)
    }
})

router.put("/:id", async (req, res, next) => {
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

        const updateThisIssue = await Upvotes.findById(req.params.id)
            if(issue) {
                Upvotes.update(issue, req.params.id).then(updatedIssue => {
                    Upvotes.findById(req.params.id).then(updatedIssue => {
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
    } catch(err) {
        next(err)
    }
})

router.delete("/:id", async (req, res, next) => {
    try{
        await Upvotes.remove(req.params.id)
        res.status(204).json({
            message: "The issue has been removed"
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router