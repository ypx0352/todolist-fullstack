import { Route, Switch, BrowserRouter } from "react-router-dom";

import LandingPage from "./pages/landing-page";
import ListPage from "./pages/list-page";
import LoginPage from "./pages/login-page";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/list">
          <ListPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
