import { Request, Response } from 'express';
import { News } from './news.model';
import { NewsLang } from './news_lang.model';
import { getInformationLang, searchInformationLang } from '../../lib/get_all_news';

export default {
  async addInformation(req: Request, res: Response) {
    return res.render('administration/add_information');
  },
  async indexAdmin(req: Request, res: Response) {
    const news = await News.find().select('_id source photo statut');
    const newsToReturn = await getInformationLang(news, NewsLang);
    return res.render('administration/home', {
      news: newsToReturn,
      title: 'Admin',
    });
  },


  async index(req: Request, res: Response) {
    const news = await News.find({
      $or: [{ statut: 'vraie' }, { statut: 'fausse' }],
    }).select('_id source photo statut');
    const newsToReturn = await getInformationLang(news, NewsLang);
    res.render('pages/home', {
      news: newsToReturn,
      title: 'Covid-19 Factchecking plateforme',
    });
  },


  async show(req: Request, res: Response) {
    const {
      params: { id },
    } = req;
    try {
      const news: any = await News.findById(id).select(
        '_id source photo statut'
      );
      if (news) {
        const langAttributes: any = await NewsLang.find({
          $and: [
            { informationID: news._id },
            { codeLangue: 'fr' },
            // { $or: [{ statut: 'vraie' }, { statut: 'fausse' }] },
          ],
        }).select('titre contenu -_id');
        return res.render('pages/details-info', {
          news: { ...news['_doc'], ...langAttributes['0']['_doc'] },
          title: langAttributes['0']['_doc'].titre,
        });
      } else {
        return res.render('pages/404');
      }
    } catch (error) {
      console.log(error);
    }
  },

  async requestVerificationForm(req: Request, res: Response) {
    return res.render('pages/request-verification', {
      title: 'Faire vérifier une information',
    });
  },


  async requestVerification(req: Request, res: Response) {
    return res.json(req.body);
  },


  async destroy(req: Request, res: Response) {
      const id = req.params.informationId;
      News.deleteOne({ _id: id })
        .exec()
        .then((result) => {
          return res.redirect('/all-information');
        })
        .catch((error) => {
          console.log(error);
        });
    
  },
};
