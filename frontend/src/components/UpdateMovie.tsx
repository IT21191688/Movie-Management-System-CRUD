import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "./services/AlertService";

const UpdateMovie: React.FC = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();

  const [movietitle, setMovieTitle] = useState("");
  const [moviedirector, setMovieDirector] = useState("");
  const [moviegenre, setMovieGenre] = useState("");
  const [relesedate, setReleaseDate] = useState("");
  const [description, setDescription] = useState("");
  //const [movieimage, setMovieImage] = useState<File | undefined>(undefined);

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        `http://localhost:8001/api/v1/movie/getOneMovie/${movieId}`,
        { headers }
      );
      const { data } = response.data;
      setMovieTitle(data.movietitle);
      setMovieDirector(data.moviedirector);
      setMovieGenre(data.moviegenre);
      setReleaseDate(data.relesedate);
      setDescription(data.description);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      showErrorToast("Error fetching movie details");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("movietitle", movietitle);
      formData.append("moviedirector", moviedirector);
      formData.append("moviegenre", moviegenre);
      formData.append("releasedate", relesedate);
      formData.append("description", description);
      // formData.append("movieimage", movieimage || "");

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
        `http://localhost:8001/api/v1/movie/updateMovie/${movieId}`,
        formData,
        { headers }
      );

      if (response.status === 200) {
        showSuccessToast("Movie updated successfully");
        setTimeout(() => {
          navigate("/allMovies");
        }, 2000);
      }
    } catch (error) {
      showErrorToast("Error updating movie");
      console.error("Error updating movie:", error);
    }
  };

  const handleCancel = () => {
    navigate("/allMovies");
  };

  const formattedDate = (rawDate: any) => {
    const date = new Date(rawDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Update Movie</h1>
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
            Movie Description:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control border-gray-300 rounded-md w-full p-2 mt-1"
            rows={4}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Release Date:
          </label>
          <input
            type="date"
            value={formattedDate(relesedate)}
            onChange={(e) => setReleaseDate(e.target.value)}
            className="form-control border-gray-300 rounded-md w-full p-2 mt-1"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Update Movie
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

export default UpdateMovie;
