import React, { useState, useEffect } from "react";
import Navbar from "../components/main/Navbar";
import Mainheader from "../components/main/Mainheader";
import SideBar from "../components/main/SideBar";
import ClickAwayListener from "@mui/material/ClickAwayListener";
// import { token } from "../endpoint";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { endpoint } from "../endpoint";
import { NetworkErr, Loader, WelcomePage } from "../components/Common";
import { AnimatePresence, motion } from "framer-motion";

export default function LayoutRoute({
  active,
  component,
  padding,
  trnd,
  authToken,
}) {
  const history = useHistory();
  const Component = component;
  // const [isOpen, setIsOpen] = useState(false);
  // console.log(token);
  // !token && history.push("/");
  const [logUser, setLogUser] = useState(null);
  const [results, setResults] = useState(false);
  const [welcome, setWelcome] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [netErr, setNetErr] = useState(false);
  const [layToken, setLayToken] = useState(
    window.localStorage.getItem("token")
  );

  const [refreshChat, setRefreshChat] = useState(false);
  function handleClickAway() {
    if (results) setResults(false);
    // if (isOpen) setIsOpen(false);
  }
  let trnds = trnd ? true : false;

  useEffect(() => {
    console.log(logUser);
  }, [logUser]);
  // var token = false;
  useEffect(() => {
    // setLayToken(window.localStorage.getItem("token"));
    // // token = window.localStorage.getItem("token");
    // console.log("reload token");
    // console.log(layToken);
    // var config = {
    //   headers: { Authorization: `Bearer ${layToken}` },
    // };
    // setTimeout(() => {
    axios
      .get(`${endpoint}/me`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setLogUser(res.data.data);
      })
      .catch((err) => {
        if (err == "Error: Network Error") setNetErr(true);
        else console.log(err);
      });
    // }, []);
  }, [authToken]);

  setTimeout(() => setWelcome(false), 5800);

  return (
    <>
      {logUser ? (
        // welcome ? (
        //   <motion.div
        //     initial={{ opacity: 0 }}
        //     animate={{ opacity: 1 }}
        //     transition={{ duration: 0.3 }}
        //   >
        //     <WelcomePage />
        //   </motion.div>
        // ) : (
          <div
            className="d-flex justify-content-between"
            onClick={handleClickAway}
            style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}
          >
            <div className="d-none d-md-block d-xl-none">
              <Navbar active={active} logUser={logUser} tab />
            </div>
            <div className="d-none d-xl-block">
              <Navbar active={active} logUser={logUser} />
            </div>
            <div className="route col-12 h-100 bg-white">
              <Mainheader
                // isOpen={isOpen}
                // setIsOpen={setIsOpen}
                results={results}
                setResults={setResults}
              />
              <div className="pt-5 d-md-none">
                <Component
                  mob
                  full
                  trends
                  chat
                  authToken={authToken}
                  trnd={trnds}
                  logUser={logUser}
                  refreshChat={refreshChat}
                  setRefreshChat={setRefreshChat}
                />
              </div>
              <div
                className="d-none d-md-block d-xl-none"
                style={{ paddingTop: padding ? "3.8vh" : "4.8vh" }}
              >
                <Component
                  tab
                  authToken={authToken}
                  logUser={logUser}
                  refreshChat={refreshChat}
                  setRefreshChat={setRefreshChat}
                />
              </div>
              <div
                className="d-none d-xl-block"
                style={{ paddingTop: padding ? "3.8vh" : "4.8vh" }}
              >
                <Component
                  authToken={authToken}
                  logUser={logUser}
                  refreshChat={refreshChat}
                  setRefreshChat={setRefreshChat}
                />
              </div>
            </div>
            <div className="d-none d-md-block d-xl-none">
              <SideBar
                tab
                trends
                chat
                trnd={trnds}
                logUser={logUser}
                refreshChat={refreshChat}
                setRefreshChat={setRefreshChat}
              />
            </div>
            <div className="d-none d-xl-block">
              <SideBar
                trends
                chat
                trnd={trnds}
                logUser={logUser}
                refreshChat={refreshChat}
                setRefreshChat={setRefreshChat}
              />
            </div>
            <AnimatePresence>
              {netErr && <NetworkErr netErr={netErr} />}
            </AnimatePresence>
          </div>
        // ) 
        // ) : (
      ) : //   <div
      //     className="d-flex justify-content-between"
      //     onClick={handleClickAway}
      //     style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}
      //   >
      //     <div className="route col-12 h-100 bg-white">
      //       <Mainheader
      //         // isOpen={isOpen}
      //         // setIsOpen={setIsOpen}
      //         results={results}
      //         setResults={setResults}
      //       />
      //       <div className="pt-5">
      //         {/* <h1>Sidebar </h1> */}
      //         <SideBar
      //           mob
      //           chattel
      //           trends
      //           chat
      //           trnd={trnds}
      //           logUser={logUser}
      //           refreshChat={refreshChat}
      //           setRefreshChat={setRefreshChat}
      //         />
      //       </div>
      //     </div>
      //   </div>
      // )
      // ) : (
      //   <Loader />
      // )
      redirect ? (
        history.push("/")
      ) : (
        // setTimeout(() => setRedirect(true), 6000) &&
        <Loader />
      )}
      {/* // setTimeout(() => history.push("/"), 2000) } */}
    </>
  );
}
