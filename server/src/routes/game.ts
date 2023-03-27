import { Router } from "express"

import {
    getGameBySlug,
    searchGameByName
} from "../controller/game"

const router = Router();

router.post("/slug", getGameBySlug);
router.post("/search", searchGameByName);

export default router;