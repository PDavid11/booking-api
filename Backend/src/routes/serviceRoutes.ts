import { Router } from "express";
import { ServiceController } from "../controllers/serviceController.js";
import { ServiceService } from "../services/serviceService.js";
import { ServiceRepo } from "../repositories/serviceRepo.js";

const router = Router()
const repo = new ServiceRepo()
const service = new ServiceService(repo)
const controller = new ServiceController(service)

router.post("/", (req, res) => controller.add(req, res))
router.delete("/", (req, res) => controller.delete(req, res))
router.put("/", (req, res) => controller.modify(req, res))

export default router