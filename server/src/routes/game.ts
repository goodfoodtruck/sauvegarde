import { Router } from "express"

import {
    getGameById,
    getGameBySlug,
    searchGameByName
} from "../controller/game"

const router = Router();

router.post("/slug", getGameBySlug);
router.post("/search", searchGameByName);
router.post("/id", getGameById);

export default router;