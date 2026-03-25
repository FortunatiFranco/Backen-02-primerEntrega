import { generateToken } from "../util.js";
import { UsersDTO } from "../models/dto/UsersDTO.js";

export async function current(req, res) {
    res.send(new UsersDTO().sessionData(req.user));
}

export async function controllerLogin(req, res) {
    const token = generateToken(req.user);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });
    return res.redirect("/profile");
}

export async function controllerLogout(req, res) {
    req.user = null;
    res.clearCookie("jwt").send("Sesion finalizada con exito !!");
}