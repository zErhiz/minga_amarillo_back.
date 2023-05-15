import Chapter from "../../models/Chapter.js"

let get_me = async(req,res,next) => {
    try {
        let all = await Chapter.find({manga_id : req.params.id})
        console.log(all);
    } catch (error) {
        next(error)
    }
}
export default get_me