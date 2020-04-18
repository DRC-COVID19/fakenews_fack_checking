import mongoose from 'mongoose';
import { CategorySchema } from '../category/category.model';
import { FactCheckSchema } from '../factcheck/factcheck.model';
import {UserSchema} from "../user/user.model";
import Joi, { ValidationResult } from "joi";


const authorSchema=new mongoose.Schema({
  fullName:String,
  email:{
    type:String,
    required:true,
  }
});

const validateAuthor=function(body:any):ValidationResult<any>{
  const schema={
    fullName:Joi.string().min(2),
    email:Joi.string().email().required().label("Email vide ou invalide"),
  }
  return Joi.validate(body,schema);
}


const validateNews=function(){
  //news validation
}

const NewsSchema = new mongoose.Schema(
  {
    // category: {
    //   type: CategorySchema,
    //   required: false,
    //   ref: 'Category',
    // },

    source: {
      type: String,
    },

    photo: {
      type: String,
      required: false,
    },

    status: {
      type: String,
      enum: ['true', 'false', 'draft'],
      default: 'draft',
      required: true,
    },

    paysOrigin: {
      type: String,
      required: false,
    },

    factCheck: {
      type: FactCheckSchema,
      required: false,
    },

    author: {
      type: authorSchema,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model('News', NewsSchema);
export { News, NewsSchema,validateAuthor };
