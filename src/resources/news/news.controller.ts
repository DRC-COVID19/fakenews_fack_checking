import { Request, Response } from 'express';
import { News } from './news.model';
import { NewsLang } from './news_lang.model';
import { FackCheck } from "../factcheck/factcheck.model";
import { getInformationLang } from '../../lib/get_all_news';

export default {

  async index(req: Request, res: Response) {
    const news = await News.find({
      $or: [{ status: 'true' }, { status: 'false' }],
    }).select('_id source photo status slug').lean();
    const newsToReturn = await getInformationLang(news, NewsLang);
    res.render('pages/index', {
      news: newsToReturn,
      title: 'Covid-19 Factchecking plateforme',
      description: "",
      image: "",
      url: ``,
    });
  },


  async show(req: Request, res: Response) {
    const {
      params: { slug },
    } = req;
    try {
      const news: any = await News.findOne({ slug })
        .select('_id source photo status factCheck slug')
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
          description: langAttributes['0'].content,
          image:news.photo,
          url:`/news/${news.slug}`
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
