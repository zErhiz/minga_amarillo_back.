import Author from '../models/Author.js'


async function accountExistsSignUp(req,res,next) {
    const author = await Author.findOne({email: req.body.email})
    if (author) {
        return res.status(400).send('author already exist!')
        //resonder json con la misma forma de errores
    }
    return next()
}

export default accountExistsSignUp