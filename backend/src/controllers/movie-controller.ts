import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import Movie from "../models/movie-model";
import userService from "../services/user-service";
import movieService from "../services/movie-service";

import NotFoundError from "../utills/error/error.classes/NotFoundError";
import BadRequestError from "../utills/error/error.classes/BadRequestError";
import ForbiddenError from "../utills/error/error.classes/ForbiddenError";

import constants from "../utills/constants";
import { sendEmail } from "../utills/email/email-server";
import emailTemplates from "../utills/email/email-templates";
import CustomResponse from "../utills/responce";

import commonService from "../config/storage-config";

const CreateMovie = async (req: Request, res: Response) => {
  const body = req.body;
  const auth = req.auth;
  let file: any = req.file;

  if (!file) {
    throw new BadRequestError("Movie image is required!");
  }
  //console.log(body);

  let createdMovie: any = null;

  try {
    const user = await userService.findById(auth._id);
    if (!user) throw new NotFoundError("User not found!");

    const newMovie = new Movie({
      movietitle: body.movietitle,
      moviegenre: body.moviegenre,
      relesedate: body.releasedate,
      moviedirector: body.moviedirector,
      description: body.description,
      movieimage: body.movieimage,
      addedBy: auth._id,
    });

    let uploadedObj: any = null;
    if (file) {
      uploadedObj = await commonService.uploadImageAndGetUri(
        file,
        constants.CLOUDINARY.FILE_NAME + "/movies"
      );
    }

    if (uploadedObj != null) {
      newMovie.movieimage = uploadedObj.uri.toString();
      // console.log(uploadedObj.uri.toString());
    }

    createdMovie = await movieService.save(newMovie, null);

    CustomResponse(
      res,
      true,
      StatusCodes.CREATED,
      "Movie created successfully!",
      createdMovie
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error creating Movie",
      error: error.message,
    });
  }
};

const FindAllMovies = async (req: Request, res: Response) => {
  try {
    const allProducts = await movieService.findAllMovie();

    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "All movies retrieved successfully!",
      allProducts
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error retrieving movies",
      error: error.message,
    });
  }
};

const EditMovieDetails = async (req: Request, res: Response) => {
  const auth: any = req.auth;
  const movieId = req.params.movieId;

  try {
    const movie = await movieService.findById(movieId);

    if (!movie) {
      throw new NotFoundError("Product not found!");
    }

    if (!movie.addedBy || movie.addedBy.toString() !== auth._id.toString()) {
      throw new ForbiddenError("You are not authorized to edit this movie!");
    }

    const updatedDetails = req.body;
    const updatedMovie = await movieService.editMovieDetails(
      movieId,
      updatedDetails
    );

    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "Product updated successfully!",
      updatedMovie
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error updating Movie",
      error: error.message,
    });
  }
};

const DeleteMovie = async (req: Request, res: Response) => {
  const auth: any = req.auth;
  const movieId = req.params.movieId;

  try {
    const movie = await movieService.findById(movieId);

    if (!movie) {
      throw new NotFoundError("Movie not found!");
    }

    if (!movie.addedBy || movie.addedBy.toString() !== auth._id.toString()) {
      throw new ForbiddenError("You are not authorized to edit this Movie!");
    }
    await movieService.deleteMovieById(movieId);

    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "Movie deleted successfully!",
      null
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error deleting Movie",
      error: error.message,
    });
  }
};

const FindOneMovieById = async (req: Request, res: Response) => {
  const auth: any = req.auth;
  const movieId = req.params.movieId;

  const user = await userService.findById(auth._id);
  if (!user) throw new NotFoundError("User not found!");

  try {
    const movie = await movieService.findById(movieId);

    if (!movie) {
      throw new NotFoundError("movie not found!");
    }

    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "movie retrieved successfully!",
      movie
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error retrieving movie",
      error: error.message,
    });
  }
};

export {
  CreateMovie,
  FindAllMovies,
  EditMovieDetails,
  DeleteMovie,
  FindOneMovieById,
};
