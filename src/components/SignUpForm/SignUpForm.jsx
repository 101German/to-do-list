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

function SignUpForm() {
  let navigate = useNavigate();
  let [email, setEmailInput] = useState("");
  let [password, setPasswordInput] = useState("");

  const handleEmailInput = (event) => {
    setEmailInput(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPasswordInput(event.target.value);
  };

  const handleSubmit = async (event) => {
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
    <form onSubmit={handleSubmit} className="form_signIn">
      <h1 className="form_title">Sign Up</h1>
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
      <Link to="/sign-in">
        <button className="form_button">Sign In</button>
      </Link>
    </form>
  );
}

export default SignUpForm;
