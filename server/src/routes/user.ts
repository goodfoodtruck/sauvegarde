import { Router } from "express"

import {
    createUser,
    getUserByName,
    getUserNameById,
    getAllUsers,
    getAllUserReviews,
    logUser,
    refreshUserAccess
} from "../controller/user"

const router = Router();

router.post("/register", createUser);
router.post("/login", logUser);
router.post("/refresh", refreshUserAccess);
router.get("/", getUserByName);
router.post("/name", getUserNameById);
router.get("/all", getAllUsers);
router.get("/reviews", getAllUserReviews);

export default router;