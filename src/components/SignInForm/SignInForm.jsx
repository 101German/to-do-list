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

function SignInForm() {
  let navigate = useNavigate();
  let [email, setEmailInput] = useState("");
  let [password, setPasswordInput] = useState("");

  const handleEmailInput = (event) => {
    setEmailInput(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPasswordInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          navigate("/");
        }
      })
      .catch((error) => {
        alert("Wrong password or login");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="form_signIn">
      <h1 className="form_title">Sign In</h1>
      <div className="form_group">
        <input
          type="text"
          value={email}
          onChange={handleEmailInput}
          className="form_input"
          placeholder=" "
        />
        <label className="form_label">Email</label>
      </div>
      <div className="form_group">
        <input
          type="text"
          value={password}
          onChange={handlePasswordInput}
          className="form_input"
          placeholder=" "
        />
        <label className="form_label">Password</label>
      </div>
      <button className="form_button" type="submit">
        Submit
      </button>
      <Link to="/sign-up">
        <button className="form_button">Sign Up</button>
      </Link>
    </form>
  );
}

export default SignInForm;
