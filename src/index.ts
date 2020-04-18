import express, { Request, Response,NextFunction } from 'express';
import cookieSession from 'cookie-session'; //middleware 
import {newsAPIRouter,newsAdminRouter,newsRouter} from "./resources/index.router";
import './database/db.start';

// @ts-ignore
// import basicAuth from "express-basic-auth";
// if (process.env.NODE_ENV === 'production') {
//   require('dotenv').config({ path: './prod.env' });
// } else {
//   require('dotenv').config({ path: './dev.env' });
// }
require('dotenv').config();

const app = express();

app.engine('ejs', require('express-ejs-extend')); // add this line
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(
  cookieSession({
    keys: ['laskdjf'], //this key is used to encode or encrypt the session
  })
);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

app.get(/^\/?$/i, (req: Request, res: Response) => {
  // return res.redirect('/check');
   return res.redirect('/news');
});


// PROTECTION DES ROUTES


//extends the Request interaces
//It's not the best solution because,we should alway figure out some ways to remember this before doing it
// interface RequestWithBody extends Request {
//   //unedefined is the state when there is not middleware
//   body: { [keys: string]: string | undefined };
// }

// function requireAuth(req: Request, res: Response, next: NextFunction): void {
//   if (req.session && req.session.loggedIn) {
//     next();
//     return;
//   }
//   res.status(403);
//   res.send('Not permitted');
// }

//Request and Response are interfaces
// app.get('/login', (req: Request, res: Response) => {
//   return res.render('pages/login');
// });

// //Update types : RequestWithBody
// app.post('/login', (req: RequestWithBody, res: Response) => {
//   const { username, password } = req.body;
//   //   res.send(`Email : ${email}
//   //     Password : ${password}
//   //     `);
//   if (
//     username &&
//     password &&
//     username === 'congocheck' &&
//     password === 'congocheck'
//   ) {
//     //mark this person as logged in
//     req.session = { loggedIn: true };
//     //redirect the into the root route
//     res.redirect('/');
//   } else {
//     res.send('<p>Mot de passe et/ou nom d\'utilisateur incorrect<br>Pour retenter de vous connect cliquez <a href="/">Ici</a></p>');
//   }
// });

// app.get('/check', (req: Request, res: Response) => {
//   //req.session : check if they have a session(because it can be undefined) and if they are loogd in
//   if (req.session && req.session.loggedIn) {
//     console.log(req.session);
//     res.redirect('/news');
//   } else {
//     res.redirect("/login");
//   }
// });



// FIN PROTECTION DES ROUTES



app.use(/^\/api\/news(?=\/|$)/i, newsAPIRouter);
app.use(/^\/admin(?=\/|$)/i, newsAdminRouter);
app.use(/^\/news(?=\/|$)/i/*, requireAuth*/, newsRouter);



const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log( 
    `Le server écoute sur le port ${PORT}\nEnvironement : ${process.env.NODE_ENV}`
  );
});
