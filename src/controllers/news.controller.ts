import { Request, Response } from "express";
import { News } from "../models/news.model";
import { NewsLang } from "../models/news-lang.model";
import { getInformationLang } from "../lib/get_all_news";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const formatDate = (date: Date) =>
  format(date, "dd MMMM yyyy", {
    locale: fr,
  });

const findNews = async (filter: Object, select: string) => {
  const news = await News.find(filter).select(select).lean();
  return news.map((newsItem: any) => {
    return {
      ...newsItem,
      publishedAt: formatDate(newsItem.createdAt),
    };
  });
};

export default {
  async showIndex(req: Request, res: Response) {
    const filterArgs = { $or: [{ status: "true" }, { status: "false" }] };

    const news = await findNews(
      filterArgs,
      "_id source photo status slug factCheck createdAt"
    );
    const newsToReturn = await getInformationLang(news, NewsLang);
    res.render("pages/index", {
      news: newsToReturn,
      title: "Covid-19 Factchecking plateforme",
      description: "",
      image: "",
      url: "",
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
    const news: any = await findNews(
      filterArgs,
      "_id source photo status slug createdAt"
    );
    res.send(await getInformationLang(news, NewsLang));
  },
  async showDetails(req: Request, res: Response) {
    const slug = req.params.slug;
    try {
      const newsItem: any = await News.findOne({ slug })
        .select("_id source photo status factCheck slug createdAt")
        .lean();
      if (newsItem) {
        const langAttributes: any = await NewsLang.find({
          $and: [{ news: newsItem._id }, { langISOCode: "fr" }],
        })
          .select("title content -_id")
          .lean();

        return res.render("pages/news/details", {
          news: {
            ...newsItem,
            ...langAttributes[0],
            publishedAt: formatDate(newsItem.createdAt),
          },
          title: langAttributes["0"].title,
          description: langAttributes["0"].content,
          image: newsItem.photo,
          url: `/news/${newsItem.slug}`,
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
};
