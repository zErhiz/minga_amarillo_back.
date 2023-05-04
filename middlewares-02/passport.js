import passport from "passport";
import passportJwt from 'passport-jwt'
import User from '../models/User.js'

passport.use(
    new passportJwt.Strategy(   //desarrolla una estrategia de extracción para extraer el token. 
        {
            jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.TOKEN
        },
        async (jwt_payload, done) => { // si devuelve algo, esta en el jwt_payload, son solamente los datos codificados no es todo. 
            try {
                let user = await User.findOne({ _id: jwt_payload.id }) //para autenticar un usuario del payload, accedo al id y busco el usuario
                if (user) {
                    user.password = null
                    return done(null, user) // el done nos permite configurar que pasa si exiten errores y que pasa si no, si existe user se inyecta en el req
                } else {
                    return done(null, false) //
                }
            } catch (error) {
                console.log(error)
                return done(error, false)
            }
        })
)

export default passport