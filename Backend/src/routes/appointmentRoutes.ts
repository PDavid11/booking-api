import { Router } from "express";
import { appointmentController } from "../container.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";


const router = Router()

router.post("/", (req, res) => appointmentController.add(req, res))
router.get("/", (req, res) => appointmentController.getActive(req, res))

router.get("/:id", authMiddleware, (req, res) => appointmentController.getByID(req, res))
router.get("/status/:status", authMiddleware, (req, res) => appointmentController.getByStatus(req, res))
router.get("/employee/:employeeID", authMiddleware, (req, res) => appointmentController.getByEmployeeID(req, res))
router.patch("/", authMiddleware, (req, res) => appointmentController.modifyStatus(req, res))

export default router