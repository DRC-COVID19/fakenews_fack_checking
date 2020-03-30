import { Request, Response } from 'express';
import { Information } from '../models/Information';
export class NewsController {
  static home() {
    return async function(req: Request, res: Response) {
      const news = await Information.find({ veracite: 'fausse' }).select(
        'source titre contenu photo veracite'
      );
      console.log('DATA : ', news);
      res.render('pages/home', { news });
    };
  }
}
