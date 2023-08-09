import React, { useState, useRef } from "react";
import { signOut } from "firebase/auth";
import { IoCamera } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { Navigate, useNavigate } from "react-router-dom";
import { auth, uploadImage, updateUserDatabase } from "./Firebase";
import pimg from "./assets/pimg.png";

function Account(props) {
  const userDetails = props.userDetails;
  const isAuthenticated = props.auth;
  const imagePicker = useRef();

  const [progress, setProgress] = useState(0);
  const [profileImageUploadStarted, setProfileImageUploadStarted] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(
    userDetails.profileImage ||
      "https://th.bing.com/th/id/OIP.uisWlf9tnHjsi09idcBagwAAAA?pid=ImgDet&rs=1"
  );
  
  const [userProfileValues, setUserProfileValues] = useState({
    name: userDetails.name || "",
    designation: userDetails.designation || "",
    github: userDetails.github || "",
    linkedin: userDetails.linkedin || "",
  });
  
  
  const [showSaveDetailsButton, setShowSaveDetailsButton] = useState(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleBackClick = () => {
    navigate("/")
  }

  const handleCameraClick = () => {
    imagePicker.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setProfileImageUploadStarted(true);
    uploadImage(
      file,
      (progress) => {
        setProgress(progress);
      },
      (url) => {
        setProfileImageUrl(url);
        updateProfileImageToDatabase(url);
        setProfileImageUploadStarted(false);
        setProgress(0);
      },
      (err) => {
        console.error("Error->", err);
        setProfileImageUploadStarted(true);
      }
    );
  };

  const updateProfileImageToDatabase = (url) => {
    updateUserDatabase(
      { ...userProfileValues, profileImage: url },
      userDetails.uid
    );
  };

  const handleInputChange = (event, property) => {
    setShowSaveDetailsButton(true);

    setUserProfileValues((prev) => ({
      ...prev,
      [property]: event.target.value,
    }));
  };

  const saveDetailsToDatabase = async () => {
    if (!userProfileValues.name) {
      setErrorMessage("Name required");
      return;
    }

    setSaveButtonDisabled(true);
    await updateUserDatabase({ ...userProfileValues }, userDetails.uid);
    setSaveButtonDisabled(false);
    setShowSaveDetailsButton(false);
  };

  return isAuthenticated ? (
    <div>
      <div className="min-h-screen bg-gray-200 bg-gradient-to-br from-lavender to-teal-400 flex justify-center items-center">
        <div className="container bg-gray-100 bg-lavender shadow-2xl rounded-lg p-7 h-[100vh] w-[100%] flex flex-col gap-9"> 
        <div className="flex items-center justify-between mb-9">
          <div className="cursor-pointer flex items-center gap-2" onClick={handleBackClick}>
            <IoMdArrowBack className="h-6 w-6" />
            <span className="font-bold text-base md:text-2xl">Back to Home</span>
          </div>
          <div className="cursor-pointer flex items-center gap-2" onClick={handleLogout}>
            <FiLogOut className="h-6 w-6" />
            <span className="font-bold text-base md:text-2xl">Logout</span>
          </div>
          </div>
            <div className="flex items-center gap-5">
              <img src={pimg} alt="Profile Image" className="h-12 w-12" />
              <p className="font-bold text-4xl md:text-5xl gap-3">
                {userProfileValues.name}
              </p>
            </div>

          <input
            ref={imagePicker}
            type="file"
            className="hidden"
            onChange={handleImageChange}
          />

          <div className="flex flex-col md:flex-row gap-11">
            <div className="flex flex-col">
              <div className="relative h-40 w-40 md:h-56 md:w-56 rounded-full overflow-hidden border-lavender">
                <img
                  src={profileImageUrl}
                  alt="Profile Image"
                  className="object-cover h-full w-full"
                />
                <div
                  className="absolute right-3 top-4 bg-white rounded-full p-3 cursor-pointer"
                  onClick={handleCameraClick}
                >
                  <IoCamera className="h-6 w-6 text-teal-400" />
                </div>
              </div>
              {profileImageUploadStarted && (
                <p className="font-bold text-sm">
                  {progress === 100
                    ? "Getting image url..."
                    : `${progress.toFixed(2)}% uploaded`}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 w-full">
              <div className="flex gap-7">
                <div className="container">
                  <label className="font-bold text-2xl">Name</label>
                  <div className="inputContainer">
                    <input
                      type="text"
                      placeholder="Enter your Name"
                      value={userProfileValues.name}
                      onChange={(event) => handleInputChange(event, "name")}
                      className="md:py-7 px-7 bg-gray-100 font-bold text-teal-800 text-lg md:text-2xl"
                    />
                  </div>
                </div>
                <div className="container mb-7">
                  <label className="font-bold text-2xl">Title</label>
                  <div className="inputContainer">
                    <input
                      type="text"
                      placeholder="eg. Full stack developer"
                      value={userProfileValues.designation}
                      onChange={(event) => handleInputChange(event, "designation")}
                      className="py-1.5 md:py-2 px-2 rounded-[3px] w-[100%] max-w-[25rem] mt-2 text-black md:mt-6 outline-0 border border-teal-900 border-solid border-2 rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-7">
                <div className="container">
                  <label className="font-bold text-2xl">Github</label>
                  <div className="inputContainer">
                    <input
                      type="text"
                      placeholder="Enter your github link"
                      value={userProfileValues.github}
                      onChange={(event) => handleInputChange(event, "github")}
                      className="py-1.5 md:py-2 px-2 rounded-[3px] w-[100%] max-w-[25rem] mt-2 text-black md:mt-6 outline-0 border border-teal-900 border-solid border-2 rounded-md"
                    />
                  </div>
                </div>
                <div className="container">
                  <label className="font-bold text-2xl">Linkedin</label>
                  <div className="inputContainer">
                    <input
                      type="text"
                      placeholder="Enter your linkedin link"
                      value={userProfileValues.linkedin}
                      onChange={(event) => handleInputChange(event, "linkedin")}
                      className="py-1.5 md:py-2 px-2 rounded-[3px] w-[100%] max-w-[25rem] mt-2 text-black md:mt-6 outline-0 border border-teal-900 border-solid border-2 rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div className="flex mt-4 md:mt-7 justify-between gap-4 md:gap-30">
                <p className="font-bold text-red-500">{errorMessage}</p>
                {showSaveDetailsButton && (
                  <button
                    disabled={saveButtonDisabled}
                    onClick={saveDetailsToDatabase}
                    className="bg-teal-900 text-white py-2 px-4 rounded-lg w-full max-w-[200px] font-bold flex justify-center items-center gap-1 transition duration-200 hover:bg-teal-800 active:translate-y-1 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Save Details
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  ) : (
    <Navigate to="/" />
  );
}

export default Account;
