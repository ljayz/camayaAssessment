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
  const { state, dispatch } = useContext(StateContext);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async formData => {
    const responseData = await fetch(
      `${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/password`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${state.accessToken}` },
        body: JSON.stringify(formData)
      });
    const responseJson = await responseData.json();

    if (responseJson && responseJson.success) {
      dispatch({ type: "showNotification", value: 'Password updated' });
      navigate("profile");
    } else {
      alert(responseJson.message);
    }
  };

  return (
    <>
      <h3>Change Password Page</h3>

      <Nav />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-1">
          <input type="password" name="new_password" placeholder="Password" defaultValue="" ref={register({
            required: 'required'
          })} />
          <ShowErrorMessage errors={errors} name="new_password" />
        </div>

        <div className="my-1">
          <input type="password" name="confirm_new_password" placeholder="Confirm Password" defaultValue="" ref={register({
            required: 'required'
          })} />
          <ShowErrorMessage errors={errors} name="confirm_new_password" />
        </div>

        <button>Submit</button>

      </form>
    </>
  );
}