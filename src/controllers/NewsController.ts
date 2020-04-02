import { Request, Response } from 'express';
import { Information } from '../models/Information';
export class NewsController {
  static home() {
    return async function(req: Request, res: Response) {
      const news = await Information.find().select(
        '_id source titre contenu photo veracite'
      );
      console.log('DATA : ', news);
      res.render('pages/home', { news, title: 'Bienvenu' });
    };
  }

  static show() {
    return async function(req: Request, res: Response) {
      const {
        params: { id }
      } = req;
      try {
        const news = await Information.findById(id).select(
          '_id source titre contenu photo veracite'
        );
        if (news) {
          return res.render('pages/details-info', { news });
        } else {
          return res.render(`<h1>Not Found</h1>`);
        }
      } catch (error) {
        console.log(error);
      }
    };
  }

  static addInfo() {
    return function(req: Request, res: Response) {
      return res.render('pages/form-check-info');
    };
  }
}
