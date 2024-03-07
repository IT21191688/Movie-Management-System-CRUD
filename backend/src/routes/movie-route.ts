import { Router } from "express";
import userMiddleware from "../middlewares/user-middleware";
import commonMiddleware from "../config/storage-middleware";

import { CreateMovie } from "../controllers/movie-controller";
import constants from "../utills/constants";

const ProductRouter = Router();

ProductRouter.post(
  "/createMovie",
  userMiddleware.authorize([constants.USER.ROLES.USER]),
  commonMiddleware.multerUploader.single("movieimage"),
  CreateMovie
);

// ProductRouter.get(
//   "/getAllProduct",
//   userMiddleware.authorize([
//     constants.USER.ROLES.ADMIN,
//     constants.USER.ROLES.USER,
//   ]),
//   FindAllProducts
// );

// ProductRouter.post(
//   "/updateProduct/:productId",
//   userMiddleware.authorize([constants.USER.ROLES.ADMIN]),
//   commonMiddleware.multerUploader.single("productimage"),
//   EditProductDetails
// );

// ProductRouter.get(
//   "/getOneProduct/:productId",
//   userMiddleware.authorize([
//     constants.USER.ROLES.ADMIN,
//     constants.USER.ROLES.USER,
//   ]),
//   FindOneProductById
// );

// ProductRouter.delete(
//   "/deleteProduct/:productId",
//   userMiddleware.authorize([constants.USER.ROLES.ADMIN]),
//   DeleteProduct
// );

export default ProductRouter;
