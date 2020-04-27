import mongoose from "mongoose";

const NewsLangSchema = new mongoose.Schema(
  {
    // lang: { type: String, required: true },
    // langISOCode: { type: String, required: true },
    news: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "News" },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const NewsLang = mongoose.model("NewsLang", NewsLangSchema);
export { NewsLang };
