import { Router } from "express";
import { GuestController } from "../controllers/guestController.js";
import { GuestService } from "../services/guestService.js";
import { GuestRepo } from "../repositories/guestRepo.js";

const router = Router()
const repo = new GuestRepo()
const service = new GuestService(repo)
const controller = new GuestController(service)

router.post("/", (req, res) => controller.add(req, res))
router.get("/:id", (req, res) => controller.getByID(req, res))

export default router