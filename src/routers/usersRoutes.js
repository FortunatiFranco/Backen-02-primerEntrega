import { Router } from "express";
import passport from "passport";
import { deleteUser, getAll, updateUser } from "../controllers/userControllers.js";

const router = Router();

router.get("/get-all", getAll);

router.post("/", passport.authenticate("register", { failureRedirect: "/error-register", successRedirect: "/login", session: false }))

router.put("/", updateUser);

router.delete("/", deleteUser);

export default router;