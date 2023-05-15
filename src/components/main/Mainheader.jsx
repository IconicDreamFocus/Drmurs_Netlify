import React, { useState } from "react";
import zdlogo from "../../assets/images/logo2.gif";
import { logout } from "../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import LogoutIcon from "@mui/icons-material/Logout";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
// import Story from "./FeedStory";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
// import Notifications from "./Notifications";
import { socket } from "../../endpoint";
import SearchBox from "../../components/main/SearchBox";
import WidgetsIcon from "@mui/icons-material/Widgets";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";

import ListItemIcon from "@mui/material/ListItemIcon";
import ChatIcon from "@mui/icons-material/Chat";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { endpoint, config } from "../../endpoint";

export default function Mainheader({ setIsOpen, isOpen, results, setResults }) {
  const { loggedIn, user, password, avatar, gender, email } = useSelector(
    (state) => state.user
  );
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("dp");
    history.push("/");

    socket.disconnect();
    socket.on("offline", (data) => console.log(data));
  };

  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="purple">
        <Link to={{ pathname: "/my-profile" }}>
          <ListItem button>
            <ListItemIcon>
              <img
                height="35vw"
                width="35vw"
                src={require("../../assets/images/profilepurp.svg").default}
                alt="profile"
                className="rounded-circle"
              />
            </ListItemIcon>
            <ListItemText className="purple" primary="My Profile" />
          </ListItem>
        </Link>
        <Link to={{ pathname: "/news-feed" }}>
          <ListItem button>
            <ListItemIcon>
              <img
                height="30vw"
                src={require("../../assets/images/homepurp.svg").default}
                alt="newsfeed"
              />
            </ListItemIcon>
            <ListItemText className="purple" primary="Memoir" />
          </ListItem>
        </Link>
        <Link to={{ pathname: "/future-studio" }}>
          <ListItem button>
            <ListItemIcon>
              <img
                height="30vw"
                src={
                  require("../../assets/images/future studio purp.svg").default
                }
                alt="futurestudio"
              />
            </ListItemIcon>
            <ListItemText className="purple" primary="Future Studio" />
          </ListItem>
        </Link>
        <Link to={{ pathname: "/dream-community" }}>
          <ListItem button>
            <ListItemIcon className="p-1">
              <img
                height="23vw"
                src={
                  require("../../assets/images/dream community purp.svg")
                    .default
                }
                alt="futurestudio"
              />
            </ListItemIcon>
            <ListItemText className="purple" primary="Dream Community" />
          </ListItem>
        </Link>
        <Link to={{ pathname: "/chattel" }}>
          <ListItem button>
            <ListItemIcon>
              <WidgetsIcon className="purple" />
            </ListItemIcon>
            <ListItemText className="purple" primary="ZD Chattel" />
          </ListItem>
        </Link>
        <Link to={{ pathname: "/zillion-villa" }}>
          <ListItem button>
            <ListItemIcon>
              <img
                height="30vw"
                src={require("../../assets/images/villapurp.svg").default}
                alt="futurestudio"
              />
            </ListItemIcon>
            <ListItemText className="purple" primary="Zillion Villa" />
          </ListItem>
        </Link>
        <Link to={{ pathname: "/settings" }}>
          <ListItem button>
            <ListItemIcon>
              <img
                height="30vw"
                src={require("../../assets/images/settingspurp.svg").default}
                alt="futurestudio"
              />
            </ListItemIcon>
            <ListItemText className="purple" primary="Settings" />
          </ListItem>
        </Link>
        {/* <Divider /> */}
        {/* <Link to={{ pathname: "/trending" }}>
          <ListItem button>
            <ListItemIcon>
              <TrendingUpIcon className="purple" />
            </ListItemIcon>
            <ListItemText className="purple" primary="Trending" />
          </ListItem>
        </Link>
        <Link to={{ pathname: "/notification" }}>
          <ListItem button>
            <ListItemIcon>
              <NotificationsIcon className="purple" />
            </ListItemIcon>
            <ListItemText className="purple" primary="Notification" />
          </ListItem>
        </Link> */}
        {/* <Divider /> */}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <PowerSettingsNewIcon className="purple" />
          </ListItemIcon>
          <ListItemText className="purple" primary="Logout" />
        </ListItem>
      </div>
    </Box>
  );

  return (
    <div
      className="route1 py-1 pe-1 px-md-5 col-12 d-flex justify-content-between align-items-center position-fixed"
      style={{
        backgroundColor: "#f0f1f6",
        boxShadow: "0px 5px 5px #aba9a9",
        zIndex: 5,
        height: "5.5vh",
      }}
    >
      <img src={zdlogo} width="80px" style={{ transform: "scale(1.6)" }} />
      <SearchBox results={results} setResults={setResults} />
      <div className="d-flex px-2 px-md-0 justify-content-between align-items-center">
        {/* <div className="me-2 me-sm-3 d-md-none">
          <Story isOpen={isOpen} setIsOpen={setIsOpen} mob />
        </div> */}
        <div className="d-none d-md-flex ms-3">
          {/* <Badge color="warning" variant="dot"> */}
          {/* <NotificationsIcon
            className="purple ms-3 cursor-pointer d-none d-sm-block"
            style={{ fontSize: 30 }}
            onClick={() => setNotificationOpen(!notificationOpen)}
          /> */}
          {/* </Badge> */}
          <div
            className="btn purple p-0 fw-bold ms-3  d-none d-sm-block"
            onClick={handleLogout}
          >
            <PowerSettingsNewIcon style={{ fontSize: 30 }} />
          </div>
        </div>
        <div className="d-md-none">
          {["right"].map((anchor) => (
            <React.Fragment key={anchor}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer("right", true)}
                edge="start"
                className="purple"
              >
                <MenuIcon style={{ fontSize: 30 }} />
              </IconButton>
              <Drawer
                anchor={"right"}
                open={state.right}
                onClose={toggleDrawer("right", false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
