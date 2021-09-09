import mongoose, { Schema, Document } from "mongoose";
import joi, { string } from "joi";
const schema: Schema = new Schema({
  attributes: {
    type: [
      {
        key_ar: { type: String, require: true },
        key_en: { type: String, require: true },
        value_ar: { type: String, require: true },
        value_en: { type: String, require: true },
      },
    ],
  },
  price: {
    type: Number,
  },
  sale: {
    type: Number,
    max: [100, "pless max sale is 100"],
    min: 0,
  },
  endsale: {
    type: Date,
  },
  kindOfCategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subofcategories",
      require: [true, "pleass add subofcategories"],
    },
  ],
  img:{
    type:[
      {
        img:{
          type:String
        }
        
      }
    ],
    default:{
      img:'uploads/event1.jpg'
    },
  },
  dateOut: {
    type: Date,
    default: Date.now(),
  },
  des_ar: {
    type: String,
    required: true,
    maxlength: 500,
  },
  des_en: {
    type: String,
    required: true,
    maxlength: 500,
  },
  keywords: {
    type: String,
    required: true,
    maxlength: 500,
  },
  title_ar: {
    type: String,
    required: true,
    maxlength: 100,
  },
  title_en: {
    type: String,
    required: [true, "pleas add title "],
    maxlength: 100,
  },
});
export const Prodact = mongoose.model("prodacts", schema);
export interface IProdact {
  kindOfCategory: Array<string>;
  price: Number;
  sale: Number;
  title_ar: String;
  title_en: String;
  keywords: String;
  des_ar: String;
  des_en: String;
  attributes: Array<String>;
  endsale: Date;
}
export function validateProdact(prodact: any) {
  const schema = {
    attributes: joi.array().required(),
    price: joi.number(),
    category: joi.string().min(1).max(250),
    sale: joi.number().required(),
    img: joi.string().min(1).max(250),
    kindOfCategory: joi.array().required(),
    des_ar: joi.string().max(500).required(),
    des_en: joi.string().max(500).required(),
    keywords: joi.string().max(500).required(),
    title_ar: joi.string().max(100).required(),
    title_en: joi.string().max(100).required(),
    endsale: joi.date(),
  };

  return joi.validate(prodact, schema);
}
export function validateProdactUpda(user: any) {
  const schema = {
    key_ar: joi.string().min(1).max(250).required(),
    key_an: joi.string().min(1).max(250).required(),
    value_ar: joi.string().min(1).max(250).required(),
    value_en: joi.string().min(1).max(250).required(),
  };
  return joi.validate(user, schema);
}
export function validatecategory(user: any) {
  const schema = {
    kindOfCategory: joi.array().required(),
  };
  return joi.validate(user, schema);
}
