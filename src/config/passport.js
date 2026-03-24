import passport from "passport"
import { Strategy as localStrategy } from "passport-local";
import { cookieExtractor, hashPassword, verifyPassword } from "../util.js";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import { env } from "./env.js";
import userDAO from '../models/dao/userMongoDAO.js'


function initializePassport() {
    passport.use("register", new localStrategy({
        passReqToCallback: true,
        usernameField: "email",
        passwordField: "password",
    },
        async (req, email, password, done) => {
            try {
                const user = req.body;
                const userExist = await userDAO.getByEmail({ email });
                if (userExist) {
                    console.log("Usuario ya existente");
                    return done(null, false);
                }
                const hashedPassword = hashPassword(password);
                const newUser = await userDAO.create({ ...user, password: hashedPassword })
                return done(null, newUser);
            } catch (error) {
                console.error(error);
            }
        }));
    passport.use("login", new localStrategy({
        usernameField: "email",
        passwordField: "password",
        session: true
    },
        async (email, password, done) => {
            try {
                const user = await userDAO.getByEmail({ email });
                if (!user) {
                    return done(null, false);
                }
                if (verifyPassword(password, user.password)) {
                    return done(null, user)
                } else {
                    return done(null, false);
                }
            } catch (error) {
                return done(error.message);
            }
        }
    ));
    passport.use("jwt", new jwtStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: env.TOKEN_SECRET
    },
        async (payload, done) => {
            try {
                return done(null, payload)
            } catch (error) {
                return done(error);
            }
        }
    ));
    passport.serializeUser((user, done) => {
        return done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        const user = await userDAO.getById(id);
        return done(null, user);
    });
}

export default initializePassport;