import createHttpError from "http-errors";
import Chapter from "../../models/Chapter.js";

let create = async(req, res, next)=>{
    try {
        req.body.manga_id = "644964650772014799361196";
        req.body.cover_photo = "https://i.postimg.cc/q76GttJr/alice-in-borderland-001-01.jpg";

        let one = new Chapter(req.body)
        await one.save()
        return res.status(201).json({
            user: one,
            succes: true,

        })
        
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export default create