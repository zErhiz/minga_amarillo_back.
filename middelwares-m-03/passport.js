/* import passport from "passport";
import passportJwt from "passport-jwt";
import Manga from "../models/Manga";

passport.use(
    new passportJwt.Strategy({
        jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET
    },				
    async (jwt_payload,done) => {
        try {				
            let user = await Manga.findOne({_id:jwt_payload.id})
            if (user) {		
                return done(null, Manga)
            } else {
                return done(null, false)
            }
        } catch (error) {
            console.log(error)
            return done(error,false)
        }
    }
))
export default passport */