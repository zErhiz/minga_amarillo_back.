import Manga from "../models/Manga.js"

async function exits_title(req, res, next){
    const title = await Manga.findOne({tittle : req.body.title})
    if(title){
        return res.status(400).json(" - This title alredy exist!!")
    }
    return next()
}

export default exits_title


// import User from '../models/User.js'

// async function accountExistsSignUp(req,res,next) {
//     const user = await User.findOne({email: req.body.email})
//     if (user) {
//         return res.status(400).send('user already exist!')
//     }
//     return next()
// }

// export default accountExistsSignUp