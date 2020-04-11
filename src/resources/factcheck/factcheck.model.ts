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
      unique: true,
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

export const FackCheck=mongoose.model('FactCheck',FactCheckSchema);
