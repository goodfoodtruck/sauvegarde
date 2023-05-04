import { Router } from "express"
import {
    createReview,
    getAllGameReviews,
    getAllReviews
} from "../controller/review"

const router = Router();

router.post("/create", createReview);
router.post("/game", getAllGameReviews);
router.get("/all", getAllReviews);

export default router;