"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var dev_1 = require("../config/dev");
var MONGO_URL;
var MONGO_DBNAME = dev_1.DBInfos.MONGO_DBNAME, MONGO_PASSWORD = dev_1.DBInfos.MONGO_PASSWORD, MONGO_USER = dev_1.DBInfos.MONGO_USER, MONGO_HOSTNAME = dev_1.DBInfos.MONGO_HOSTNAME;
MONGO_URL = "mongodb://" + MONGO_USER + ":" + MONGO_PASSWORD + "@" + MONGO_HOSTNAME + "/" + MONGO_DBNAME;
mongoose_1["default"]
    .connect(MONGO_URL, { useNewUrlParser: false, useUnifiedTopology: false })
    .then(function () { return console.log('La connexio à base de données MongoDB est établie'); })["catch"](function (err) {
    return console.log("Erreur lors de la connexion \u00E0 la base de donn\u00E9es \u00E0 de \n" + err);
});
module.exports = mongoose_1["default"];
