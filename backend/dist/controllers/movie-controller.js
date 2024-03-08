"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindOneMovieById = exports.DeleteMovie = exports.EditMovieDetails = exports.FindAllMovies = exports.CreateMovie = void 0;
const http_status_codes_1 = require("http-status-codes");
const movie_model_1 = __importDefault(require("../models/movie-model"));
const user_service_1 = __importDefault(require("../services/user-service"));
const movie_service_1 = __importDefault(require("../services/movie-service"));
const NotFoundError_1 = __importDefault(require("../utills/error/error.classes/NotFoundError"));
const BadRequestError_1 = __importDefault(require("../utills/error/error.classes/BadRequestError"));
const ForbiddenError_1 = __importDefault(require("../utills/error/error.classes/ForbiddenError"));
const constants_1 = __importDefault(require("../utills/constants"));
const responce_1 = __importDefault(require("../utills/responce"));
const storage_config_1 = __importDefault(require("../config/storage-config"));
const CreateMovie = async (req, res) => {
    const body = req.body;
    const auth = req.auth;
    let file = req.file;
    if (!file) {
        throw new BadRequestError_1.default("Movie image is required!");
    }
    //console.log(body);
    let createdMovie = null;
    try {
        const user = await user_service_1.default.findById(auth._id);
        if (!user)
            throw new NotFoundError_1.default("User not found!");
        const newMovie = new movie_model_1.default({
            movietitle: body.movietitle,
            moviegenre: body.moviegenre,
            relesedate: body.releasedate,
            moviedirector: body.moviedirector,
            description: body.description,
            movieimage: body.movieimage,
            addedBy: auth._id,
        });
        let uploadedObj = null;
        if (file) {
            uploadedObj = await storage_config_1.default.uploadImageAndGetUri(file, constants_1.default.CLOUDINARY.FILE_NAME + "/movies");
        }
        if (uploadedObj != null) {
            newMovie.movieimage = uploadedObj.uri.toString();
            // console.log(uploadedObj.uri.toString());
        }
        createdMovie = await movie_service_1.default.save(newMovie, null);
        (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Movie created successfully!", createdMovie);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error creating Movie",
            error: error.message,
        });
    }
};
exports.CreateMovie = CreateMovie;
const FindAllMovies = async (req, res) => {
    try {
        const allProducts = await movie_service_1.default.findAllMovie();
        (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "All movies retrieved successfully!", allProducts);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error retrieving movies",
            error: error.message,
        });
    }
};
exports.FindAllMovies = FindAllMovies;
const EditMovieDetails = async (req, res) => {
    const auth = req.auth;
    const movieId = req.params.movieId;
    try {
        const movie = await movie_service_1.default.findById(movieId);
        if (!movie) {
            throw new NotFoundError_1.default("Movie not found!");
        }
        if (!movie.addedBy || movie.addedBy.toString() !== auth._id.toString()) {
            throw new ForbiddenError_1.default("You are not authorized to edit this movie!");
        }
        const updatedDetails = req.body;
        const updatedMovie = await movie_service_1.default.editMovieDetails(movieId, updatedDetails);
        (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Movie updated successfully!", updatedMovie);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error updating Movie",
            error: error.message,
        });
    }
};
exports.EditMovieDetails = EditMovieDetails;
const DeleteMovie = async (req, res) => {
    const auth = req.auth;
    const movieId = req.params.movieId;
    try {
        const movie = await movie_service_1.default.findById(movieId);
        if (!movie) {
            throw new NotFoundError_1.default("Movie not found!");
        }
        if (!movie.addedBy || movie.addedBy.toString() !== auth._id.toString()) {
            throw new ForbiddenError_1.default("You are not authorized to edit this Movie!");
        }
        await movie_service_1.default.deleteMovieById(movieId);
        (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Movie deleted successfully!", null);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error deleting Movie",
            error: error.message,
        });
    }
};
exports.DeleteMovie = DeleteMovie;
const FindOneMovieById = async (req, res) => {
    const auth = req.auth;
    const movieId = req.params.movieId;
    const user = await user_service_1.default.findById(auth._id);
    if (!user)
        throw new NotFoundError_1.default("User not found!");
    try {
        const movie = await movie_service_1.default.findById(movieId);
        if (!movie) {
            throw new NotFoundError_1.default("movie not found!");
        }
        (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "movie retrieved successfully!", movie);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error retrieving movie",
            error: error.message,
        });
    }
};
exports.FindOneMovieById = FindOneMovieById;
