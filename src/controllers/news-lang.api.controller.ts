import { NewsLang } from "../models/news-lang.model";
import createAPIController from "./lib";

const newsLangAPIController = createAPIController(NewsLang);
export default newsLangAPIController;
