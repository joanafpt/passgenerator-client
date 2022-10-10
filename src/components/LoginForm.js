import React, { useState } from "react";
import { genPassword } from "../api/api";

const LoginForm = () => {
  const fields = [
    {
      id: "username-input",
      name: "username-input",
      placeholder: "Username",
      type: "text",
    },
    {
      id: "password-input",
      name: "password-input",
      placeholder: "Password",
      type: "password",
    },
  ];
  const [formValues, setFormValues] = useState({ username: "", password: "" });
  const [submitted, setSubmitted] = useState(false);
  const [passwordLength, setPasswordLength] = useState("");
  const [generatedPass, setGeneratedPass] = useState("");
  const [message, setMessage] = useState("");
  const onChangeValues = (event) => {
    setSubmitted(false);
    if (event.target.name === "username-input") {
      setFormValues({ ...formValues, username: event.target.value });
    } else if (event.target.name === "password-input") {
      setFormValues({ ...formValues, password: event.target.value });
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const editPassLength = (event) => {
    setGeneratedPass("");
    setMessage("");
    setPasswordLength(event.target.value);
  };

  const callback = (data) => {
    console.log(data);
    if (data.message) {
      setMessage(data.message);
      return;
    } else {
      //message
      setGeneratedPass(data.passToReturn);
    }
  };
  const generatePsw = () => {
    genPassword(passwordLength, callback);
  };
  return (
    <div>
      {fields.map((item) => (
        <input
          key={item.id}
          type={item.type}
          id={item.id}
          name={item.name}
          value={
            item.id === "username-input"
              ? formValues.username
              : formValues.password
          }
          placeholder={item.placeholder}
          onChange={onChangeValues}
        />
      ))}
      <button
        type="submit"
        disabled={
          formValues.username.trim().length === 0 ||
          formValues.password.trim().length === 0
            ? true
            : false
        }
        onClick={onSubmit}
      >
        Submit
      </button>
      <br />
      {submitted && <>{JSON.stringify(formValues)}</>}
      <br />
      <input
        type="text"
        value={passwordLength}
        onChange={editPassLength}
        placeholder="Password length"
      />
      <button
        type="submit"
        disabled={passwordLength.trim().length === 0 ? true : false}
        onClick={generatePsw}
      >
        Generate password
      </button>
      {generatedPass && <h5>Your password is: {generatedPass}</h5>}
      {message && <h5>{message}</h5>}
    </div>
  );
};

export default LoginForm;
