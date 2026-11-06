import dotenv from "dotenv"
dotenv.config() 
import cors from "cors"
import express from "express"
import EmployeeRoutes from "./routes/employeeRoutes.js"
import GuestRoutes from "./routes/guestRoutes.js"
import ServiceRoutes from "./routes/serviceRoutes.js"
import AppointmentRoutes from "./routes/appointmentRoutes.js"
import AuthRoutes from "./routes/authRoutes.js"
import availableSlotRoutes from "./routes/availableSlotsRoutes.js"
import pool from "./db.js"

const app = express()
const PORT = 3000
app.use(cors())
app.use(express.json())
app.use('/employees', EmployeeRoutes)
app.use('/guests', GuestRoutes)
app.use('/services', ServiceRoutes)
app.use('/appointments', AppointmentRoutes)
app.use('/auth', AuthRoutes)
app.use('/availableSlots', availableSlotRoutes)

app.listen(PORT, async () => {
    console.log(`server on http://localhost:${PORT}`)
})