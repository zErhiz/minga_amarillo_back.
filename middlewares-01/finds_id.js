
import Author from "../models/Author.js";
import Company from '../models/Company.js'
async function finds_id(req, res, next){
    const author = await Author.findOne({ user_id: req.user.id })
    if(!author){
        return res.status(400).json({
            message:'Author not found'
        })
    }
    req.body.author_id=author._id
    const company = await Company.findOne({user_id: req.user.id})
    if(!company){
        return res.status(400).json({
            message:'company not found '
        })
    }
    req.body.company_id=company.id
     next()
}
export default finds_id