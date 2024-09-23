import { Router } from "express"
import {
    getPosts,
    getUsers,
    getCommentsForPost
} from "../controllers/PostController.js"

const router = Router()

router.get("/posts", async (req, res) => {
    const start = parseInt(req.query.start) || 0
    const size = parseInt(req.query.size) || 10

    try {
        const posts = await getPosts(start, size)
        res.json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})

router.get("/users", async (req, res) => {
    try {
        const users = await getUsers()

        res.json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get("/posts/:postId/comments", async (req, res) => {
    try {
        const comments = await getCommentsForPost(req.params.postId)

        if (!comments || comments.length === 0) {
            return res.status(404).json({ error: "Comments not found" })
        }

        res.json(comments)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router
