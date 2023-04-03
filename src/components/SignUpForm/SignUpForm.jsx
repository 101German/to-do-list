import React, { Component, Fragment, useState } from "react";
import "./SignUpForm.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import SignForm from "../Shared/SignForm";

function SignUpForm() {
  let navigate = useNavigate();

  const handleSubmit = async (email, password) => {
    event.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        if (user) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("Wrong login or password");
      });
  };

  return (
    <SignForm
      handleSubmitForm={handleSubmit}
      formTitle="Sign Up"
      signIn={false}
    />
  );
}

export default SignUpForm;
