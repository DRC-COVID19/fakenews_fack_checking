"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var InformationSchema = new mongoose_1.default.Schema({
    source: {
        type: String
    },
    titre: {
        type: String,
        unique: true,
        required: true
    },
    contenu: {
        type: String,
        unique: true,
        required: false
    },
    photo: {
        type: String,
        required: false
    },
    veracite: {
        type: String,
        enum: ['vraie', 'fausse', 'draft'],
        default: 'draft',
        required: true
    },
    vraieInformation: {
        type: String,
        required: false
    },
    paysOrigin: {
        type: String,
        required: false
    }
});
var Information = mongoose_1.default.model('Information', InformationSchema);
exports.Information = Information;
