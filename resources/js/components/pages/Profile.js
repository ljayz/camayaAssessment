import React, { useContext, useEffect, useRef } from "react";
import { Link } from "@reach/router";

import { StateContext } from '../context/State';
import Nav from '../nav/Nav';

export default () => {
  const { state, dispatch } = useContext(StateContext);
  const notificationTimer = useRef(null);

  useEffect(() => {
    const resetNotificationAndClearTimeout = () => {
      if (state.notification) {
        dispatch({ type: "resetNotification" });
        clearInterval(notificationTimer.current);
      }
    }

    if (state.notification) {
      notificationTimer.current = setTimeout(resetNotificationAndClearTimeout, 5000);
    }

    return () => {
      resetNotificationAndClearTimeout();
    }
  })

  return (
    <>
      <h3>Profile page</h3>
      <Nav />

      {state.notification && <div>{state.notification}</div>}

      <pre>
        {`Dump User Details: ${JSON.stringify(state.userDetails, null, 2)}`}
      </pre>
    </>
  );
}