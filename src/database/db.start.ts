import mongoose from 'mongoose';
const { DBInfos } = require('../config/keys');
let MONGO_URL;



const { MONGO_DBNAME, MONGO_PASSWORD, MONGO_USER, MONGO_HOSTNAME } = DBInfos;
MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DBNAME}`;
// MONGO_URL = `mongodb://localhost/fake_news_plateform`;
console.log(MONGO_URL);
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('La connexion à base de données MongoDB est établie'))
  .catch(err =>
    console.log(
      `Erreur lors de la connexion à la base de données à de \n${err}`
    )
  );

module.exports = mongoose;

