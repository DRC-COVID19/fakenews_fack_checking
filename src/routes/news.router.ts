import NewsController from "../controllers/news.controller";
import express from "express";

export const newsRouter = express.Router();

const { showVerificationRequest } = NewsController;
newsRouter.get("/request-verification", showVerificationRequest);
