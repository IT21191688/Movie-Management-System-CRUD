import constants from "./utills/constants";
import UserRouter from "./routes/user-route";
import MovieRouter from "./routes/movie-route";

const requestMappings = (app: any) => {
  app.use(constants.API.PREFIX.concat("/user"), UserRouter);
  app.use(constants.API.PREFIX.concat("/movie"), MovieRouter);
};

export default requestMappings;
