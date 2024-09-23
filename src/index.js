import express from "express"

import postRoutes from "./routes/post.routes.js"

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.send("Backend Engineer Test")
})

app.use("/api", postRoutes)

app.use((req, res) => {
    res.status(404).json({ error: "URL not found" })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
