import mongoose from 'mongoose';

const InformationSchema = new mongoose.Schema({
  informationID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
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
});

const Information = mongoose.model('Information', InformationSchema);
export { Information };
