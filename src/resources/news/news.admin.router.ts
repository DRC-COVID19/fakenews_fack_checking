import  news  from './news.admin.controller';
import express from 'express';
export const newsAdminRouter = express.Router();




const { addInformation, home, destroy } = news;
//cette route dois renvoyer le formulaire de creation d'information dans la backoffice
newsAdminRouter.get('/new', addInformation);

//Cette route mene à liste de toutes les news dans le Backoffice
newsAdminRouter.get('/', home);

newsAdminRouter.post('/delete/:id', destroy);
