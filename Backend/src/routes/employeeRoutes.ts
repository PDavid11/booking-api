import { Router } from "express";
import { employeeController } from "../container.js";

const router = Router()

router.post("/",  (req, res) => employeeController.add(req, res))
router.delete("/", (req, res) => employeeController.delete(req, res))
router.put("/", (req, res) => employeeController.modify(req, res))
router.get("/", (req, res) => employeeController.getAll(req, res))

export default router