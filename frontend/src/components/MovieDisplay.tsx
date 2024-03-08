import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "./services/AlertService";

const MovieDisplay: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();

  const [movietitle, setMovieTitle] = useState("");
  const [moviedirector, setMovieDirector] = useState("");
  const [moviegenre, setMovieGenre] = useState("");
  const [relesedate, setReleaseDate] = useState("");
  const [movieimage, setMovieImage] = useState("");
  const [description, setDescription] = useState("");

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
        `https://movie-management-system-crud-1234.onrender.com/api/v1/movie/getOneMovie/${movieId}`,
        { headers }
      );
      const { data } = response.data;
      setMovieTitle(data.movietitle);
      setMovieDirector(data.moviedirector);
      setMovieGenre(data.moviegenre);
      setReleaseDate(data.relesedate);
      setMovieImage(data.movieimage);
      setDescription(data.description);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      showErrorToast("Error fetching movie details");
    }
  };

  const formattedDate = (rawDate: any) => {
    const date = new Date(rawDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  function handleBack() {
    navigate("/UserHome");
    window.location.reload();
  }

  return (
    <>
      <div className="container mx-auto py-8">
        <div className="max-w-3xl mx-auto flex flex-wrap">
          <div className="w-full md:w-1/2 mb-4">
            <img className="w-full" src={movieimage} alt={movietitle} />
          </div>
          <div className="w-full md:w-1/2 mb-4 pl-10">
            <div className="container mx-auto py-8">
              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h1 className="text-3xl font-bold mb-4">{movietitle}</h1>
                  <p className="text-gray-700 mb-4">
                    <strong>Director:</strong> {moviedirector}
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Genre:</strong> {moviegenre}
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Release Date:</strong> {formattedDate(relesedate)}
                  </p>
                  <p className="text-gray-700">{description}</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-700"
                onClick={handleBack}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDisplay;
