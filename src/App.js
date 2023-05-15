import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Login from "./pages/loginSignUp/Login";
import SignUp1 from "./pages/loginSignUp/SignUp1";
import SignUp2 from "./pages/loginSignUp/SignUp2";
import SignUp3 from "./pages/loginSignUp/SignUp3";
import SignUp4 from "./pages/loginSignUp/SignUp4";
import DreamCommunity from "./pages/DreamCommunity";
import ZillionVilla from "./pages/ZillionVilla";
import Profile from "./pages/main/Profile";
import Settings from "./pages/main/Settings/Settings";
import LoginRoute from "./routes/LoginRoute";
import LayoutRoute from "./routes/LayoutRoute";
import NewsFeed from "./pages/main/NewsFeed";
import FutureStudio from "./pages/FutureStudio";
import ForgotPassword from "./pages/loginSignUp/ForgotPassword";
import Help from "./pages/main/Settings/Help";
import Terms from "./pages/main/Settings/Terms";
import CreatingUserAccount from "./pages/main/Settings/CreatingUserAccount";
import NavigationMap from "./pages/main/Settings/NavigationMap";
import Tips from "./pages/main/Settings/Tips";
import DataPolicy from "./pages/main/Settings/DataPolicy";
import SideBar from "./components/main/SideBar";
// import Notifications from "./components/main/sidebar/Notifications";
import Trending from "./pages/main/Trending";
import UserProfile from "./pages/main/UserProfile";
import PageNotFound from "./pages/PageNotFound";
import ActivateToken from "./pages/loginSignUp/ActivateToken";
import Post from "./pages/main/Post";
import { WelcomePage } from "./components/Common";

export default function App() {
  const [authToken, setAuthToken] = useState(null);

  // componentDidMount() {
  useEffect(() => {
    console.log(authToken);
    window.scrollTo(0, 1);
  }, []);
  useEffect(() => {
    console.log(authToken);
  }, [authToken]);
  // };
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login setAuthToken={setAuthToken} />
          </Route>
          <Route
            exact
            path="/activate-token/:activateToken"
            component={ActivateToken}
          />
          <Route exact path="/signup1" component={SignUp1} />
          <Route exact path="/signup2" component={SignUp2} />
          <Route exact path="/signup3" component={SignUp3} />
          <Route exact path="/signup4" component={SignUp4} />
          <Route exact path="/welcome" component={WelcomePage} />
          <Route exact path="/page-not-found" component={PageNotFound} />
          <Route
            exact
            path="/forgot-password/:resetToken"
            component={ForgotPassword}
          />
          <LayoutRoute exact path="/chattel" component={SideBar} />
          {/* <Route
            exact
            path="/trending"
            component={() => <SideBar trends full />}
          />
          <Route
            exact
            path="/notification"
            component={() => <Notifications full />}
          /> */}
          <LayoutRoute
            exact
            path="/my-profile"
            component={Profile}
            padding
            active={0}
          />
          <Route exact path="/user-profile/:user_id">
            <LayoutRoute component={UserProfile} active={1} padding />
          </Route>
          <LayoutRoute
            authToken={authToken}
            exact
            path="/news-feed"
            component={NewsFeed}
            active={1}
          />
          <Route exact path="/trending/:id">
            <LayoutRoute trnd component={Trending} active={1} padding />
          </Route>
          <Route exact path="/post/:id">
            <LayoutRoute component={Post} active={1} padding />
          </Route>
          <LayoutRoute
            exact
            // padding
            path="/future-studio"
            component={FutureStudio}
            active={2}
          />
          <LayoutRoute
            exact
            path="/dream-community"
            component={DreamCommunity}
            active={3}
          />
          <LayoutRoute
            exact
            path="/zillion-villa"
            component={ZillionVilla}
            active={4}
            padding
          />
          <LayoutRoute
            exact
            path="/settings"
            component={Settings}
            active={5}
            padding
          />
          <LayoutRoute exact path="/help" component={Help} active={5} />
          <LayoutRoute
            exact
            path="/create"
            component={CreatingUserAccount}
            active={5}
          />
          <LayoutRoute
            exact
            path="/navigationmap"
            component={NavigationMap}
            active={5}
          />
          <LayoutRoute exact path="/tips" component={Tips} active={5} />
          <LayoutRoute
            exact
            path="/terms-of-use"
            component={Terms}
            active={5}
          />
          <LayoutRoute
            exact
            path="/dataPolicy"
            component={DataPolicy}
            active={5}
          />
          <Redirect to="/page-not-found" />
        </Switch>
      </Router>
    </div>
  );
}
