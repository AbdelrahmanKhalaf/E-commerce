import mongoose, { Schema,Document } from "mongoose";
import joi from "joi";
const schema: Schema = new Schema({
  orderId: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"orders",
    required: true,
  }, 
  status: {
    type: Number,
    required: true,
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required: true,
  },
  prodactId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"prodacts",
    required: true,
  },
  titleProdact:{
    type:String
  },
  idToView:{
    type:String
  },
  count:{
    type: Number,
    required: true
  },
  date:{
      type:Date,
      default:Date.now()
  }
});
export const Inventary = mongoose.model("inventary", schema);
export  function validatInventary(user: any) {
  const schema =  {
    orderId: joi.string().required(),
    prodactId: joi.string().required(),
    userId: joi.string().required(),
    count: joi.number().required(),
    status: joi.number().required(),
  };
  return joi.validate(user, schema);
}
