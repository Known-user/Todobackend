import express from "express";
import { register, getAllUsers, login, getMyDetail, logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all",getAllUsers)

router.get("/myprofile",isAuthenticated,getMyDetail)

router.post("/register",register)

router.post("/login",login)

router.post("/logout",logout)


export default router;




// router.route("/userId/:id").get(getMyDetail).put(updateUserById).delete(deleteUserById)
// router.get("/userId/:id",getUserById)
// router.put("/userId/:id",updateUserById)
// router.delete("/userId/:id",deleteUserById)
