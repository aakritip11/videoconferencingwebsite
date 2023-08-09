import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import conf from "./assets/conf.jpg";

const Home = ({ isAuthenticated }) => {
  const [RoomCode, setRoomCode] = useState("");
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  
  const submitCode = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate(`/room/${RoomCode}`);
    } else {
      setErrorMsg("You are not logged in. Please log in.")
    }
  };

  return (
    <div className=" ">
      <div className="relative h-screen ">
        <div className="absolute h-full w-full flex overflow-hidden">
          <img src={conf} className="object-cover  w-full h-full" />
        </div>
        <div className="absolute h-full w-full flex overflow-hidden bg-black/70"></div>
        <div className="lg:flex lg:pt-20 flex-col items-center justify-center relative z-10 px-6 md:max-w-[90vw] mx-auto">
          <div className=" flex flex-col items-center justify-center pb-8">
            <h1 className="text-[50px] md:text-[80px] text-white font-bold pt-12">
              VidConnect
            </h1>
            <p className="text-[26px] text-white -mt-2">Where Every Pixel Speaks Louder</p>
          </div>
          <form
            onSubmit={submitCode}
            className="text-white md:pt-12 flex flex-col items-center justify-center"
          >
            <div className=" flex flex-col justify-center items-center">
              <label className="text-[30px] md:text-[38px] font-bold pt-6">
                Enter Meeting ID
              </label>
              <input
                type="text"
                required
                placeholder="Meeting ID"
                value={RoomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                className="py-1.5 md:py-2 px-2 rounded-[3px] w-[100%] max-w-[25rem] mt-2 text-black md:mt-6 outline-0 border border-teal-900 border-solid border-2 rounded-md"
              />
            </div>
            <p className="font-bold text-white text-center">{errorMsg}</p>
            <button
              type="submit"
              className=" bg-teal-900 hover:bg-blue-400 duration-100 ease-out font-bold w-[5rem] md:w-[7rem] rounded-[5px] py-[5px] md:py-[7px] mt-2 md:mt-4 "
            >
              Go
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;