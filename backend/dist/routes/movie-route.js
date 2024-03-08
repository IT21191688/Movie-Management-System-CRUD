"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_middleware_1 = __importDefault(require("../middlewares/user-middleware"));
const storage_middleware_1 = __importDefault(require("../config/storage-middleware"));
const movie_controller_1 = require("../controllers/movie-controller");
const constants_1 = __importDefault(require("../utills/constants"));
const MovieRouter = (0, express_1.Router)();
MovieRouter.post("/createMovie", user_middleware_1.default.authorize([constants_1.default.USER.ROLES.USER]), storage_middleware_1.default.multerUploader.single("movieimage"), movie_controller_1.CreateMovie);
MovieRouter.get("/getAllMovies", user_middleware_1.default.authorize([constants_1.default.USER.ROLES.USER]), movie_controller_1.FindAllMovies);
MovieRouter.post("/updateMovie/:movieId", user_middleware_1.default.authorize([constants_1.default.USER.ROLES.USER]), storage_middleware_1.default.multerUploader.single("movieimage"), movie_controller_1.EditMovieDetails);
MovieRouter.get("/getOneMovie/:movieId", user_middleware_1.default.authorize([constants_1.default.USER.ROLES.USER]), movie_controller_1.FindOneMovieById);
MovieRouter.delete("/deleteMovie/:movieId", user_middleware_1.default.authorize([constants_1.default.USER.ROLES.USER]), movie_controller_1.DeleteMovie);
exports.default = MovieRouter;
