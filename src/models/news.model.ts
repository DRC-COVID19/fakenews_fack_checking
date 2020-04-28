import mongoose from "mongoose";
import { string, optional } from "joi";

const authorSchema = new mongoose.Schema({
  fullName: { type: String, required: false },
  email: { type: String, required: false },
});

const NewsSchema = new mongoose.Schema(
  {
    sources: [
      {
        // urls, etc.
        type: String,
        required: false,
      },
    ],
    media: [
      {
        // screenshots, pictures, ect
        type: String,
        required: false,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["true", "false", "draft"],
      default: "draft",
      required: false,
    },
    paysOrigin: {
      type: String,
      required: false,
    },
    author: {
      type: authorSchema,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    // factCheck: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "FactCheck",
    //   required: false,
    // },
    // newsLang: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "NewsLang",
    //   required: false,
    // },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model("News", NewsSchema);
export { News, NewsSchema };
