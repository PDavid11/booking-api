import { availableSlotController } from "../container.js"
import { Router } from "express"
import { authMiddleware } from "../middlewares/authMiddleware.js"

const router = Router()

router.get("/", (req, res) => availableSlotController.getAll(req, res))
router.get("/:id", (req, res) => availableSlotController.getByID(req, res))

router.post("/", authMiddleware, (req, res) => availableSlotController.add(req, res))
router.delete("/:id", authMiddleware, (req, res) => availableSlotController.delete(req, res))

export default router