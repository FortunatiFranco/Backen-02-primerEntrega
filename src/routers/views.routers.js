import { Router } from "express";
import { customPassportCall } from "../util.js";


const router = Router();

router.get("/login", async (req, res) => {
    res.render("login");
})

router.get("/register", async (req, res) => {
    res.render("register");
})

router.get("error-register", async (req, res) => {
    res.send("El registro fallo.");
})

router.use(customPassportCall("jwt"));

router.get("/profile", async (req, res) => {
    res.render("profile", {
        user: req.user || req.session.user
    })
})


export default router;