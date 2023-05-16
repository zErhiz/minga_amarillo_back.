
import Author from "../models/Author.js";
import Company from '../models/Company.js'

async function finds_id(req, res, next){
    try {
        const author = await Author.findOne({ user_id: req.user._id })
        console.log(author);
        if(author){
            req.body.author_id = author._id;
            return next()
        } 
        
        const company = await Company.findOne({user_id: req.user._id})
        if(company){
            
            req.body.company_id=company._id
             return next()
        }

    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
    
}
export default finds_id