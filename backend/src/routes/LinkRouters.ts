import { Router } from "express";
import LinkController from "../controllers/LinkController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router()

// Rotas protegidas (requerem JWT)
router.post("/links", authMiddleware, LinkController.create)
router.get("/links/:code/stats", authMiddleware, LinkController.getStats)

// Rota pública (redirect)
router.get("/:shortUrl", LinkController.redirect)


export default router
