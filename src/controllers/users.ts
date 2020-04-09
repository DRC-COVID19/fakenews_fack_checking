import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import { User } from '../models/User';
import Joi from 'joi';

export class UserController {
  static User() {
    return function (req: Request, res: Response) {
      return res.render('administration/add_user', {
        page: 'Ajouter un administrateur',
      });
    };
  }
  static InsertUser() {
    return function (req: Request, res: Response) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.redirect('/add/user');
      } else {
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          nom: req.body.userName,
          prenom: req.body.userPrenom,
          pseudo: req.body.userPseudo,
          email: req.body.userEmail,
          password: req.body.userPassword,
        });
        user
          .save()
          .then((result) => {
            if (result) {
              return res.redirect('/details/user');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
  }
  static userDetails() {
    return function (req: Request, res: Response) {
      User.find()
        .exec()
        .then((data) => {
          return res.render('administration/details_user', { users: data });
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }
  static userDelete() {
    return function (req: Request, res: Response) {
      const id = req.params.userId;
      console.log(req.params);
      User.deleteOne({ _id: id })
        .exec()
        .then((result) => {
          return res.redirect('/details/user');
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }
  static findUser() {
    return function (req: Request, res: Response) {
      const id = req.params.userId;
      User.findById(id)
        .exec()
        .then((user) => {
          return res.render('administration/edit_user', {
            user: user,
            page: 'Edit user',
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }
  static editUser() {
    return function (req: Request, res: Response) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.redirect('/edit/user');
      } else {
        let user: any = {};
        user.nom = req.body.userName;
        user.prenom = req.body.userPrenom;
        user.pseudo = req.body.userPseudo;
        user.email = req.body.userEmail;
        user.password = req.body.userPassword;

        let query = { _id: req.body._id };
        if (req.body._id) {
          User.update(query, user, (error) => {
            if (error) {
              console.log(error);
            } else {
              res.redirect('/details/user');
            }
          });
        }
      }
    };
  }
}
