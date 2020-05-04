import { Request, Response } from "express";
import { FactCheck } from "../models/factcheck.model";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import factCheckAPIController from "../controllers/factcheck.api.controller";
import qs from "qs";
import url from "url";

const formatDate = (date: Date) =>
  format(date, "dd MMMM yyyy", {
    locale: fr,
  });

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

const getFactChecks = async (
  keyword?: string,
  _start?: number,
  _end?: number
) => {
  const args = buildFilterArgs(keyword);
  const select = "_id media titleQuestion checkedFact slug verdict publishedAt";
  const {
    items: factChecks,
    totalCount,
  } = await factCheckAPIController.findModelItemsAndCount(
    args,
    _start,
    _end,
    select
  );
  return { factChecks, totalCount };
};

const getPaginationParams = (oneIndexPageNumber: number, pageSize: number) => {
  const zeroIndexPageNumber = oneIndexPageNumber - 1;
  return {
    _start: zeroIndexPageNumber * pageSize,
    _end: zeroIndexPageNumber * pageSize + pageSize,
  };
};

export default {
  async showIndex(req: Request, res: Response) {
    const { query } = req;
    
    // keyword search
    const keyword = query.keyword as string;
    
    // pagination
    const pageSize = 12;
    let { page, ...queryWithoutPage } = req.query;
    const parsedPage = parseInt(query.page as string) || 1;
    const urlWithoutPage = [
      req.baseUrl,
      qs.stringify(queryWithoutPage, { encode: false }),
    ]
      .filter((item) => item !== undefined || item !== "")
      .join("?");
    const { _start, _end } = getPaginationParams(parsedPage, pageSize);

    // get data and render
    try {
      const { factChecks, totalCount }: any = await getFactChecks(
        keyword,
        _start,
        _end
      );
      res.render("pages/index", {
        factChecks: factChecks.map((item: any) => ({
          ...item,
          photo: item.media?.[0],
          publishedAt: formatDate(item.publishedAt),
        })),
        title: "Covid-19 Factchecking plateforme",
        description: "",
        image: "",
        urlWithoutPage,
        url: req.url,
        pages: Math.ceil(totalCount / pageSize),
        page: parsedPage,
        keyword,
      });
    } catch (error) {
      console.error(error);
    }
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
