"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var DBInfos = require('../config/keys').DBInfos;
var MONGO_URL;
var MONGO_DBNAME = DBInfos.MONGO_DBNAME, MONGO_PASSWORD = DBInfos.MONGO_PASSWORD, MONGO_USER = DBInfos.MONGO_USER, MONGO_HOSTNAME = DBInfos.MONGO_HOSTNAME;
MONGO_URL = "mongodb://" + MONGO_USER + ":" + MONGO_PASSWORD + "@" + MONGO_HOSTNAME + "/" + MONGO_DBNAME;
mongoose_1.default
    .connect(MONGO_URL, { useNewUrlParser: false, useUnifiedTopology: false })
    .then(function () { return console.log('La connexio à base de données MongoDB est établie'); })
    .catch(function (err) {
    return console.log("Erreur lors de la connexion \u00E0 la base de donn\u00E9es \u00E0 de \n" + err);
});
module.exports = mongoose_1.default;
