import mongoose from "mongoose";

// @ts-ignore
import slug from "mongoose-slug-generator";
mongoose.plugin(slug);

const FactCheckSchema = new mongoose.Schema(
  {
    news: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "News",
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    titleQuestion: { type: String, required: false },
    claim: { type: String, required: false },
    verdict: {
      type: String,
      enum: ["true", "false", "draft"],
      default: "draft",
      required: true,
    },
    checkedFact: { type: String, required: true },
    scentificArgument: { type: String, required: true },
    source: { type: String, required: true },
    links: { type: [String], required: false },
    media: { type: [String], required: false },
    lang: { type: String, required: true, default: "fr" },
    publishedAt: { type: Date },
    slug: { type: String, slug: ["claim"], unique: true },
  },
  {
    timestamps: true,
  }
);

const FactCheck = mongoose.model("FactCheck", FactCheckSchema);

export { FactCheck, FactCheckSchema };
