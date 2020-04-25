import mongoose from "mongoose";

const FactCheckSchema = new mongoose.Schema(
  {
    lang: { type: String, required: true, default: "fr" },
    news: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "News",
    },
    checkedFact: { type: String },
    scentificArgument: {
      type: String,
    },
    links: {
      type: [String],
      required: false,
    },
    medias: {
      type: [String],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const FactCheck = mongoose.model("FactCheck", FactCheckSchema);

export { FactCheck, FactCheckSchema };
