import { Router } from "express";
import userMiddleware from "../middlewares/user-middleware";
import commonMiddleware from "../config/storage-middleware";

import {
  CreateMovie,
  DeleteMovie,
  EditMovieDetails,
  FindAllMovies,
  FindOneMovieById,
} from "../controllers/movie-controller";
import constants from "../utills/constants";

const MovieRouter = Router();

MovieRouter.post(
  "/createMovie",
  userMiddleware.authorize([constants.USER.ROLES.USER]),
  commonMiddleware.multerUploader.single("movieimage"),
  CreateMovie
);

MovieRouter.get(
  "/getAllMovies",
  userMiddleware.authorize([constants.USER.ROLES.USER]),
  FindAllMovies
);

MovieRouter.post(
  "/updateMovie/:movieId",
  userMiddleware.authorize([constants.USER.ROLES.USER]),
  commonMiddleware.multerUploader.single("movieimage"),
  EditMovieDetails
);

MovieRouter.get(
  "/getOneMovie/:movieId",
  userMiddleware.authorize([constants.USER.ROLES.USER]),
  FindOneMovieById
);

MovieRouter.delete(
  "/deleteMovie/:movieId",
  userMiddleware.authorize([constants.USER.ROLES.USER]),
  DeleteMovie
);

export default MovieRouter;
