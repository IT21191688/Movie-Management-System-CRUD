"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const movie_model_1 = __importDefault(require("../models/movie-model"));
const user_service_1 = __importDefault(require("../services/user-service"));
const movie_service_1 = __importDefault(require("../services/movie-service"));
const NotFoundError_1 = __importDefault(require("../utills/error/error.classes/NotFoundError"));
const BadRequestError_1 = __importDefault(require("../utills/error/error.classes/BadRequestError"));
const constants_1 = __importDefault(require("../utills/constants"));
const responce_1 = __importDefault(require("../utills/responce"));
const storage_config_1 = __importDefault(require("../config/storage-config"));
const CreateProduct = async (req, res) => {
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
