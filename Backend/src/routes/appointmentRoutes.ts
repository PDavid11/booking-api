import { Router } from "express";
import { appointmentController } from "../container.js";


const router = Router()

router.post("/", (req, res) => appointmentController.add(req, res))
router.get("/:id", (req, res) => appointmentController.getByID(req, res))
router.get("/status/:status", (req, res) => appointmentController.getByStatus(req, res))
router.get("/employee/:employeeID", (req, res) => appointmentController.getByEmployeeID(req, res))
router.patch("/", (req, res) => appointmentController.modifyStatus(req, res))

export default router