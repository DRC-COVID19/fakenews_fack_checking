import { Request, Response } from 'express';
import { NewsLang } from "../news_lang.model";
import { searchInformationLang } from "../../../lib/get_all_news";
import { News } from "../news.model";
import {  } from "../../user/user.model";

// @ts-ignore
import multer from "multer";

import path from "path";




export default {
  async search(req: Request, res: Response) {
    const keyWord: string = req.query.keyword;
    const newsLang = await NewsLang.find({
      $or: [
        { title: new RegExp(keyWord, 'i') },
        { content: new RegExp(keyWord, 'i') },
      ],
    }).select('title content news -_id').lean();
    const news = await searchInformationLang(News, newsLang);
    res.json({
      news,
      title: 'Covid-19 Factchecking plateforme',
      moCle: keyWord,
    });
  },

  async create(req:Request,res:Response){

      const news = new News({
        photo: req.body.img_link,
        source:req.body.link,
        status:'draft',
        author:{fullName:req.body.names?req.body.names:"",email:req.body.email}
      }); 

      const newsLang=new NewsLang({
          lang:'french',
          langISOCode:"fr",
          title:req.body.title,
          content:req.body.content,
      });
      
      try {
          await news.save();
          await newsLang.save();
          return res.send({message:'created',status:'ok'});
      } catch (error) {
        console.log(error)
      }

  }
};