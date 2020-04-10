import { Request, Response } from 'express';
import { Information } from '../models/Information';
import { InformationLang } from '../models/InformationLang';
import { getInformationLang, searchInformationLang } from '../lib/get_all_news';

export const news = {
  searchNews: () => {
    return async function (req: Request, res: Response) {
      const keyWord: string = req.query.keyword;
      const informationLang = await InformationLang.find({
        $or: [
          { titre: new RegExp(keyWord, 'i') },
          { contenu: new RegExp(keyWord, 'i') },
        ],
      }).select('titre contenu informationID -_id');
      const news = await searchInformationLang(Information, informationLang);
      res.json({
        news,
        title: 'Covid-19 Factchecking plateforme',
        moCle: keyWord,
      });
    };
  },
  addInformation: () => {
    return async function (req: Request, res: Response) {
      return res.render('administration/add_information');
    };
  },
  indexAdmin: () => {
    return async function (req: Request, res: Response) {
      const news = await Information.find().select('_id source photo statut');
      const newsToReturn = await getInformationLang(news, InformationLang);
      return res.render('administration/informations_details', {
        news: newsToReturn,
        title: 'Admin',
      });
    };
  },
  index: () => {
    return async function (req: Request, res: Response) {
      const news = await Information.find({
        $or: [{ statut: 'vraie' }, { statut: 'fausse' }],
      }).select('_id source photo statut');
      const newsToReturn = await getInformationLang(news, InformationLang);
      res.render('pages/home', {
        news: newsToReturn,
        title: 'Covid-19 Factchecking plateforme',
      });
    };
  },

  show: () => {
    return async function (req: Request, res: Response) {
      const {
        params: { id },
      } = req;
      try {
        const news: any = await Information.findById(id).select(
          '_id source photo statut'
        );
        if (news) {
          const langAttributes: any = await InformationLang.find({
            $and: [
              { informationID: news._id },
              { codeLangue: 'fr' },
              // { $or: [{ statut: 'vraie' }, { statut: 'fausse' }] },
            ],
          }).select('titre contenu -_id');
          return res.render('pages/details-info', {
            news: { ...news['_doc'], ...langAttributes['0']['_doc'] },
            title: langAttributes['0']['_doc'].titre,
          });
        } else {
          return res.render('pages/404');
        }
      } catch (error) {
        console.log(error);
      }
    };
  },

  requestVerificationForm: () => {
    return function (req: Request, res: Response) {
      return res.render('pages/request-verification',{title:'Faire vérifier une information'});
    };
  },

  requestVerification:()=>{
    return function (req:Request,res:Response){
      return res.json(req.body);
    }
  },

  destroy: () => {
    return function (req: Request, res: Response) {
      const id = req.params.informationId;
      Information.deleteOne({ _id: id })
        .exec()
        .then((result) => {
          return res.redirect('/all-information');
        })
        .catch((error) => {
          console.log(error);
        });
    };
  },
};
