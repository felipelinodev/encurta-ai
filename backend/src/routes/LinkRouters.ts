import { Router } from "express";
import LinkController from "../controllers/LinkController";

const router = Router()

router.post("/links", LinkController.create)

router.get("/links/:code/stats", LinkController.getStats)

router.get("/:shortUrl", LinkController.redirect)


export default router
