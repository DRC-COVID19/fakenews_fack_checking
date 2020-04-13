import { Request, Response } from 'express';
import { NewsLang } from "../news_lang.model";
import { searchInformationLang } from "../../../lib/get_all_news";
import { News } from "../news.model";

// @ts-ignore
import multer from "multer";

import path from "path";

//set storag engine
const storage=multer.diskStorage({
    destination:'./public/uploads',
    filename:function(req,file,cb){
        //null : error
        cb(null,file.fieldname+'-'+Date.now+path.extname(file.originalname),)
    }
})

//Init upload
const upload=multer({
    storage
}).single('image');


export default {
  async search(req: Request, res: Response) {
    const keyWord: string = req.query.keyword;
    const newsLang = await NewsLang.find({
      $or: [
        { title: new RegExp(keyWord, 'i') },
        { content: new RegExp(keyWord, 'i') },
      ],
    }).select('title content news -_id');
    const news = await searchInformationLang(News, newsLang);
    res.json({
      news,
      title: 'Covid-19 Factchecking plateforme',
      moCle: keyWord,
    });
  },

  async create(req:Request,res:Response){
    upload(req,res,(err)=>{
        if(err){
          return res.send({mssg:err}).status(400);
        }else{
          return res.send(req.file);
        }
    });

    return res.json({...req.body,files:req.file});
    
  }
};