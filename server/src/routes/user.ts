import { Router } from "express"

import {
    createUser,
    getUserByName,
    getUserById,
    getAllUsers,
    getAllUserReviews,
    logUser,
    refreshUserAccess,
    getUserBySlug
} from "../controller/user"

const router = Router();

router.post("/register", createUser);
router.post("/login", logUser);
router.post("/refresh", refreshUserAccess);
router.get("/", getUserByName);
router.post("/id", getUserById);
router.post("/slug", getUserBySlug);
router.get("/all", getAllUsers);
router.post("/reviews", getAllUserReviews);

export default router;