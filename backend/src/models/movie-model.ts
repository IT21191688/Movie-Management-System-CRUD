import mongoose from "mongoose";
//import constants from "../constant";

const MovieScema = new mongoose.Schema(
  {
    movietitle: {
      type: String,
      required: [true, "movie name is required!"],
    },

    moviegenre: {
      type: String,
      required: [true, "movie genre is required!"],
    },

    relesedate: {
      type: Date,
      required: [true, "movie relesedate is Required"],
    },

    moviedirector: {
      type: String,
      required: [true, "movie director is required!"],
    },

    discription: {
      type: String,
      maxlength: [500, "Description cannot be more than 500 characters!"],
    },

    movieimage: {
      type: String,
      required: [false, "movie image is required!"],
    },

    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Movie", MovieScema);
