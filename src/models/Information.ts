import mongoose from 'mongoose';
import { CategorySchema } from './Category';

const InformationSchema = new mongoose.Schema(
  {
    // category: {
    //   type: CategorySchema,
    //   required: false
    // },
    source: {
      type: String
    },
    photo: {
      type: String,
      required: false
    },
    statut: {
      type: String,
      enum: ['vraie', 'fausse', 'draft'],
      default: 'draft',
      required: true
    },
    paysOrigin: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
);

const Information = mongoose.model('Information', InformationSchema);
export { Information, InformationSchema };
