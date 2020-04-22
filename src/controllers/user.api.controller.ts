import { User } from "../models/user.model";
import createAPIController from "./lib";

const userAPIController = createAPIController(User);
export default userAPIController;
