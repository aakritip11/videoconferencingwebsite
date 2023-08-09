import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, updateUserDatabase } from "./Firebase";
import { IoMdArrowBack } from "react-icons/io";

function Auth(props) {
  const isSignup = props.signup ? true : false;
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleLogin = () => {
    if (!values.email || !values.password) {
      setErrorMsg("All fields required");
      return;
    }

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async () => {
        setSubmitButtonDisabled(false);
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  const handleBackClick = () => {
    navigate("/")
  }

  const handleSignup = () => {
    if (!values.name || !values.email || !values.password) {
      setErrorMsg("All fields required");
      return;
    }

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (response) => {
        const userId = response.user.uid;
        await updateUserDatabase(
          { name: values.name, email: values.email },
          userId
        );
        setSubmitButtonDisabled(false);
        navigate("/account");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  const handleSubmission = (event) => {
    event.preventDefault();

    if (isSignup) handleSignup();
    else handleLogin();
  };

  return (
    <div>
      <div className="cursor-pointer flex px-7 items-center gap-2" onClick={handleBackClick}>
        <IoMdArrowBack className="mt-7 h-6 w-6" />
        <span className="font-bold mt-7 text-base md:text-2xl">Back to Home</span>
      </div>
      <div className="min-h-screen bg-gradient-to-br from-lavender to-teal flex justify-center items-center mt-[-100px]">  
        <form className="bg-lavender from-gray-200 to-gray-900 rounded-lg p-8 w-[fit-content] min-w-[380px] flex flex-col gap-5 shadow-2xl" onSubmit={handleSubmission}>
          <p className="font-bold text-2xl">{isSignup ? "Signup" : "Login"}</p>
          {isSignup && (
            <input
              type="text"
              placeholder="Enter your name"
              value={values.name}
              onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
              className="py-1.5 md:py-2 px-2 rounded-[3px] w-[100%] max-w-[25rem] mt-2 text-black md:mt-6 outline-0 border border-teal-900 border-solid border-2 rounded-md"
            />
          )}
          <input
            type="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
            className="py-1.5 md:py-2 px-2 rounded-[3px] w-[100%] max-w-[25rem] mt-2 text-black md:mt-6 outline-0 border border-teal-900 border-solid border-2 rounded-md"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={(event) => setValues((prev) => ({ ...prev, password: event.target.value }))}
            className="py-1.5 md:py-2 px-2 rounded-[3px] w-[100%] max-w-[25rem] mt-2 text-black md:mt-6 outline-0 border border-teal-900 border-solid border-2 rounded-md"
          />

          <p className="font-bold text-teal-700 text-center">{errorMsg}</p>

          <button
            type="submit"
            disabled={submitButtonDisabled}
            className="bg-teal-900 text-white py-2 px-4 rounded-lg w-full font-bold flex justify-center items-center gap-1 transition duration-200 hover:bg-teal-800 active:translate-y-1 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSignup ? "Signup" : "Login"}
          </button>

          <div className="text-center">
            {isSignup ? (
              <p>
                Already have an account?{" "}
                <Link to="/login" className="font-bold hover:text-teal-800">
                  Login here
                </Link>
              </p>
            ) : (
              <p>
                New here?{" "}
                <Link to="/signup" className="font-bold hover:text-teal-800">
                  Create an account
                </Link>
              </p>
            )}
          </div>
        </form>
      </div>
      </div>
  );
}

export default Auth;
