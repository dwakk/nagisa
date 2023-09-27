import express, {Express} from 'express';
import {router} from '../routes/api';
import cors from "cors"
import session from "express-session"
import passport from "passport"
import store from "connect-mongo"
import { urlencoded } from 'body-parser';

require("../strategies/discord")


export function createApp(): Express {
    const app = express();

    app.use(express.json())
    app.use(urlencoded({extended: true}))

    app.use(cors({ origin: ["http://localhost:5173"], credentials: true }))
    app.use(session({
        secret: "ZFOMEGODPA",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000*60*24*7, httpOnly: false },
        store: store.create({mongoUrl: "mongodb://localhost:27017/nagisa"})
    }))

    app.use(passport.initialize())
    app.use(passport.session())


    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Credentials", "true");
        next();
      });
      

    app.use("/api", router)
    return app;
}