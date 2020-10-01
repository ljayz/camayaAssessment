import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { Router, Redirect } from "@reach/router";

import { StateContext, StateContextProvider } from './context/State';
import Index from './pages/Index';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
    const { state } = useContext(StateContext);

    return state.userDetails ? <Component {...rest} /> : <Redirect from="" to="/" noThrow />
};

const PublicRoute = ({ component: Component, ...rest }) => (
    <Component {...rest} />
);

const App = () => {
    return (
        <StateContextProvider>
            <Router>
                <PublicRoute path="/" component={Index} />
                <PublicRoute path="/login" component={Login} />

                <AuthenticatedRoute path="/dashboard" component={Dashboard} />
                <AuthenticatedRoute path="/profile" component={Profile} />
                <AuthenticatedRoute path="/change-password" component={ChangePassword} />

                <PublicRoute default component={NotFound} />
            </Router>
        </StateContextProvider>
    );
}

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
