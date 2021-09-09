import mongoose, { Schema, Document } from "mongoose";
import joi, { string } from "joi";
const schema: Schema = new Schema({
    title_ar: {
        type: String,
        minlength:2,
        maxlength: 30,
        required: true,
    },
    title_en: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true,
    },
    IdCategory: { type: mongoose.Schema.Types.ObjectId, ref: "category" , require:true },
    img: {
        type: String,
        default: "uploads/event.png",
    }
});
export const subOfCategory = mongoose.model("subofcategories", schema);
export  function validatesubOfCategory(user: any) {
    const schema =  {
        title_ar: joi.string().min(2).max(30),
        title_en: joi.string().min(2).max(30),
        IdCategory: joi.any().required()
    };
    return joi.validate(user, schema);
}
export  function validatesubOfCategoryUpdate(user: any) {
    const schema =  {
        title_ar: joi.string().min(2).max(30),
        title_en: joi.string().min(2).max(30),
    };
    return joi.validate(user, schema);
}