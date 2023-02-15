import { Router } from "express"

import {
    createUser,
    getUserByName,
    getAllUsers,
    getAllUserReviews,
    logUser,
    refreshUserAccess
} from "../controller/user"

const router = Router();

router.post("/", createUser);
router.post("/login", logUser);
router.post("/refresh", refreshUserAccess);
router.get("/", getUserByName);
router.get("/all", getAllUsers);
router.get("/reviews", getAllUserReviews);

export default router;