import { Request, Response} from 'express';

export class UserController{
    static addUser(){
        return function(req:Request, res:Response){
            return res.render('administration/users/add_user');
        }
    }
    static userDetails(){
        return function(req:Request, res:Response){
            return res.render('administration/users/details_user');
        }
    }
}