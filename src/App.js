import React, { useContext, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Post from "./components/main/post/Post";
import Sign from "./components/main/sign/Sign";
import { AuthContext } from "./context/AuthContext";
import PostProvider from "./context/PostContext";

function App() {
  const { isAuth, checkToken } = useContext(AuthContext);

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <PostProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route
              path="/"
              element={isAuth ? <Navigate to="/post" /> : <Sign />}
            />
            <Route
              path="/post"
              element={isAuth ? <Post /> : <Navigate to="/sign" />}
            />
            <Route
              path="/sign"
              element={isAuth ? <Navigate to="/post" /> : <Sign />}
            />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </PostProvider>
  );
}

export default App;
