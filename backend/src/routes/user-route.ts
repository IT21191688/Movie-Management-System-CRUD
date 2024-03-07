import { Router } from "express";
import UserMiddleware from "../middlewares/user-middleware";

import {
  RegisterUser,
  GetUserProfile,
  UserLogin,
  // getAuth,
} from "../controllers/user-controller";
import constants from "../utills/constants";

const UserRouter = Router();

UserRouter.post("/register", RegisterUser);

UserRouter.post("/login", UserLogin);

//UserRouter.post("/getAuth", getAuth);

UserRouter.get(
  "/profile",
  UserMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  GetUserProfile
);

export default UserRouter;
