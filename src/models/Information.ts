import mongoose from 'mongoose';

const InformationSchema = new mongoose.Schema({
  source: {
    type: String
  },
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
  photo: {
    type: String,
    required: false
  },
  veracite: {
    type: String,
    enum: ['vraie', 'fausse', 'draft'],
    default: 'draft',
    required: true
  },
  vraieInformation: {
    type: String,
    required: false
  },
  paysOrigin: {
    type: String,
    required: false
  }
});

const Information = mongoose.model('Information', InformationSchema);
export { Information };
