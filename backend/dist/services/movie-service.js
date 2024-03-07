"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const movie_model_1 = __importDefault(require("../models/movie-model"));
const save = async (product, session) => {
    if (session) {
        return await product.save({ session });
    }
    else {
        return await product.save();
    }
};
const findAllMovie = () => {
    return movie_model_1.default.find({});
};
const findAllByAddedBy = (addedBy) => {
    return movie_model_1.default.find({
        addedBy,
    });
};
const findById = (id) => {
    return movie_model_1.default.findOne({ _id: id });
};
const editMovieDetails = async (id, updatedDetails) => {
    return await movie_model_1.default.findByIdAndUpdate(id, updatedDetails, { new: true });
};
const deleteMovieById = async (movieId) => {
    return await movie_model_1.default.findByIdAndDelete(movieId);
};
exports.default = {
    save,
    findAllByAddedBy,
    findById,
    findAllMovie,
    editMovieDetails,
    deleteMovieById,
};
