import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "./services/AlertService";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8001/api/v1/user/login",
        {
          email: email,
          password: password,
        }
      );

      const { data } = response.data;

      console.log(data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      if (data.user.role === "admin") {
        //showSuccessToast("Login successful! Admin");

        showSuccessToast("Login successful!");
        setTimeout(() => {
          navigate("/adminHome");
          window.location.reload();
        }, 2000);
      } else {
        showSuccessToast("Login successful!");
        setTimeout(() => {
          navigate("/userHome");
          window.location.reload();
        }, 2000);
        // showSuccessToast("Login successful!");
      }

      // window.location.reload();
    } catch (error) {
      navigate("/login");
      showErrorToast("Login Unsuccessfull!");
    }
  };

  function handleSignUp() {
    navigate("/register");
    window.location.reload();
  }

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full lg:w-1/3 lg:px-10 flex justify-center items-center">
        <div className="w-full lg:w-auto mx-auto flex flex-col items-center">
          <h1 className="text-4xl font-bold">Welcome to The Shop</h1>
          <p className="mt-2 text-lg">
            Your go-to destination for all your shopping needs!
          </p>
        </div>
      </div>

      <div className="bg-white p-8 rounded shadow-lg max-w-md mx-auto w-full lg:w-2/3">
        <div className="bg-white p-8">
          <h1 className="text-3xl font-bold text-center text-primary mb-6">
            User Login
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className={`border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-primary ${
                  emailError && "border-red-500"
                }`}
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
              />
              {emailError && (
                <div className="text-red-500 text-sm mt-1">{emailError}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-primary ${
                  passwordError && "border-red-500"
                }`}
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
              />
              {passwordError && (
                <div className="text-red-500 text-sm mt-1">{passwordError}</div>
              )}
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-md py-2 px-4 w-full hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
                style={{ backgroundColor: "#3490dc" }}
              >
                Login
              </button>
              <br />

              <button
                type="button"
                className="bg-orange-500 text-white rounded-md py-2 px-4 w-full hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
                style={{ backgroundColor: "#ed8936" }}
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
