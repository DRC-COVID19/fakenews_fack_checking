import { Request, Response } from 'express';
import { Information } from '../models/Information';
import { InformationLang } from '../models/InformationLang';
import { getInformationLang } from '../lib/get_all_news';
export class NewsController {
  static home() {
    return async function(req: Request, res: Response) {
      const news = await Information.find().select('_id source photo statut');
      const newsToReturn = await getInformationLang(news, InformationLang);
      res.render('pages/home', { news: newsToReturn, title: 'Bienvenu' });
    };
  }

  static show() {
    return async function(req: Request, res: Response) {
      const {
        params: { id }
      } = req;
      try {
        const news: any = await Information.findById(id).select(
          '_id source photo statut'
        );
        if (news) {
          const langAttributes: any = await InformationLang.find({
            informationID: news._id,
            codeLangue: 'fr'
          }).select('titre contenu -_id');
          return res.render('pages/details-info', {
            news: { ...news['_doc'], ...langAttributes['0']['_doc'] }
          });
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
