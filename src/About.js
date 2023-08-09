import React from "react";
import logo from "./assets/VidConnect.jpg"
const About = () => {
  return (
    <div>
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-[700px] w-full mx-4">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="italic font-bold text-teal-800 mt-4">
          Welcome to VidConnect, your go-to platform for seamless video
          conferencing and collaboration. With our cutting-edge technology and
          user-friendly features, we're here to transform the way you
          communicate and connect with others.
        </p>
        <p className="italic font-bold text-teal-800 mt-4">
          Whether you're a business professional looking to host virtual
          meetings, an educator seeking to conduct webinars, or someone who
          simply wants to stay connected with loved ones, VidConnect has got
          you covered. Our high-quality video and audio, interactive tools, and
          security measures ensure a smooth and secure experience for all your
          virtual communication needs.
        </p>
        <p className="italic font-bold text-teal-800 mt-4">
          Join us on this journey to redefine communication in a digital age.
          Say goodbye to geographical limitations and embrace the power of
          VidConnect to bring people together, regardless of distance.
        </p>
        <p className="italic font-bold text-teal-800 mt-4">
          Connect, collaborate, and communicate better with VidConnect!
        </p>
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Our Team</h2>
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="Team Member"
              className="h-12 w-13 rounded-full"
            />
            <div>
              <p className="text-gray-800 font-semibold">XYZ</p>
              <p className="italic text-gray-600">CEO</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <img
              src={logo}
              alt="Team Member"
              className="h-12 w-13 rounded-full"
            />
            <div>
              <p className="text-gray-800 font-semibold">ABC</p>
              <p className="italic text-gray-600">Designer</p>
            </div>
          </div>
          {/* Add more team members here */}
        </div>
      </div>
    </div>
    </div>
  );
};

export default About;
