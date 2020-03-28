"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var news_routes_1 = require("./routes/news_routes");
var app = express_1.default();
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express_1.default.urlencoded({ extended: true }));
app.use(news_routes_1.newRouter);
var PORT = 3000 || process.env.PORT;
app.listen(PORT, function () {
    console.log("Le server \u00E9coute sur le port " + PORT);
});
