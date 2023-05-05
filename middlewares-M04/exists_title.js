import Manga from "../models/Manga.js"

async function exits_title(req, res, next){
    const title = await Manga.findOne({title : req.body.title})
    if(title){
        return res.status(400).json({
            succes: false,
            message:" - This title alredy exist!!"})
    }
    return next()
}

export default exits_title
