import React, { useContext } from "react";
import { Link } from "@reach/router";

import { StateContext } from '../context/State';

export default () => {
  const { state, dispatch } = useContext(StateContext);

  const onLogout = async (e) => {
    e.preventDefault();

    const responseData = await fetch(
      `${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/logout`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${state.accessToken}` },
      });
    const responseJson = await responseData.json();

    if (responseJson && responseJson.success) {
      dispatch({ type: "reset" });
      navigate("/");
    } else {
      alert(responseJson.message);
    }
  }

  return (
    <nav>
      <Link to="/">Home</Link>

      {!state.userDetailsLoading && !state.userDetails && <Link to="/login">Login</Link>}

      {!state.userDetailsLoading && state.userDetails && <>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/change-password">Change Password</Link>
        <a href="#preventDefault" onClick={onLogout}>Logout</a>
      </>}
    </nav>
  );
}