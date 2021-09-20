import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import routesList from "./routes/routesList";
import { Users, Login } from "./screens";

import "./App.css";
import { isLoggedIn } from "./utils";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Users} />
          <PrivateRoute exact path={routesList.usersList} component={Users} />
          {isLoggedIn() ? (
            <Redirect to={`${routesList.usersList}`} />
          ) : (
            <Route exact path={routesList.login} component={Login} />
          )}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
