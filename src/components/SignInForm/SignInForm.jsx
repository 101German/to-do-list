import React, { Component, Fragment, useState } from "react";
import "./SignInForm.css";
import { auth } from "../../config";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import SignForm from "../Shared/SignForm";

function SignInForm() {
  let navigate = useNavigate();
  const handleSubmit = (email, password) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          navigate("/");
        }
      })
      .catch((error) => {
        alert("Wrong password or login ", error);
      });
  };

  return (
    <SignForm
      handleSubmitForm={handleSubmit}
      formTitle="Sign In"
      signIn={true}
    />
  );
}

export default SignInForm;
