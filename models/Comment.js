
import { Schema, Types, model } from "mongoose";
let schema = new Schema({
    chapter_id:{type:Types.ObjectId, ref:'chapters', required:true},
    user_id:{type:Types.ObjectId, ref:'users', required:true},
    comment:{type:String, required:true},
    
    
},{
timestamps:true
})

let collection = 'comments'
 let Comment = model(collection,schema)
 export default Comment