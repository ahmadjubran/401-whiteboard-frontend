import React, { useContext } from "react";
import cookies from "react-cookies";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Post from "./components/Post";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { AuthContext } from "./context/AuthContext";

import "./App.css";

function App() {
  const { isAuth, setIsAuth, getIsAuth } = useContext(AuthContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Header isAuth={isAuth} setIsAuth={setIsAuth} />
        <Routes>
          <Route
            path="/"
            element={<Signin isAuth={isAuth} setIsAuth={setIsAuth} />}
          />
          <Route
            path="/signin"
            element={<Signin isAuth={isAuth} setIsAuth={setIsAuth} />}
          />
          <Route
            path="/signup"
            element={<Signup isAuth={isAuth} setIsAuth={setIsAuth} />}
          />
          {cookies.load("token") ? (
            <Route path="/post" element={<Post />} />
          ) : (
            <Route
              path="/signin"
              element={<Signin isAuth={isAuth} setIsAuth={setIsAuth} />}
            />
          )}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
