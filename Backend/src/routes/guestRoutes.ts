import { Router } from "express";
import { guestController } from "../container.js";

const router = Router()

router.post("/", (req, res) => guestController.add(req, res))
router.get("/:id", (req, res) => guestController.getByID(req, res))

export default router