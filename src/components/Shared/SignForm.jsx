import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import InputField from "./Input";
import "./SignForm.css";

function SignForm(props) {
  let [email, setEmailInput] = useState("");
  let [password, setPasswordInput] = useState("");

  const handleEmailInput = (event) => {
    setEmailInput(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPasswordInput(event.target.value);
  };

  const handleSubmit = (event) => {
    props.handleSubmitForm(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="sign-form">
      <h1 className="form-title">{props.formTitle}</h1>
      <div className="form-group">
        <InputField
          typeInput="email"
          styleName="form-input"
          value={email}
          placeholder=" "
          handleChangeValue={handleEmailInput}
        />
        {/* <input
          type="text"
          value={email}
          onChange={handleEmailInput}
          className="form-input"
          placeholder=" "
        /> */}
        <label className="form-label">Email</label>
      </div>
      <div className="form-group">
        <InputField
          typeInput="password"
          styleName="form-input"
          value={password}
          placeholder=" "
          handleChangeValue={handlePasswordInput}
        />
        {/* <input
          type="text"
          value={password}
          onChange={handlePasswordInput}
          className="form-input"
          placeholder=" "
        /> */}
        <label className="form-label">Password</label>
      </div>
      <button className="form-button" type="submit">
        Submit
      </button>
      {props.signIn ? (
        <Link to="/sign-up">
          <button className="form-button">Sign Up</button>
        </Link>
      ) : (
        <Link to="/sign-in">
          <button className="form-button">Sign In</button>
        </Link>
      )}
    </form>
  );
}

export default SignForm;
