import { Router } from "express";
import { serviceController } from "../container.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const router = Router()

router.post("/", (req, res) => serviceController.add(req, res))
router.delete("/", authMiddleware, (req, res) => serviceController.delete(req, res))
router.put("/", authMiddleware, (req, res) => serviceController.modify(req, res))
router.get("/", (req, res) => serviceController.getAll(req, res))

export default router