import { Request, Response } from "express";
import { News } from "../models/news.model";
import { NewsLang } from "../models/news_lang.model";
import {
  getInformationLang,
  searchInformationLang,
} from "../lib/get_all_news";

export default {
  async addInformation(req: Request, res: Response) {
    return res.render("administration/add_information");
  },
  async home(req: Request, res: Response) {
    const news = await News.find().select("_id source photo status");
    const newsToReturn = await getInformationLang(news, NewsLang);
    return res.render("administration/home", {
      news: newsToReturn,
      title: "Admin",
    });
  },
  async show(req: Request, res: Response) {
    const {
      params: { id },
    } = req;
    try {
      const news: any = await News.findById(id).select(
        "_id source photo status"
      );
      if (news) {
        const langAttributes: any = await NewsLang.find({
          $and: [
            { news: news._id },
            { langISOCode: "fr" },
            // { $or: [{ status: 'true' }, { status: 'false' }] },
          ],
        }).select("title content -_id");
        return res.render("pages/news/details", {
          news: { ...news["_doc"], ...langAttributes["0"]["_doc"] },
          title: langAttributes["0"]["_doc"].title,
        });
      } else {
        return res.render("pages/404");
      }
    } catch (error) {
      console.log(error);
    }
  },
  async destroy(req: Request, res: Response) {
    const id = req.params.informationId;
    News.deleteOne({ _id: id })
      .exec()
      .then((result) => {
        return res.redirect("/all-information");
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
