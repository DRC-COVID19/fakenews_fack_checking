import { Request, Response } from 'express';
import { Information } from '../models/Information';

export const index = async () => {
  return async function(req: Request, res: Response) {
    const news = await Information.find({ statut: 'fausse' }).select(
      '_id source titre contenu photo statut'
    );
    console.log('DATA : ', news);
    res.render('pages/home', { news, title: 'Bienvenu' });
  };
};

export const show = async () => {
  return async function(req: Request, res: Response) {
    const {
      params: { id }
    } = req;
    try {
      const news = await Information.findById(id).select(
        '_id source titre contenu photo veracite'
      );
      if (news) {
        return res.render('pages/details-info', { news });
      } else {
        return res.render(`<h1>Not Found</h1>`);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
