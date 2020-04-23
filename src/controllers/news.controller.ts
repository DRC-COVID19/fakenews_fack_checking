import { Request, Response } from "express";
import { News } from "../models/news.model";
import { NewsLang } from "../models/news_lang.model";
import { getInformationLang } from "../lib/get_all_news";

export default {
  async showIndex(req: Request, res: Response) {
    const filterArgsC = { $or: [{ status: "true" }, { status: "false" }] };

    const news = await News.find(filterArgsC)
      .select("_id source photo status slug")
      .lean();
    const newsToReturn = await getInformationLang(news, NewsLang);
    res.render("pages/index", {
      news: newsToReturn,
      title: "Covid-19 Factchecking plateforme",
      description: "",
      image: "",
      url: "",
    });
  },
  async showDetails(req: Request, res: Response) {
    const slug = req.params.slug;
    try {
      const news: any = await News.findOne({ slug })
        .select("_id source photo status factCheck slug")
        .lean();
      if (news) {
        const langAttributes: any = await NewsLang.find({
          $and: [{ news: news._id }, { langISOCode: "fr" }],
        })
          .select("title content -_id")
          .lean();

        return res.render("pages/news/details", {
          news: { ...news, ...langAttributes[0] },
          title: langAttributes["0"].title,
          description: langAttributes["0"].content,
          image: news.photo,
          url: `/news/${news.slug}`,
        });
      } else {
        return res.render("pages/404");
      }
    } catch (error) {
      console.log(error);
    }
  },
  async showVerificationRequest(req: Request, res: Response) {
    return res.render("pages/news/request-factcheck-form", {
      title: "Faire vérifier une information",
      description:
        "Soumettre une information afin qu'elle puisse etre vérifié par un fact checker",
      url: "",
      image: null,
    });
  },
  async search(req: Request, res: Response) {
    const keyword: string = req.query.keyword as string;
    const filterArgs = keyword
      ? {
          $and: [
            {
              $or: [
                { title: new RegExp(keyword, "i") },
                { content: new RegExp(keyword, "i") },
              ],
            },
            { $or: [{ status: "true" }, { status: "false" }] },
          ],
        }
      : { $or: [{ status: "true" }, { status: "false" }] };
    const news = await News.find(filterArgs)
      .select("_id source photo status slug")
      .lean();
    res.send(await getInformationLang(news, NewsLang));
  },
};
