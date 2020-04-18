import express, { Request, Response } from 'express';
import cors from "cors"
import {newsAPIRouter,newsAdminRouter,newsRouter} from "./resources/index.router";
import {config} from "dotenv";

const app:express.Application = express();

config();

//Loading config for the execution environment
if (app.get('env') === 'production') {
  require('dotenv').config({ path: './prod.env' });
} else {
  require('dotenv').config({ path: './dev.env' });
}

import './database/db.start';

app.engine('ejs', require('express-ejs-extend')); // add this line
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

app.get(/^\/?$/i, (req: Request, res: Response) => {
   return res.redirect('/news');
});


app.use(/^\/api\/news(?=\/|$)/i, newsAPIRouter);
app.use(/^\/admin(?=\/|$)/i, newsAdminRouter);
app.use(/^\/news(?=\/|$)/i, newsRouter);



const PORT = 5000 || process.env.PORT;

app.listen(PORT, ():void => {
  console.log( 
    `Le server écoute sur le port ${PORT}\nEnvironement : ${app.get('env')}`
  );
});
