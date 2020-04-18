import { Request, Response } from 'express';
import { News } from './news.model';
import { NewsLang } from './news_lang.model';
import { FackCheck } from "../factcheck/factcheck.model";
import { getInformationLang } from '../../lib/get_all_news';

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
      const news: any = await News.findById(id)
        .select('_id source photo status factCheck')
        .lean();
      if (news) {
        // Query for a new according to a given language
        const langAttributes: any = await NewsLang.find({
          $and: [
            { news: news._id },
            { langISOCode: 'fr' },
            // { $or: [{ status: 'true' }, { status: 'false' }] },
          ],
        }).select('title content -_id').lean();

        return res.render('pages/news/details', {
          news: { ...news, ...langAttributes[0] },
          title: langAttributes['0'].title,
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
