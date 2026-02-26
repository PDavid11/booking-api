import express from "express"

const app = express()
const PORT = 3000

app.get("/health", (req, res) => {
    res.json({status: "ok"})
})

app.get("/", (req, res) => {
    res.send("run")
})

app.listen(PORT, () => {
    console.log(`server on http://localhost:${PORT}`)
})