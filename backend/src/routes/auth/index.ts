import {Router} from "express"
import passport from "passport"


const router = Router()

router.get("/discord", passport.authenticate('discord'), (req, res) => {
    res.send(200)
})

router.get("/discord/redirect", passport.authenticate('discord'), (req, res) => {
    res.redirect(`http://localhost:5173/dashboard`)
})

export default router