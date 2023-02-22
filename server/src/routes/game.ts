import { Router } from "express"

import {
    getGameById,
    searchGameByName
} from "../controller/game"

const router = Router();

router.post("/", getGameById);
router.post("/search", searchGameByName);

export default router;