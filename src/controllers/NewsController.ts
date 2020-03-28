import { Request, Response } from 'express';
export class NewsController {
  static home() {
    return function(req: Request, res: Response) {
      res.render('pages/home', {
        title: 'Bienvenu dans le site de signelement des Fake news',
        message:
          'Dans ce site,vous pouvez signaler/faire verifier toutes les informations circulant sur les réseau sociaux en rapport avec la Pandemie du Covid-19'
      });
    };
  }
}
