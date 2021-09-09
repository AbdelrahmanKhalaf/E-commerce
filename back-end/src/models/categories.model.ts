import mongoose, { Schema,Document } from "mongoose";
import joi from "joi";
const schema: Schema = new Schema({
  title_ar: {
    type: String,
    minlength: 1,
    maxlength: 30,
    required: true,
  }, title_en: {
    type: String,
    minlength: 1,
    maxlength: 30,
    required: true,
  },
});
export const Category = mongoose.model("category", schema);
export  function validatCategory(user: any) {
  const schema =  {
    title_ar: joi.string().min(1).max(250),
    title_en: joi.string().min(1).max(250),
  };
  return joi.validate(user, schema);
}
