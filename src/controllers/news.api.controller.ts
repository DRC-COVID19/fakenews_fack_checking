import { News } from "../models/news.model";
import createAPIController from "./lib";

const newsAPIController = createAPIController(News);
export default newsAPIController;
