import axios from "axios";
import React, { useEffect, useState } from "react";
//import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const UserProfile: React.FC = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [role, setRole] = useState("");
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
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
        "https://movie-management-system-crud-1234.onrender.com/api/v1/user/profile",
        { headers }
      );

      //console.log(response.data.data);

      setFirstName(response.data.data.firstname);
      setLastName(response.data.data.lastname);
      setAddress(response.data.data.address);
      setEmail(response.data.data.email);
      setTelephone(response.data.data.telephone);
      setRole(response.data.data.role);
      //setUserId(response.data.data._id);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSubmit = async () => {
    navigate("/UserHome");
    window.location.reload();
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6">
          Hello {firstName + " " + lastName}
        </h1>
        <div className="bg-white shadow-lg rounded-lg px-8 py-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="mb-4">
                    <label
                      htmlFor="firstname"
                      className="block text-lg font-semibold mb-1"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="lastname"
                      className="block text-lg font-semibold mb-1"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-lg font-semibold mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="address"
                      className="block text-lg font-semibold mb-1"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Profile"
                    className="rounded-full h-56 w-56"
                  />
                  <button className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-700">
                    Change Profile Picture
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="mb-4">
                  <label
                    htmlFor="telephone"
                    className="block text-lg font-semibold mb-1"
                  >
                    Telephone
                  </label>
                  <input
                    type="number"
                    id="telephone"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="role"
                    className="block text-lg font-semibold mb-1"
                  >
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    value={role}
                    className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Back
            </button>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default UserProfile;
