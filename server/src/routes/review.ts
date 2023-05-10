import { Router } from "express"
import {
    createReview,
    destroyReview,
    getAllGameReviews,
    getAllReviews
} from "../controller/review"

const router = Router();

router.post("/create", createReview);
router.post("/game", getAllGameReviews);
router.get("/all", getAllReviews);
router.delete("/delete", destroyReview);

export default router;