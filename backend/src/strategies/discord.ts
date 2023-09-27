import {Profile, Strategy as DiscordStrategy} from "passport-discord"
import passport from "passport"
import {VerifyCallback} from "passport-oauth2"
import {User} from "../exports"

passport.serializeUser((user: any, done) => {
    return done(null, user.id)
})

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id)
        return user ? done(null, user): done(null, null)
    } catch (err) {
        console.log(err)
        return done(err, null)
    }
})

passport.use(
    new DiscordStrategy(
        {
            clientID: process.env.id,
            clientSecret: process.env.secret,
            callbackURL: process.env.callback,
            scope: ["identify", "guilds"],
        },
        async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
            const {id: discordId} = profile
            try {
                const existingUser = await User.findOneAndUpdate({discordId}, {accessToken, refreshToken}, {new: true})
                if (existingUser) return done(null, existingUser)

                const newUser = new User({discordId, accessToken, refreshToken})
                const savedUser = await newUser.save()
                return done(null, savedUser)
            } catch (err) {
                console.log(err)
                return done(err, null)
            }
        }
    )
)