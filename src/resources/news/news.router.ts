import NewsController from "./news.controller";
import express from "express";
export const newsRouter = express.Router();

const {
  index,
  show,
  requestVerification,
  requestVerificationForm,
} = NewsController;

newsRouter.get("/", index);
newsRouter.get("/request-verification", requestVerificationForm);
//newsRouter.post("/request-verification", requestVerification);
newsRouter.get("/:slug", show);
