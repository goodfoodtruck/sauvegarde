import { Router } from "express"
import { createReview } from "../controller/review"

const router = Router();

router.post("/", createReview);

export default router;