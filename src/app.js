import express from "express";
import __dirname from "./util.js";
import mongoSingleton from "./config/database.js";
import cookieParser from "cookie-parser";
import usersRouter from "./routers/usersRoutes.js";
import sessionsRouter from "./routers/sessions.routes.js"
import viewsRouter from "./routers/views.routers.js"
import handlebars from "express-handlebars";
import passport from "passport";
import initializePassport from "./config/passport.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import { env } from "./config/env.js";

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(passport.initialize());

initializePassport();

app.use(session({
    cookie: {
        maxAge: 3600000,
        httpOnly: true
    },
    store: MongoStore.create({
        mongoUrl: "mongodb://localhost:27017/backend-02",
        ttl: 60,
        autoRemove: "interval",
        autoRemoveInterval: 70
    }),
    secret: "soyelsecretito",
    resave: false,
    saveUninitialized: false
}));


app.use(cookieParser());

app.use("/api/users", usersRouter);
app.use("/api/sessions", sessionsRouter)
app.use("/", viewsRouter)


app.listen(env.PORT, () => {
    console.log(`Servidor escuchando en puerto ${env.PORT}`);
    mongoSingleton.getInstance();
})