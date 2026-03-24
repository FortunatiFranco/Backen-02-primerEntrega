import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import { env } from "./config/env.js";

const filePath = fileURLToPath(import.meta.url);
const __dirname = dirname(filePath);

export function generateToken(user) {
    return jwt.sign(user, env.TOKEN_SECRET);
}

export function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export function verifyPassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword)
}

export function cookieExtractor(req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies.jwt;
    }
    return token;
}


export function customPassportCall(strategy) {
    return async (req, res, next) => {
        passport.authenticate(strategy, (error, user, info) => {
            if (error) return next(error)
            if (!user) {
                return res.status(401).json({ error: info.message ? info.message : info.toString() })
            }
            req.user = user;
            next();
        })(req, res, next)
    }
}

export default __dirname;