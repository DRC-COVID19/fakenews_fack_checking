"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NewsController = /** @class */ (function () {
    function NewsController() {
    }
    NewsController.home = function () {
        return function (req, res) {
            res.render('pages/home', {
                title: 'Bienvenu dans le site de signelement des Fake news',
                message: 'Dans ce site,vous pouvez signaler/faire verifier toutes les informations circulant sur les réseau sociaux en rapport avec la Pandemie du Covid-19'
            });
        };
    };
    return NewsController;
}());
exports.NewsController = NewsController;
