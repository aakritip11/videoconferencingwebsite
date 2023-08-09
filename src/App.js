import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import Room from "./Room";
import Auth from "./Auth";
import Account from "./Account";
import { auth, getUserFromDatabase } from "./Firebase";
import About from "./About";
import Navbar from "./Navbar";
import { UserContext } from "./UserContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  
  const fetchUserDetails = async (uid) => {
    const userDetails = await getUserFromDatabase(uid);
    setUserDetails(userDetails);
  };

  useEffect(() => {
    const listener = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        fetchUserDetails(user.uid);
      } else {
        setIsAuthenticated(false);
        setUserDetails({});
      }
    });

    return () => listener();
  }, []);

  return (
    <UserContext.Provider value={userDetails}>
    <div>
      <Navbar userDetails={userDetails}/>
      <Routes>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth signup />} />
        <Route path="/room/:roomID" element={<Room />} />

        <Route
          path="/account"
          element={
            isAuthenticated ? (
              <Account userDetails={userDetails} auth={isAuthenticated} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
    </UserContext.Provider>
  );
}

export default App;
