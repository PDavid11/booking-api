import express from "express"
import EmployeeRoutes from "./routes/employeeRoutes.js"
import GuestRoutes from "./routes/guestRoutes.js"
import ServiceRoutes from "./routes/serviceRoutes.js"

const app = express()
const PORT = 3000
app.use(express.json())
app.use('/employees', EmployeeRoutes)
app.use('/guests', GuestRoutes)
app.use('/services', ServiceRoutes)

app.get("/health", (req, res) => {
    res.json({status: "ok"})
})

app.get("/", (req, res) => {
    res.send("run")
})

app.listen(PORT, () => {
    console.log(`server on http://localhost:${PORT}`)
})