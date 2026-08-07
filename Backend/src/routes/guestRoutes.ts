import { Router } from "express";
import { guestController } from "../container.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const router = Router()

router.post("/", authMiddleware, (req, res) => guestController.add(req, res))
router.get("/:id", authMiddleware, (req, res) => guestController.getByID(req, res))

export default router