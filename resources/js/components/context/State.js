//https://yduman.github.io/blog/useContext-usage/
import React, { useEffect, useReducer } from "react";

const StateContext = React.createContext();

const initialState = {
  registration: {},
  userDetails: null,
  accessToken: '',
  notification: '',
  userDetailsLoading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setUserDetails":
      return { ...state, userDetails: action.value };
    case "setUserDetailsLoading":
      return { ...state, userDetailsLoading: action.value };
    case "setAccessToken":
      sessionStorage.setItem('access_token', action.value);
      return { ...state, accessToken: action.value };
    case "resetAccessToken":
      sessionStorage.clear();
      return { ...state, accessToken: initialState.accessToken };
    case "showNotification":
      return { ...state, notification: action.value };
    case "resetNotification":
      return { ...state, notification: initialState.notification };
    case "reset":
      sessionStorage.clear();
      return initialState;
    default:
      return { ...state };
  }
};

const StateContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const savedAccessToken = sessionStorage.getItem('access_token') || '';
      if (savedAccessToken) {
        dispatch({ type: 'setUserDetailsLoading', value: true });

        const responseData = await fetch(
          `${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/user`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${savedAccessToken}` },
          });
        const responseJson = await responseData.json();

        if (responseJson.user) {
          dispatch({ type: "setUserDetails", value: responseJson.user });
          dispatch({ type: "setAccessToken", value: savedAccessToken });
        } else {
          dispatch({ type: "resetAccessToken" });
        }

        dispatch({ type: 'setUserDetailsLoading', value: false });
      }
    }

    fetchUserDetails();
  }, [])

  return (
    <StateContext.Provider value={value}>
      {props.children}
    </StateContext.Provider>
  );
}

const StateContextConsumer = StateContext.Consumer;

export { StateContext, StateContextProvider, StateContextConsumer };