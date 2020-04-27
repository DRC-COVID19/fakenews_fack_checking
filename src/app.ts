import express, { Request, Response } from "express";
import { newsRouter, factCheckRouter } from "./routes/index.router";
import { config } from "dotenv";

const cors = require("cors");

// Controllers (route handlers)
import newsAPIController from "./controllers/news.api.controller";
import factCheckAPIController from "./controllers/factcheck.api.controller";
import userAPIController from "./controllers/user.api.controller";
import newsLangAPIController from "./controllers/news-lang.api.controller";

// API router
import createAPIRouter from "./routes/lib";

// migration
import { up, down } from "./lib/1587897682264-schema_change";

const app: express.Application = express();

app.use(cors());

//config();

//Loading config for the execution environment
if (app.get("env") === "production") {
  config({ path: "./prod.env" });
} else {
  config({ path: "./dev.env" });
}

import "./lib/db.start";
// up();

app.engine("ejs", require("express-ejs-extend")); // add this line
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(express.static("build/admin"));

/**
 * Primary app routes.
 */
app.get(/^\/?$/i, (req: Request, res: Response) => {
  return res.redirect("/factchecks");
});

// app.use(/^\/?$/i, newsRouter);
app.use(/^\/news(?=\/|$)/i, newsRouter);
app.use(/^\/factchecks(?=\/|$)/i, factCheckRouter);

/**
 * API routes.
 */
app.use(/^\/api\/news(?=\/|$)/i, createAPIRouter(newsAPIController));
app.use(/^\/api\/checks(?=\/|$)/i, createAPIRouter(factCheckAPIController));
app.use(/^\/api\/users(?=\/|$)/i, createAPIRouter(userAPIController));
app.use(/^\/api\/newslang(?=\/|$)/i, createAPIRouter(newsLangAPIController));

app.set("port", process.env.PORT || 5000);

export default app;
