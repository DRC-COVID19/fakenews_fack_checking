import { Request, Response } from 'express';
import { Information } from '../models/Information';
import { InformationLang } from '../models/InformationLang';
import { getInformationLang, searchInformationLang } from '../lib/get_all_news';

export class NewsController {
  static informationSearch() {
    return async function (req: Request, res: Response) {
      const motCle: string = req.body.recherche;
      const informationLang = await InformationLang.find({
        $or: [
          { titre: new RegExp(motCle, 'i') },
          { contenu: new RegExp(motCle, 'i') },
        ],
      }).select('titre contenu informationID -_id');
      const news = await searchInformationLang(Information, informationLang);
      res.render('pages/information_search', {
        news,
        title: 'Bienvenu',
        moCle: motCle,
      });
    };
  }
  static addInformation() {
    return async function (req: Request, res: Response) {
      return res.render('administration/add_information');
    };
  }
  static displayAllInformation() {
    return async function (req: Request, res: Response) {
      const news = await Information.find().select('_id source photo statut');
      const newsToReturn = await getInformationLang(news, InformationLang);
      return res.render('administration/informations_details', {
        news: newsToReturn,
        title: 'Bienvenu',
      });
    };
  }
  static home() {
    return async function (req: Request, res: Response) {
      const news = await Information.find().select('_id source photo statut');
      const newsToReturn = await getInformationLang(news, InformationLang);
      res.render('pages/home', { news: newsToReturn, title: 'Bienvenu' });
    };
  }

  static show() {
    return async function (req: Request, res: Response) {
      const {
        params: { id },
      } = req;
      try {
        const news: any = await Information.findById(id).select(
          '_id source photo statut'
        );
        if (news) {
          const langAttributes: any = await InformationLang.find({
            informationID: news._id,
            codeLangue: 'fr',
          }).select('titre contenu -_id');
          return res.render('pages/details-info', {
            news: { ...news['_doc'], ...langAttributes['0']['_doc'] },
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
    return function (req: Request, res: Response) {
      return res.render('pages/form-check-info');
    };
  }

  static delete() {
    return function (req: Request, res: Response) {
      const id = req.params.informationId;
      Information.deleteOne({ _id: id })
        .exec()
        .then((result) => {
          return res.redirect('/all-information');
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }
}
