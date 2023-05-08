
import createHttpError from "http-errors";

import Chapter from "../../models/Chapter.js";

let create = async(req, res, next)=>{
    try {
        req.body.manga_id = "64496465077201479936119e";
        
        let one = new Chapter(req.body)
        await one.save()
        return res.status(201).json({
            success: true,
            message: req.body,

        })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "ERROR CREATING CHAPTER",
        })
    }
}

export default create