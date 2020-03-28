"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppRouter_1 = require("../AppRouter");
var NewsController_1 = require("../controllers/NewsController");
exports.newRouter = AppRouter_1.AppRouter.getInstance();
exports.newRouter.get('/', NewsController_1.NewsController.home());
