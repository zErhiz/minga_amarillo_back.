import Chapter from "../../models/Chapter.js";

let destroy = async(req,res,next) => {
    try {
        let destroyed = await Chapter.deleteOne({_id: req.params.id})
        // console.log(destroyed);
        return res.status(200).json({
            succes: true,
            destroyed,
            message: "Capitulo eliminado",
        })
    } catch (error) {
        next(error)
    }
}

export default destroy