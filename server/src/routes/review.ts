import { Router } from "express"
import { createReview, getAllReviews } from "../controller/review"

const router = Router();

router.post("/", createReview);
router.get("/all", getAllReviews);

export default router;