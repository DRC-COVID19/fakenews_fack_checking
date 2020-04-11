import mongoose from 'mongoose';
import { CategorySchema } from '../category/category.model';




const NewsSchema = new mongoose.Schema(
  {
    category: {
      type: CategorySchema,
      required: false,
      ref:'Category',
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
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model('News', NewsSchema);
export { News, NewsSchema };
