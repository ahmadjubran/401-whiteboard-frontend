import React, { useContext, useEffect } from "react";
import { When } from "react-if";
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
      <div className="App">
        <Header />
        <When condition={!isAuth}>
          <Sign />
        </When>
        <When condition={isAuth}>
          <Post />
        </When>
        <Footer />
      </div>
    </PostProvider>
  );
}

export default App;
