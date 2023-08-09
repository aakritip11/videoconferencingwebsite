import React from "react";
import { Link, useLocation } from "react-router-dom";

import logo from "./assets/LogoVC.jpg";

const Navbar = (props) => {
  const { userDetails } = props;
  
  const location = useLocation();

  return (
    <div className="bg-teal-900 font-bold">
      <div className="h-[5rem] flex items-center justify-between px-4 md:max-w-[90vw] mx-auto">
        <div className="flex items-center">
          <div className="flex w-[3rem] h-[3rem]">
            <img src={logo} alt="" className="object-cover" />
          </div>
          <div className="text-white font-bold">
            <p className="text-[21px] pl-2">
              <Link to="/">VidConnect</Link>
            </p>
          </div>
        </div>
        <div className="">
          <ul className="text-white font-bold flex items-center gap-9 cursor-pointer">
            <li>
              {userDetails && userDetails.name && location.pathname !== "/account" ? (
                <Link to="/account">{userDetails.name}</Link>
              ) : (
                <Link to="/account">Login</Link>
              )}
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
