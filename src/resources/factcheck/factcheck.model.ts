import mongoose from "mongoose";

const FactCheckSchema = new mongoose.Schema(
  {
    lang: { type: String, required: true, default: 'french' },
    langIsoCode: { type: String, required: true, default: 'fr' },
    news: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'News',
    },
    content: {
      type: String,
    },
    links: {
      type: [String],
      required: true,
    },
    medias: {
      type: [String],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const FackCheck=mongoose.model('FactCheck',FactCheckSchema);

export {FackCheck,FactCheckSchema};
