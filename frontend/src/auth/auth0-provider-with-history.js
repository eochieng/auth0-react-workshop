/**
 *  <Auth0ProviderWithHistory /> uses the onRedirectCallback() method to handle the event where Auth0 redirects your users from the Auth0 Universal Login page to your React application.
 *      It will use the useHistory() hook to get the history object from React Router. You use the history.push() method to take users back to the route they intended to access before authentication.
 *      Hence, wrapping any component tree with Auth0ProviderWithHistory will give it access to the Auth0Context.
 *
 *  How do you use <Auth0ProviderWithHistory />?
 *      <Auth0ProviderWithHistory /> requires the BrowserRouter component from React Router to be its parent, grandparent, or great-great-great-grandparent.
 *      The Context from React Router must be present in the component tree at a higher level for Auth0ProviderWithHistory to access the useHistory() hook from React Router.
 */

import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const clientID = process.env.REACT_APP_AUTH0_CLIENT_ID;

    const history = useHistory();
    const onRedirectCallback = (appState) => {
        history.push(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientID}
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;