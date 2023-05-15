import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { useDispatch } from "react-redux";
import { sendText, trendRedux } from "../../slices/newsfeedSlice";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import ChatIcon from "@mui/icons-material/Chat";
import BarChartIcon from "@mui/icons-material/BarChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";
import InputBase from "@mui/material/InputBase";
import { endpoint, chatpoint, config, token, roomId } from "../../endpoint";
import { useHistory } from "react-router-dom";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import DoneIcon from "@mui/icons-material/Done";
import { io } from "socket.io-client";
import Chat from "./sidebar/Chat";
import Trends from "./sidebar/Trends";
import Story from "./sidebar/FeedStory";
import Notifications from "./sidebar/Notifications";
import loaderW from "../../assets/images/loader-white.gif";
import loaderP from "../../assets/images/loader-color.gif";

//const io = require('socket.io-client');
// const socket = io.connect(
//   "http://localhost:3001"
//   //, config
//   // query: { token }
// );

// socket.on("connect", () => {
//   console.log(socket.connected); // true
// });
// const data1 = 123;
// socket.emit("sr_developer", data1);
// socket.emit("join_room", 123);
//   const messageData = {
//      room: 123,
//      author: "surya",
//      message: "heyyyyy",
//      time: new Date(Date.now()).getHours() + ":" +
//      new Date(Date.now()).getMinutes(),
//  };
//    socket.emit("send_message", messageData);

