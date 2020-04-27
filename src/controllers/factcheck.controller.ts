import { Request, Response } from "express";
import { FactCheck } from "../models/factcheck.model";
import { NewsLang } from "../models/news-lang.model";
import { getInformationLang } from "../lib/get_all_news";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const formatDate = (date: Date) =>
  format(date, "dd MMMM yyyy", {
    locale: fr,
  });

const findFactChecks = async (filter: Object) => {
  const select = "_id media titleQuestion checkedFact slug verdict publishedAt";
  const factchecks = await FactCheck.find(filter).select(select).lean().exec();
  return factchecks.map((checks: any) => {
    return {
      ...checks,
      publishedAt: formatDate(checks.publishedAt),
    };
  });
};

const buildFilterArgs = (keyword?: any) => {
  if (keyword) {
    return {
      $and: [
        {
          $or: [
            { titleQuestion: new RegExp(keyword, "i") },
            { claim: new RegExp(keyword, "i") },
            { checkedFact: new RegExp(keyword, "i") },
          ],
        },
        { $or: [{ verdict: "true" }, { verdict: "false" }] },
      ],
    };
  }
  return { $or: [{ verdict: "true" }, { verdict: "false" }] };
};

const getFactChecks = async (keyword?: string) => {
  const filterArgs = buildFilterArgs(keyword);
  const factChecks: any = await findFactChecks(filterArgs);
  return factChecks;
};

export default {
  async showIndex(req: Request, res: Response) {
    const factChecks: any = await getFactChecks();
    res.render("pages/index", {
      factChecks: factChecks.map((item: any) => ({
        ...item,
        photo: item.media?.[0],
      })),
      title: "Covid-19 Factchecking plateforme",
      description: "",
      image: "",
      url: "",
    });
  },
  async search(req: Request, res: Response) {
    const keyword: string = req.query.keyword as string;
    const factChecks: any = await getFactChecks(keyword);
    res.send(
      factChecks.map((item: any) => ({
        ...item,
        photo: item.media?.[0],
      }))
    );
  },
  async showDetails(req: Request, res: Response) {
    const slug = req.params.slug;
    try {
      const factCheck: any = await FactCheck.findOne({ slug }).lean();
      if (factCheck) {
        return res.render("pages/news/details", {
          factCheck: {
            ...factCheck,
            photo: factCheck.media?.[0],
            publishedAt: formatDate(factCheck.publishedAt),
          },
          title: factCheck.titleQuestion,
          description: factCheck.checkedFact,
          image: factCheck.media?.[0],
          url: `/factchecks/${factCheck.slug}`,
        });
      }
      return res.render("pages/404");
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
