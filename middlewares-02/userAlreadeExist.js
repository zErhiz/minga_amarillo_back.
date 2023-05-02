import Author from '../models/Author.js'


async function userAlreadeExist(req,res,next) {
    const author = await Author.findOne({name: req.body.name})
    if (author) {
        return res.status(400).send('author already exist!')
        //resonder json con la misma forma de errores
    }
    return next()
}

export default userAlreadeExist