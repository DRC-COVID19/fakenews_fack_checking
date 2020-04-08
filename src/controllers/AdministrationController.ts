import { Request, Response} from 'express';


export class AdministrationController{
    static home(){
        return function(req:Request, res:Response){
            return res.render('administration/home',{page: 'Tableau de bord'});
        }
    }
    static showLoginForm(){
        return function(req:Request, res:Response){
            return res.render('administration/login',{page: 'Se connecter'});
        }
    }
}