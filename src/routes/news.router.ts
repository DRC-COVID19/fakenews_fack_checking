import NewsController from "../controllers/news.controller";
import express from "express";
export const newsRouter = express.Router();

const {
  index,
  show,
  requestVerification,
  requestVerificationForm,
} = NewsController;

newsRouter.get("/", index);
newsRouter.get("/:slug", show);
newsRouter.get("/request-verification", requestVerificationForm);
//newsRouter.post("/request-verification", requestVerification);
