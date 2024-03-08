import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "./services/AlertService";

const AddNewMovie: React.FC = () => {
  const navigate = useNavigate();

  const [movietitle, setMovieTitle] = useState("");
  const [moviedirector, setMovieDirector] = useState("");
  const [moviegenre, setMovieGenre] = useState("");
  const [releasedate, setReleaseDate] = useState("");
  const [movieimage, setMovieImage] = useState<File | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("movietitle", movietitle);
      formData.append("moviedirector", moviedirector);
      formData.append("moviegenre", moviegenre);
      formData.append("releasedate", releasedate);
      formData.append("movieimage", movieimage || "");

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const response = await axios.post(
        "http://localhost:8001/api/v1/movie/createMovie",
        formData,
        { headers }
      );

      if (response.status === 201) {
        showSuccessToast("Movie added successfully");
        setTimeout(() => {
          navigate("/allMovies");
        }, 2000);
      }
    } catch (error) {
      showErrorToast("Error adding movie");
      console.error("Error adding movie:", error);
    }
  };

  const handleCancel = () => {
    navigate("/all-movies");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Add New Movie</h1>
      <form onSubmit={handleSubmit} className="border rounded p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Movie Title:
          </label>
          <input
            type="text"
            value={movietitle}
            onChange={(e) => setMovieTitle(e.target.value)}
            className="form-control border-gray-300 rounded-md w-full p-2 mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Movie Director:
          </label>
          <input
            type="text"
            value={moviedirector}
            onChange={(e) => setMovieDirector(e.target.value)}
            className="form-control border-gray-300 rounded-md w-full p-2 mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Movie Genre:
          </label>
          <input
            type="text"
            value={moviegenre}
            onChange={(e) => setMovieGenre(e.target.value)}
            className="form-control border-gray-300 rounded-md w-full p-2 mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Release Date:
          </label>
          <input
            type="date"
            value={releasedate}
            onChange={(e) => setReleaseDate(e.target.value)}
            className="form-control border-gray-300 rounded-md w-full p-2 mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Movie Image:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file: any = e.target.files?.[0];
              if (file) {
                setMovieImage(file);
              }
            }}
            className="form-control border-gray-300 rounded-md w-full p-2 mt-1"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Add Movie
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewMovie;
