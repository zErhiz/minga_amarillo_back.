import Chapter from "../../models/Chapter.js";

let get_one = async(req,res, next) => {
    try {
        // let {manga_id} = req.params
        let all = await Chapter.findById(req.params.id).select("pages title order -_id")
        // console.log(all);
        
       
        
        if(all){
            return res.status(200).json({
                succes: true,
                all,
            })
        }
            return res.status(404).json({
                response: "the chapter was not found"
            })
         
    } catch (error) {
        next(error)
    }
}

export default get_one