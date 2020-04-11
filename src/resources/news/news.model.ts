import mongoose from 'mongoose';
import { CategorySchema } from '../category/category.model';
import { FactCheckSchema } from '../factcheck/factcheck.model';
import {UserSchema} from "../user/user.model";


const NewsSchema = new mongoose.Schema(
  {
    category: {
      type: CategorySchema,
      required: false,
      ref: 'Category',
    },
    source: {
      type: String,
    },

    photo: {
      type: String,
      required: false,
    },
    statut: {
      type: String,
      enum: ['vraie', 'fausse', 'draft'],
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
    author:{
      type:UserSchema,
      required:false,
    }
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model('News', NewsSchema);
export { News, NewsSchema };
