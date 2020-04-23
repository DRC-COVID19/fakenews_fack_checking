import NewsController from "../controllers/news.controller";
import express from "express";
export const newsRouter = express.Router();

const {
  showIndex,
  showDetails,
  showVerificationRequest,
  search,
} = NewsController;

newsRouter.get("/", showIndex);
newsRouter.get("/search", search);
newsRouter.get("/request-verification", showVerificationRequest);
newsRouter.get("/:slug", showDetails);
