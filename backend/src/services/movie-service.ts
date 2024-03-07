import Movie from "../models/movie-model";

const save = async (product: any, session: any) => {
  if (session) {
    return await product.save({ session });
  } else {
    return await product.save();
  }
};

const findAllMovie = () => {
  return Movie.find({});
};

const findAllByAddedBy = (addedBy: any) => {
  return Movie.find({
    addedBy,
  });
};

const findById = (id: any) => {
  return Movie.findOne({ _id: id });
};

const editMovieDetails = async (id: string, updatedDetails: any) => {
  return await Movie.findByIdAndUpdate(id, updatedDetails, { new: true });
};

const deleteMovieById = async (movieId: string) => {
  return await Movie.findByIdAndDelete(movieId);
};

export default {
  save,
  findAllByAddedBy,
  findById,
  findAllMovie,
  editMovieDetails,
  deleteMovieById,
};
