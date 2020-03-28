"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var AppRouter_1 = require("../../AppRouter");
var MetadatasKeys_1 = require("./MetadatasKeys");
function controller(routePrefix) {
    return function (target) {
        var router = AppRouter_1.AppRouter.getInstance();
        for (var key in target.prototype) {
            var routeHandler = target.prototype[key];
            var path = Reflect.getMetadata(MetadatasKeys_1.MetadatasKeys.path, target.prototype, key);
            var method = Reflect.getMetadata(MetadatasKeys_1.MetadatasKeys.method, target.prototype, key);
            if (path) {
                //if we use an enum et because there are only limited methods that exists and are possible : get,post,delete,put,patch
                //Without an enum we'll get an error because typescript will say,if there is no enum of limited value we can have : router.john
                router[method]("" + routePrefix + path, routeHandler);
            }
        }
    };
}
exports.controller = controller;
