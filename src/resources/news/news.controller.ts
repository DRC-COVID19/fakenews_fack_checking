import { Request, Response } from 'express';
import { News } from './news.model';
import { NewsLang } from './news_lang.model';
import { getInformationLang, searchInformationLang } from '../../lib/get_all_news';

export default {

  async index(req: Request, res: Response) {
    const news = await News.find({
      $or: [{ status: 'true' }, { status: 'false' }],
    }).select('_id source photo status').lean();
    const newsToReturn = await getInformationLang(news, NewsLang);
    res.render('pages/index', {
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
        '_id source photo status'
      );
      if (news) {
        const langAttributes: any = await NewsLang.find({
          $and: [
            { news: news._id },
            { langISOCode: 'fr' },
            // { $or: [{ status: 'true' }, { status: 'false' }] },
          ],
        }).select('title content -_id');
        return res.render('pages/news/details', {
          news: { ...news['_doc'], ...langAttributes['0']['_doc'] },
          title: langAttributes['0']['_doc'].title,
        });
      } else {
        return res.render('pages/404');
      }
    } catch (error) {
      console.log(error);
    }
  },

  async requestVerificationForm(req: Request, res: Response) {
    return res.render('pages/news/request-factcheck-form', {
      title: 'Faire vérifier une information',
    });
  },


  async requestVerification(req: Request, res: Response) {
    return res.json(req.body);
  },
};
