import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { showSuccessToast } from "./services/AlertService";

const AllMovies: React.FC = () => {
  const [movies, setMovies] = useState([]);
  const [sortedMovies, setSortedMovies] = useState([]);
  const [sortByGenre, setSortByGenre] = useState("");
  const [sortByYear, setSortByYear] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    sortMovies();
  }, [movies, sortByGenre, sortByYear]);

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

  const handleDelete = async (movieId: any) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.delete(
        `http://localhost:8001/api/v1/movie/deleteMovie/${movieId}`,
        { headers }
      );

      setTimeout(() => {
        showSuccessToast("Movie Delete successfully");
        fetchMovies();
      }, 2000);
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const sortMovies = () => {
    let sortedList = [...movies];
    if (sortByGenre) {
      sortedList = sortedList.filter(
        (movie: any) => movie.moviegenre === sortByGenre
      );
    }
    if (sortByYear) {
      // alert(sortByYear);
      sortedList = sortedList.filter(
        (movie: any) => new Date(movie.relesedate).getFullYear() === +sortByYear
      );
    }
    setSortedMovies(sortedList);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
    let searchList = [...movies];
    if (e.target.value) {
      searchList = searchList.filter((movie: any) =>
        movie.movietitle.toLowerCase().includes(e.target.value.toLowerCase())
      );
    }
    setSortedMovies(searchList);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">All Movies</h1>
        <Link to="/addNewMovie" className="btn btn-primary">
          New Movie
        </Link>
      </div>
      <div className="flex justify-between mb-4 space-x-4">
        <div className="col-md-3">
          <label htmlFor="genre">
            <b>Sort by Genre:</b>
          </label>
          <br />
          <select
            id="genre"
            value={sortByGenre}
            onChange={(e) => setSortByGenre(e.target.value)}
            className="w-full border rounded-md py-2 px-2"
          >
            <option value="">All</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Thriller">Thriller</option>
            <option value="Horror">Horror</option>
            <option value="Science Fiction">Science Fiction</option>
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="year">
            <b>Sort by Year:</b>
          </label>
          <br />
          <select
            id="year"
            value={sortByYear}
            onChange={(e) => setSortByYear(e.target.value)}
            className="w-full border rounded-md py-2 px-2"
          >
            <option value="">All</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="search">
            <b>Search by Name:</b>
          </label>
          <br />
          <input
            type="text"
            id="search"
            value={searchName}
            onChange={handleSearch}
            className="w-full border rounded-md py-2 px-2"
          />
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col" className="text-center">
                Movie Title
              </th>
              <th scope="col" className="text-center">
                Movie Director
              </th>
              <th scope="col" className="text-center">
                Movie Genre
              </th>
              <th scope="col" className="text-center">
                Movie Image
              </th>
              <th scope="col" className="text-center">
                Release Date
              </th>
              <th scope="col" className="text-center">
                Added By
              </th>
              <th scope="col" className="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedMovies.map((movie: any) => (
              <tr key={movie._id}>
                <td>{movie.movietitle}</td>
                <td>{movie.moviedirector}</td>
                <td>{movie.moviegenre}</td>
                <td>
                  <img className="w-16" src={movie.movieimage} alt="Movie" />
                </td>
                <td>
                  {new Date(movie.relesedate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td>{movie.addedBy.firstname}</td>
                <td className="border px-4 py-2 text-center">
                  <Link
                    to={`/updateMovie/${movie._id}`}
                    className="btn btn-primary mr-2"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(movie._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllMovies;
