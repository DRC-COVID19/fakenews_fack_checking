"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Methods_1 = require("./Methods");
var MetadatasKeys_1 = require("./MetadatasKeys");
function routerBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata(MetadatasKeys_1.MetadatasKeys.path, path, target, key);
            Reflect.defineMetadata(MetadatasKeys_1.MetadatasKeys.method, method, target, key);
        };
    };
}
exports.get = routerBinder(Methods_1.Methods.get);
exports.put = routerBinder(Methods_1.Methods.put);
exports.patch = routerBinder(Methods_1.Methods.patch);
exports.post = routerBinder(Methods_1.Methods.post);
exports.del = routerBinder(Methods_1.Methods.delete);
