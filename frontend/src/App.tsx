import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import LoginPage from "./components/LoginPage";
import UserHome from "./components/UserHome";
import RegisterPage from "./components/RegisterPage";
import UserProfile from "./components/UserProfile";
import { ToastContainer } from "react-toastify";
import AllMovies from "./components/AllMovies";
import AddNewMovie from "./components/AddNewMovie";
import UpdateMovie from "./components/UpdateMovie";
import MovieDisplay from "./components/MovieDisplay";

function App() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    setUser(localStorage.getItem("role") ? localStorage.getItem("role") : "");
  });
  return (
    <>
      <NavBar />
      <ToastContainer />

      {user === "admin" ? (
        <Router>
          <Routes></Routes>
        </Router>
      ) : user === "user" ? (
        <Router>
          <Routes>
            <Route path="/userHome" element={<UserHome />} />
            <Route path="/allMovies" element={<AllMovies />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/addNewMovie" element={<AddNewMovie />} />
            <Route path="/updateMovie/:movieId" element={<UpdateMovie />} />
            <Route path="/movieDetails/:movieId" element={<MovieDisplay />} />
          </Routes>
        </Router>
      ) : null}

      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
