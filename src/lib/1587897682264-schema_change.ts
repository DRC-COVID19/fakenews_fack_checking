import { News } from "../models/news.model";
import { FactCheck } from "../models/factcheck.model";
import { NewsLang } from "../models/news-lang.model";

/**
 * Make any changes you need to make to the database here
 */
async function up() {
  console.log("Running UP");
  // Write migration here
  // CHANGES:
  // FactCheck Model:
  //  factcheck.news: news -> factcheck.news: [news] # Done automatically
  //  news.title -> factCheck.titleQuestion
  //  news.createdAt -> factCheck.publishedAt
  //  news.slug -> factCheck.slug
  //  news.status -> factcheck.verdict
  //  newsLang.content-> factCheck.claim
  const factCheckToModifyQuery = FactCheck.find({
    $or: [
      { titleQuestion: { $exists: false } },
      { publishedAt: { $exists: false } },
      { slug: { $exists: false } },
      { verdict: { $exists: false } },
      { claim: { $exists: false } },
    ],
  });

  const newsLangWithNews = await NewsLang.find({
    news: { $exists: true },
  })
    .select("_id content news")
    .exec();

  try {
    const factCheckToModify = await factCheckToModifyQuery
      .populate("news")
      .exec();
    console.log("factCheckToModify = ", factCheckToModify.length);
    factCheckToModify.forEach(async (check: any) => {
      console.log("modifying factChecks _id=", check._id);
      // get the corresponding news & news lang
      const newsItem = check.news[0]._doc;
      console.log("[factCheckToModify] newsItem = ", newsItem);
      const newsLangItem: any = newsLangWithNews.filter(
        (item: any) => item.news._id == newsItem._id.toString()
      )?.[0];
      console.log("[factCheckToModify] newsLangItem = ", newsLangItem);
      // set new fields
      check.titleQuestion = newsItem.title;
      check.publishedAt = newsItem.createdAt;
      check.slug = newsItem.slug;
      check.verdict = newsItem.status;
      check.claim = newsLangItem?.content || newsItem.title;
      // save
      await check.save((err: any) => {
        if (err) return console.log(err);
      });
    });
  } catch (err) {
    console.log(err);
  }
  // News Model:
  //  news.slug -> null
  //  news.title -> null
  //  newslang.content -> news.description
  //  news.photo: string -> news.media: [string]
  //  news.source: string -> news.sources: [string]
  //  news.factCheck: FactCheCkSchema -> news.factCheck: objectDd ref="FactCheck" # done automatically
  const newsToModifyQuery = News.find({});
  try {
    const newsToModify = await newsToModifyQuery
      .select("factCheck _id photo source slug title")
      .exec();
    console.log("newsToModify.length = ", newsToModify.length);
    newsToModify.forEach(async (newsItem: any) => {
      console.log("modifying news _id=", newsItem._id);
      // find the corresponding newslang
      const newsLangItem: any = newsLangWithNews.filter(
        (item: any) => item.news._id == newsItem._id.toString()
      )?.[0];
      console.log("[newsToModify] newsLangItem = ", newsLangItem);
      // set new fields
      newsItem.media = newsItem.photo ? [newsItem.photo] : [];
      newsItem.sources = newsItem.source ? [newsItem.source] : [];
      newsItem.description =
        newsLangItem?.content || newsItem.title || "Description non disponible";
      // newsItem.factCheck =
      // unset fields
      newsItem.slug = undefined;
      newsItem.title = undefined;
      newsItem.photo = undefined;
      newsItem.source = undefined;
      // save
      await newsItem.save((err: any) => {
        if (err) return console.log(err);
      });
    });
  } catch (err) {
    console.log(err);
  }

  // ensure that verdict is correctly set
  await (await FactCheck.find({}).populate("news").exec()).forEach(
    async (check: any) => {
      // get corresponding news item
      const newsItem = check.news[0]._doc;
      check.verdict = newsItem.status;
      console.log("checK.media=", check.media);
      check.media = newsItem.photo ? [newsItem.photo] : [];
      console.log("photo=", newsItem.photo);
      console.log("checK.media=", check.media);
      // unset
      check.medias = undefined;
      // save
      await check.save((err: any) => {
        if (err) return console.log(err);
      });
    }
  );

  await News.collection.dropIndexes(function (err, results) {
    if (err) {
      console.log("Error in all dropping index!", err);
    }
    console.log("indexes dropped", results);
  });
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
  console.log("Running DOWN");
  // Write migration here
}

export { up, down };
