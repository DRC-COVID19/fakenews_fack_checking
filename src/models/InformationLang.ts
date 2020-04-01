import mongoose from 'mongoose';

const InformationLangSchema = new mongoose.Schema({
  langue: { type: String, required: true },
  codeLangue: { type: String, required: true },
  informationKey: { type: mongoose.Schema.Types.ObjectId },
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
});

const InformationLang = mongoose.model(
  'InformationLang',
  InformationLangSchema
);
export { InformationLang };
