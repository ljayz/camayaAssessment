import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { Link, navigate } from "@reach/router";

import { StateContext } from '../context/State';
import Nav from '../nav/Nav';

const ShowErrorMessage = ({ errors, name }) => (
  <ErrorMessage errors={errors} name={name}>
    {({ message }) => <div>{message}</div>}
  </ErrorMessage>
);

export default () => {
  const { dispatch } = useContext(StateContext);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async formData => {
    const responseData = await fetch(
      `${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      });
    const responseJson = await responseData.json();

    if (responseJson && responseJson.user && responseJson.access_token) {
      dispatch({ type: "setUserDetails", value: responseJson.user });
      dispatch({ type: "setAccessToken", value: responseJson.access_token });
      navigate("profile");
    } else {
      alert(responseJson.message);
    }
  };

  return (
    <>
      <h3>Login Page</h3>
      <Nav />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-1">
          <input type="email" name="email" placeholder="Email" defaultValue="" ref={register({
            required: 'required'
          })} />
          <ShowErrorMessage errors={errors} name="email" />
        </div>

        <div className="my-1">
          <input type="password" name="password" placeholder="Password" defaultValue="" ref={register({
            required: 'required'
          })} />
          <ShowErrorMessage errors={errors} name="password" />
        </div>

        <button>Submit</button>

      </form>
    </>
  );
}