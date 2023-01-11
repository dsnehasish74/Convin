import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { auth, firebase, provider } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "./Redux/Actions/AuthActions";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Bucket from "./Pages/Bucket/Bucket";
import History from "./Pages/History/History";

function App() {
  const dispatch = useDispatch();
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      console.log(user, uid);
      dispatch(setUserId(uid));
      // ...
    } else {
      // User is signed out
      // ...
      dispatch(setUserId(""));
    }
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/history" element={<History />} />
        <Route path="/:id" element={<Bucket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
