import constants from "./utills/constants";
import UserRouter from "./routes/user-route";

const requestMappings = (app: any) => {
  app.use(constants.API.PREFIX.concat("/user"), UserRouter);
};

export default requestMappings;
