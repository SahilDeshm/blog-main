import React from "react";
import "./App.css";
import Header from "./Header";
import Post from "./Post";
import { Route , Routes } from "react-router-dom";
import Layout from "./Layout";
import Index from "./Pages/Index";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import CreatePost from "./Pages/CreatePost";
import PostPg from "./Pages/PostPg";

function App() {
  return (
    
    <Routes>
      <Route path = "/" element ={<Layout/>}>
        <Route index element = {<Index />} />
        <Route path= "/login" element = {<LoginPage/>} />
        <Route path="/register" element = {<RegisterPage />} />
        <Route path="/create" element= {<CreatePost />} />
        <Route path= "/post/:id" element= {<PostPg />} />
      </Route>
    </Routes>   
  );
}

export default App;
