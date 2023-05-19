import { Schema, Types, model } from "mongoose";
let schema = new Schema({
    comment:{type:String, required:true},
    is_online:{type:Boolean, required:false},
    is_verified:{type:Boolean, required:false}
},{
timestamps:true
})

let collection = 'comments'
 let Comment = model(collection,schema)
 export default Comment