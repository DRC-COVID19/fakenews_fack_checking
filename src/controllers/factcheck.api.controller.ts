import { FactCheck } from "../models/factcheck.model";
import createAPIController from "./lib";

const factCheckAPIController = createAPIController(FactCheck);
export default factCheckAPIController;
