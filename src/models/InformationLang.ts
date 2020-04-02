import mongoose from 'mongoose';
import { InformationSchema } from './Information';

const InformationLangSchema = new mongoose.Schema(
  {
    langue: { type: String, required: true },
    codeLangue: { type: String, required: true },
    informationID: { type: mongoose.Schema.Types.ObjectId },
    // information: { type: InformationSchema },
    titre: {
      type: String,
      unique: true,
      required: true
    },
    contenu: {
      type: String,
      unique: true,
      required: false
    },
    vraieInformation: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
);

const InformationLang = mongoose.model(
  'InformationLang',
  InformationLangSchema
);
export { InformationLang, InformationLangSchema };
