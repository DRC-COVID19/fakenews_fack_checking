import express from 'express';
import { newRouter } from './routes/news_routes';

const app = express();

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(newRouter);

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Le server écoute sur le port ${PORT}`);
});
