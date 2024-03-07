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
const ProductRouter = (0, express_1.Router)();
ProductRouter.post("/createMovie", user_middleware_1.default.authorize([constants_1.default.USER.ROLES.USER]), storage_middleware_1.default.multerUploader.single("movieimage"), movie_controller_1.CreateMovie);
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
exports.default = ProductRouter;
