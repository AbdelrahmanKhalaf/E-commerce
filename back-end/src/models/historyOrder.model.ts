import mongoose, { Schema, Document } from "mongoose";
import joi, { string } from "joi";
import { ObjectId } from "mongodb";
const schema: Schema = new Schema({
    prodact: {
        type: {
            name:{
                type:String,
                require:true
            },
            idProdact:{
                type:String,
                require:true
            },
            delete:{
                type:Boolean,
                default:false,
                require:true
            }
        }  
    },
    prodactId:{
        type:String,
        required:true 
    },
   outDate: {
        type: Date,
        default:Date.now(),
        required: true,
    },
    userId: {
        type: ObjectId, ref: "users", require: true
    },
    status:{
        type:String,
        required:true
    },

});
export const History = mongoose.model("history", schema);
export  function validatHistory(history: any) {
    const schema  = {
        userId: joi.string().required(),
        prodactId: joi.string().required(),
        status:joi.string().required(),
    };
    return joi.validate(history, schema);
}
