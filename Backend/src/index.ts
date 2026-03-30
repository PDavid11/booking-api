import express from "express"
import EmployeeRoutes from "./routes/employeeRoutes.js"

const app = express()
const PORT = 3000
app.use(express.json())
app.use('/employees', EmployeeRoutes)

app.get("/health", (req, res) => {
    res.json({status: "ok"})
})

app.get("/", (req, res) => {
    res.send("run")
})

app.listen(PORT, () => {
    console.log(`server on http://localhost:${PORT}`)
})