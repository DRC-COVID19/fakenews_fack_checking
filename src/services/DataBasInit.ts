import mongoose from 'mongoose';
import { DBInfos } from '../config/dev';
let MONGO_URL;

const { MONGO_DBNAME, MONGO_PASSWORD, MONGO_USER, MONGO_HOSTNAME } = DBInfos;
MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DBNAME}`;

mongoose
  .connect(MONGO_URL, { useNewUrlParser: false, useUnifiedTopology: false })
  .then(() => console.log('La connexio à base de données MongoDB est établie'))
  .catch(err =>
    console.log(
      `Erreur lors de la connexion à la base de données à de \n${err}`
    )
  );

module.exports = mongoose;
