import NewsController from '../api/news.api.controller';
import express from "express";

export const newsAPIRouter = express.Router();


const { search, create } = NewsController;



newsAPIRouter.get('/search', search);
newsAPIRouter.post('/',create);
// newsRouter.get('/:id', show);
// newsRouter.post('/delete/:id', destroy);
