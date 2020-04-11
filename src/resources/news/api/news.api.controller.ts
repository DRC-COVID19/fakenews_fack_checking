import { Request, Response } from 'express';
import { NewsLang } from "../news_lang.model";
import { searchInformationLang } from "../../../lib/get_all_news";
import { News } from "../news.model";


export default {
  async searchNews(req: Request, res: Response) {
    const keyWord: string = req.query.keyword;
    const newsLang = await NewsLang.find({
      $or: [
        { titre: new RegExp(keyWord, 'i') },
        { contenu: new RegExp(keyWord, 'i') },
      ],
    }).select('title content news -_id');
    const news = await searchInformationLang(News, newsLang);
    res.json({
      news,
      title: 'Covid-19 Factchecking plateforme',
      moCle: keyWord,
    });
  },
};