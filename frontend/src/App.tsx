import "./App.css";

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import LoginPage from "./components/LoginPage";
import UserHome from "./components/UserHome";
import RegisterPage from "./components/RegisterPage";
//import UserProducts from "./components/UserProduct";
import UserProfile from "./components/UserProfile";
import { ToastContainer } from "react-toastify";

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
            {/* <Route path="/userProducts" element={<UserProducts />} /> */}
            <Route path="/userProfile" element={<UserProfile />} />
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
