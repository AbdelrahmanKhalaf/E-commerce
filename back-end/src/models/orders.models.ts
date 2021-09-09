import mongoose, { Schema, Document } from "mongoose";
import joi from "joi";
const schema: Schema = new Schema({
    address_ar: {
        type: String,
        default:""
      
    },
    address_en: {
        type: String,
        default:""
    },
    count: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "users", require: true
    }
    ,
    prodactId: {
        type: mongoose.Schema.Types.ObjectId, ref: "prodacts", require: true
    },
    status:{
        type:Number,
       default:0
    },
    date:{
        type:Date,
        default:Date.now()
    },

    prodactDetails:{
        type:{
            prodactId:{
                type:String
            },
            sale:{
                type:Number
            },
            price:{
                type:Number
            },
            title_en:{
                type:String

            },
            img:{
                type:String
            }
        }
    }
    
});
export const Order = mongoose.model("orders", schema);
export  function validatOrder(user: any) {
    const schema =  {
        address_ar: joi.string(),
        address_en: joi.string(),
        price: joi.number(),
        count: joi.number().required(),
        userId: joi.string().required(),
        prodactId: joi.string().required(),
        status:joi.number()
    };
    return joi.validate(user, schema);
}
