import { Router } from "express";
import { employeeController } from "../container.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router()

router.get("/", (req, res) => employeeController.getAll(req, res))
router.post("/", authMiddleware, (req, res) => employeeController.add(req, res))
router.delete("/", authMiddleware, (req, res) => employeeController.delete(req, res))
router.put("/", authMiddleware, (req, res) => employeeController.modify(req, res))

export default router