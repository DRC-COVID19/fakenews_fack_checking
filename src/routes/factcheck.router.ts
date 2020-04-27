import FactCheckController from "../controllers/factcheck.controller";
import express from "express";

export const factCheckRouter = express.Router();

const { showIndex, showDetails, search } = FactCheckController;
factCheckRouter.get("/", showIndex);
factCheckRouter.get("/search", search);
factCheckRouter.get("/:slug", showDetails);
