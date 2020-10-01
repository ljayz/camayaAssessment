import React from "react";
import { Link } from "@reach/router";

export default () => {
  return (
    <>
      <h3>Not Found page</h3>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}