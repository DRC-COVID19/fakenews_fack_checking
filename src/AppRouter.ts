import express from 'express';

//J'implement un Singleton design pattern pour n'avoir qu'une seule instance du routeur en memoire
export class AppRouter {
  private static instance: express.Router;

  static getInstance(): express.Router {
    if (!AppRouter.instance) {
      AppRouter.instance = express.Router();
    }
    return AppRouter.instance;
  }
}
