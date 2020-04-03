import { Request, Response } from 'express';
//import { Information } from '../models/Information';
//import { InformationLang } from '../models/InformationLang';
//import { getInformationLang } from '../lib/get_all_news';

export class InformationsController {
  static informationDetail() {
    return async function(req: Request, res: Response) {
      return res.render('administration/informations_details');
      // const news = await Information.find().select('_id source photo statut');
      // const newsToReturn = await getInformationLang(news, InformationLang);
      // res.render('administration/informations_details', { news: newsToReturn, title: 'Bienvenu' });
    };
  }
}

// import { Request, Response } from 'express';
// import { Information } from '../models/Information';

// export const index = async () => {
//   return async function(req: Request, res: Response) {
//     const news = await Information.find({ statut: 'fausse' }).select(
//       '_id source titre contenu photo statut'
//     );
//     console.log('DATA : ', news);
//     res.render('pages/home', { news, title: 'Bienvenu' });
//   };
// };

// export const show = async () => {
//   return async function(req: Request, res: Response) {
//     const {
//       params: { id }
//     } = req;
//     try {
//       const news = await Information.findById(id).select(
//         '_id source titre contenu photo veracite'
//       );
//       if (news) {
//         return res.render('pages/details-info', { news });
//       } else {
//         return res.render(`<h1>Not Found</h1>`);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };
