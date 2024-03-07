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

export { CreateMovie };