export default function SideBar({
  trends,
  chat,
  tab,
  full,
  logUser,
  trnd,
  refreshChat,
  setRefreshChat,
}) {
  const [trending, setTrending] = useState(trnd);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notific, setNotific] = useState([]);
  const [story, setStory] = useState(!trnd);
  const [chatBar, setChatBar] = useState(false);
  const [convoList, setConvoList] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [myStory, setMyStory] = useState([]);
  const [load, setLoad] = useState(true);
  const dispatch = useDispatch();
  let history = useHistory();
  const [contacts, setContacts] = useState([]);

  const [tpage, settPage] = useState(0);
  const [tisMore, settIsMore] = useState(false);

  const [refreshstr, setRefreshstr] = useState(false);
  // const [refreshChat, setRefreshChat] = useState(false);
  // const [convoList, setConvoList] = useState(null);
  // const [convoList, setConvoList] = useState(null);
  // const [convoList, setConvoList] = useState(null);

  // socket.on("connection", socket, (res) => console.log(res));

  useEffect(() => {
    axios
      .get(`${endpoint}/conversations`, config)
      .then((res) => {
        console.log("convo", res.data.data);
        setConvoList(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [refreshChat, chatBar]);

  useEffect(() => {
    axios
      .get(`${endpoint}/trending?page=${tpage}&limit=7`, config)
      .then((res) => {
        console.log("trend", res.data.data);
        // setTrendData(res.data.data);
        setTrendData([...trendData, ...res.data.data]);
        // setLoad(false);
        res.data.data.length < 7 ? settIsMore(false) : settIsMore(true);
      })
      .catch((err) => console.log(err));
  }, [tpage]);

  useEffect(() => {
    // setTpage(0);
    axios
      .get(`${endpoint}/trending?page=0&limit=7`, config)
      .then((res) => {
        console.log("trend", res.data.data);
        // setTrendData(res.data.data);
        setTrendData(res.data.data);
        // setLoad(false);
        // res.data.data.length < 7 ? settIsMore(false) : settIsMore(true);
      })
      .catch((err) => console.log(err));
  }, [trending]);

  useEffect(() => {
    axios
      .get(`${endpoint}/me/contacts`, config)
      .then((res) => {
        console.log("contacts", res.data.data);
        setContacts(res.data.data);
        setLoad(false);
      })
      .catch((err) => {
        // console.log("7.get comment api!!!!");
        console.log(err);
      });
  }, [chatBar]);
  useEffect(() => {
    axios
      .get(`${endpoint}/notifications`, config)
      .then((res) => {
        console.log("notify", res.data.data);
        setNotific(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [notificationOpen]);

  useEffect(() => {
    console.log("Story", mainData);
  }, [mainData]);
  // get story api
  useEffect(() => {
    axios
      .get(`${endpoint}/story_feed?page=0&limit=7`, config)
      .then((res) => {
        // console.log("Story", res.data.data);
        setMainData(res.data.data);
      })
      .catch((err) => console.log(err));
    axios
      .get(`${endpoint}/story`, config)
      .then((res) => {
        console.log("mystory", res.data.data);
        setMyStory(res.data.data);
        // setMainData((prevState) => [res.data.data, prevState]);
        // setIsLoad(false);
      })
      .catch((err) => console.log(err));
  }, [refreshstr]);

  return (
    <div>
      <div
        className={
          !full
            ? "d-none d-md-block vh-100 overflow-hidden bg-linearlr position-fixed"
            : "vh-100 overflow-hidden bg-linearlr position-fixed"
        }
        style={{
          right: 0,
          zIndex: 2,
          width: !full ? "25vw" : "100vw",
        }}
      >
        <div
          className=" bg-white my-2 mx-3"
          style={{
            boxShadow: "0px 0px 10px #0000005e",
            borderRadius: "0px 0px 15px 15px",
            height: "18vh",
          }}
        >
          <div className="mx-2 px-2 py-3 d-flex align-items-center justify-content-around">
            <HistoryToggleOffIcon
              onClick={() => {
                setChatBar(false);
                setTrending(false);
                setStory(true);
                setNotificationOpen(false);
              }}
              className={`${
                !story ? "purple bg-white" : "bg-linear"
              } me-1 p-2 rounded-circle cursor-pointer`}
              style={{
                boxShadow: "0px 0px 10px #0000005e",
                fontSize: tab ? 40 : 50,
              }}
            />
            <ChatIcon
              onClick={() => {
                setChatBar(true);
                setTrending(false);
                setStory(false);
                setNotificationOpen(false);
              }}
              className={`${
                !chatBar ? "purple bg-white" : "bg-linear"
              } me-1 p-2 rounded-circle cursor-pointer`}
              style={{
                boxShadow: "0px 0px 10px #0000005e",
                fontSize: tab ? 40 : 50,
              }}
            />
            <TrendingUpIcon
              onClick={() => {
                setChatBar(false);
                setTrending(true);
                setStory(false);
                setNotificationOpen(false);
              }}
              className={`${
                !trending ? "purple bg-white" : "bg-linear"
              } me-1 p-2 rounded-circle cursor-pointer`}
              style={{
                boxShadow: "0px 0px 10px #0000005e",
                fontSize: tab ? 40 : 50,
              }}
            />
            <NotificationsIcon
              onClick={() => {
                setChatBar(false);
                setTrending(false);
                setStory(false);
                setNotificationOpen(true);
              }}
              className={`${
                !notificationOpen ? "purple bg-white" : "bg-linear"
              } me-1 p-2 rounded-circle cursor-pointer`}
              style={{
                boxShadow: "0px 0px 10px #0000005e",
                fontSize: tab ? 40 : 50,
              }}
            />
          </div>
          <div className="side-text ms-3 my-auto pt-3 purple">
            {chatBar
              ? "Messages"
              : trending
              ? "Trending"
              : story
              ? "Instant Memories"
              : "Notifications"}
          </div>
        </div>
        <div
          className=" bg-white mt-4 mb-2 mx-3 overflow-hidden"
          style={{
            boxShadow: "0px 0px 10px #0000005e",
            borderRadius: 15,
            height: full ? "72vh" : "76vh",
          }}
        >
          {load ? (
            <div className="col-12 d-flex align-justify-center py-5">
              <img src={loaderP} width="15%" height="15%" />
            </div>
          ) : chatBar ? (
            <Chat
              full={full}
              contacts={contacts}
              convoList={convoList}
              logUser={logUser}
              refreshChat={refreshChat}
              setRefreshChat={setRefreshChat}
            />
          ) : trending ? (
            <Trends
              full={full}
              trendData={trendData}
              tisMore={tisMore}
              settPage={settPage}
              tpage={tpage}
            />
          ) : story ? (
            <Story
              full={full}
              refreshstr={refreshstr}
              setRefreshstr={setRefreshstr}
              mainData={mainData}
              myStory={myStory}
              logUser={logUser}
            />
          ) : (
            <Notifications
              full={full}
              notific={notific}
              setNotific={setNotific}
              notificationOpen={notificationOpen}
              setNotificationOpen={setNotificationOpen}
            />
          )}
          {/* <div className="h-25 "></div>
          <div
            className="h-75 bg-white"
            style={{
              boxShadow: "0px 0px 15px #0000008f",
              borderRadius: 15,
            }}
          ></div> */}
        </div>
      </div>
    </div>
  );
}
