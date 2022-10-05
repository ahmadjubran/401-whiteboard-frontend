import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
            {isAuth ? (
              <Route path="/post" element={<Post />} />
            ) : (
              <Route path="/" element={<Sign />} />
            )}
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </PostProvider>
  );
}

export default App;
