import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "../utils";
import routesList from "./routesList";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn() ? (
          <Component {...props} />
        ) : (
          <Redirect to={`${routesList.login}`} />
        )
      }
    />
  );
};

export default PrivateRoute;
