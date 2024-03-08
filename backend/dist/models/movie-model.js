"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//import constants from "../constant";
const MovieScema = new mongoose_1.default.Schema({
    movietitle: {
        type: String,
        required: [true, "movie name is required!"],
    },
    moviegenre: {
        type: String,
        required: [true, "movie genre is required!"],
    },
    relesedate: {
        type: Date,
        required: [true, "movie relesedate is Required"],
    },
    moviedirector: {
        type: String,
        required: [true, "movie director is required!"],
    },
    description: {
        type: String,
        maxlength: [500, "Description cannot be more than 500 characters!"],
    },
    movieimage: {
        type: String,
        required: [false, "movie image is required!"],
    },
    addedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = mongoose_1.default.model("Movie", MovieScema);
