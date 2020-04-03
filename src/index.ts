import express from 'express';
import { newRouter } from './routes/news_routes';
import { informationRouter } from './routes/informations_routes';
import './services/DataBasInit';

// if (process.env.NODE_ENV === 'production') {
//   require('dotenv').config({ path: './prod.env' });
// } else {
//   require('dotenv').config({ path: './dev.env' });
// }
require('dotenv').config();

const app = express();

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(newRouter);
app.use(informationRouter);

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `Le server écoute sur le port ${PORT}\nEnvironement : ${process.env.NODE_ENV}`
  );
  console.log('username : ', process.env.MONGO_USER);
  console.log('password : ', process.env.MONGO_PASSWORD);
  console.log('database name : ', process.env.MONGO_DBNAME);
  console.log('hostname : ', process.env.MONGO_HOSTNAME);
});
