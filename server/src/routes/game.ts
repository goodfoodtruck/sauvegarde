import { Router } from "express"

import { getGameById } from "../controller/game"

const router = Router();

router.post("/", getGameById);

export default router;