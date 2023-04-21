import mongoose from "mongoose";
import { boolean } from "webidl-conversions";
let schema = new mongoose.Schema(
    {
        email: {type:String , required:true},
        password:{type:String , required:true},
        photo:{type: String , required:true},
        role:{type:Number , required:true},
        is_online:{type:Boolean, required:true},
        is_verified:{type:Boolean, required:true},
        verify_code:{type: String , required:true},
    },
    {
        timestamps: true
    })
    let collection = 'users' //debe ser siempre en plural por que es un conjunto de datos/documentos/recursos y en lo posible en minuscula
    let User = mongoose.model(schema, collection)
    export default User