import axios from "axios";
import React, { useEffect, useState } from "react";
import sliderImage1 from "../assets/sliderImage1.jpg";
import sliderImage2 from "../assets/sliderImage2.jpg";
import sliderImage3 from "../assets/sliderImage3.jpg";
// import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
//import { showErrorToast } from "./services/AlertService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const UserHome: React.FC = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
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
        "http://localhost:8001/api/v1/movie/getAllMovies",
        { headers }
      );

      setMovies(response.data.data);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  const handleMovie = (movieId: string) => {
    navigate(`/movieDetails/${movieId}`);
  };

  const staticReviews = [
    {
      id: 1,
      userName: "John Doe",
      rating: 4,
      reviewText: "Great movie, loved it!",
    },
    {
      id: 2,
      userName: "Jane Smith",
      rating: 5,
      reviewText: "Amazing storyline and characters.",
    },
    {
      id: 3,
      userName: "Alice Johnson",
      rating: 3,
      reviewText: "Not bad, but could be better.",
    },
    {
      id: 4,
      userName: "Bob Brown",
      rating: 4,
      reviewText: "Enjoyed every moment of it.",
    },
    {
      id: 5,
      userName: "Emily Davis",
      rating: 5,
      reviewText: "The best movie I've ever watched!",
    },
    {
      id: 6,
      userName: "Michael Wilson",
      rating: 4,
      reviewText: "Solid performance from the cast.",
    },
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />
        );
      } else {
        stars.push(
          <FontAwesomeIcon key={i} icon={faStar} className="text-gray-300" />
        );
      }
    }
    return stars;
  };

  return (
    <>
      <div className="container">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner mt-2">
            <div className="carousel-item active">
              <img
                className="d-block w-100 h-96"
                src={sliderImage1}
                alt="First slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100 h-96"
                src={sliderImage2}
                alt="Second slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100 h-96"
                src={sliderImage3}
                alt="Third slide"
              />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>

      <div className="container pt-5 h-full">
        <h1 className="text-center text-black font-inter font-bold text-2xl md:text-4xl">
          Latest MOVIES
        </h1>

        {/* Rest of your UI code for displaying movies */}
        <div className="mt-5">
          <div className="flex flex-wrap justify-center" id="row1">
            {movies.map((movie: any) => (
              <div
                key={movie._id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-8"
              >
                <a
                  className="cursor-pointer"
                  onClick={() => {
                    handleMovie(movie._id);
                  }}
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden justify-center items-center">
                    <center>
                      <img
                        src={movie.movieimage}
                        alt="Movie Poster"
                        className="w-auto h-96 object-cover"
                      />
                    </center>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {movie.movietitle}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        <strong>Director:</strong> {movie.moviedirector}
                      </p>
                      <p className="text-gray-600 mb-4">
                        <strong>Genre:</strong> {movie.moviegenre}
                      </p>
                      <p className="text-gray-600 mb-4">
                        <strong>Release Date:</strong> <br></br>
                        {new Date(movie.relesedate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Displaying reviews */}
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Latest Movie Reviews</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
          {staticReviews.map((review) => (
            <div key={review.id} className="mb-4">
              <div className="bg-white rounded-md shadow-md p-4">
                <p className="text-gray-600 mb-2 text-xl">
                  Reviewer Name: {review.userName}
                </p>
                <div className="flex mb-2">{renderStars(review.rating)}</div>
                <p className="text-gray-600 mb-2">
                  Review Text: {review.reviewText}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserHome;
