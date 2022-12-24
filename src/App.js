import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./components/auth";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Post from "./components/home";
import { isAuthState } from "./features/authSlicer";

function App() {
  const isAuth = useSelector(isAuthState);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={isAuth ? <Navigate to="/post" /> : <Auth />} />
          <Route path="/post" element={isAuth ? <Post /> : <Navigate to="/sign" />} />
          <Route path="/sign" element={isAuth ? <Navigate to="/post" /> : <Auth />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
