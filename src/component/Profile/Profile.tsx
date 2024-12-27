import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import axios from "axios";
import "./Profile.css";
import imgprofile from "../../assets/FB_IMG_1734733939208.jpg";

export default function Profile() {
  const [user, setUser] = useState({});
  const userData = useContext(AuthContext);

  // Retrieve user data from localStorage or default to {}
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")) || {};
    setUser(savedUser);
  }, []);

  // Fetch user data from the API if not already in localStorage
  const getUser = async () => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/user/${userData?.userData?.id}`
      );
      const fetchedUser = response?.data;
      setUser(fetchedUser);

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(fetchedUser));
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  useEffect(() => {
    if (userData?.userData?.id && !user.id) {
      getUser();
    }
  }, [userData?.userData?.id]);

  // Update user data and sync with localStorage
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedUser = { ...user, [name]: value };
    setUser(updatedUser);

    // Update localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <div className="profileContainer">
      <div className="addUserInfo">
        <h3 className="adduserInfoTitle">Profile</h3>
      </div>
      <div className="addUserFormContent m-4">
        <form className="shadow-lg p-4 parent">
          <div className="formContentImage">
            <img
              src={user?.image || imgprofile}
              alt="Profile"
              className="fromProfileImage"
            />
          </div>
          <div className="row">
            <div className="col-md-6 my-2">
              <label htmlFor="firstname" className="firstNamelabel my-2">
                First Name
              </label>
              <input
                type="text"
                className="firstNameInput form-control"
                id="firstname"
                placeholder="Enter Your First Name"
                autoComplete="off"
                name="firstName"
                value={user?.firstName || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 my-2">
              <label htmlFor="lastname" className="firstNamelabel my-2">
                Last Name
              </label>
              <input
                type="text"
                className="lastNameInput form-control"
                id="lastname"
                placeholder="Enter Your Last Name"
                autoComplete="off"
                name="lastName"
                value={user?.lastName || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 my-2">
              <label htmlFor="emailLabel" className="firstNamelabel my-2">
                Email
              </label>
              <input
                type="email"
                className="lastNameInput form-control"
                id="emailLabel"
                placeholder="Enter Your Email"
                autoComplete="off"
                name="email"
                value={user?.email || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 my-2">
              <label htmlFor="ageLabel" className="firstNamelabel my-2">
                Age
              </label>
              <input
                type="number"
                className="lastNameInput form-control"
                id="ageLabel"
                placeholder="Enter Your Age"
                autoComplete="off"
                name="age"
                value={user?.age || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 my-2">
              <label htmlFor="phoneLabel" className="firstNamelabel my-2">
                Phone Number
              </label>
              <input
                type="text"
                className="lastNameInput form-control"
                id="phoneLabel"
                placeholder="Enter Your Phone Number"
                autoComplete="off"
                name="phone"
                value={user?.phone || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 my-2">
              <label htmlFor="birthdateLabel" className="firstNamelabel my-2">
                Birth Date
              </label>
              <input
                type="date"
                className="lastNameInput form-control"
                id="birthdateLabel"
                placeholder="Enter Your Birth Date"
                autoComplete="off"
                name="birthDate"
                value={
                  user?.birthDate
                    ? new Date(user.birthDate).toISOString().split("T")[0]
                    : ""
                }
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
