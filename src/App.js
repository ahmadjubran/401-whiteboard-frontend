import { Button, useColorMode, VStack } from "@chakra-ui/react";
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
  const { userState } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <PostProvider>
      <BrowserRouter>
        <VStack>
          <div className="App">
            <Button
              onClick={toggleColorMode}
              position="fixed"
              top="0"
              left="0"
              m={4}
              bg={colorMode === "light" ? "gray.800" : "gray.300"}
              color={colorMode === "light" ? "gray.300" : "gray.800"}
              _hover={{ bg: colorMode === "light" ? "gray.700" : "gray.400" }}
            >
              Toggle {colorMode === "light" ? "Dark" : "Light"}
            </Button>
            <Header />
            <Routes>
              <Route path="/" element={userState.isAuth ? <Navigate to="/post" /> : <Sign />} />
              <Route path="/post" element={userState.isAuth ? <Post /> : <Navigate to="/sign" />} />
              <Route path="/sign" element={userState.isAuth ? <Navigate to="/post" /> : <Sign />} />
            </Routes>
            <Footer />
          </div>
        </VStack>
      </BrowserRouter>
    </PostProvider>
  );
}

export default App;
