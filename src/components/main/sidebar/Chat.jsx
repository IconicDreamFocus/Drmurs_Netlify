import React, { useState, useEffect, memo, useRef } from "react";
import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { useDispatch } from "react-redux";
import { sendText, trendRedux } from "../../../slices/newsfeedSlice";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import ChatIcon from "@mui/icons-material/Chat";
import BarChartIcon from "@mui/icons-material/BarChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";
import InputBase from "@mui/material/InputBase";
import {
  endpoint,
  chatpoint,
  config,
  token,
  roomId,
  socket,
  formatDate,
  formatDate1,
} from "../../../endpoint";
import { useHistory } from "react-router-dom";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import DoneIcon from "@mui/icons-material/Done";
// import { io } from "socket.io-client";
import Trends from "./Trends";
import Story from "./FeedStory";
import Notifications from "./Notifications";
import hi from "../../../assets/images/sayHi.gif";
import on from "../../../assets/images/sun.gif";
import off from "../../../assets/images/moon.gif";
import loaderP from "../../../assets/images/loader-color.gif";

import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

// const socket = io.connect(chatpoint, roomId);
// socket.on("welcome", function (data) {
//   // window.alert("Hi!!!");
//   socket.emit("i am client", { data: "foo!", id: data.id });
// });

const handleTime = (dataD) => {
  let data = new Date(dataD);
  let hrs = data.getHours();
  let mins = data.getMinutes();
  let range = null;
  if (hrs > 12) {
    hrs %= 12;
    range = "PM";
  } else {
    if (hrs == 0) hrs = "0" + hrs;
    range = "AM";
  }
  if (mins < 10) mins = "0" + mins;
  const postTime = hrs + ":" + mins + " " + range;
  return postTime;
};

const calDay = (msgDate) => {
  let a = new Date(msgDate).getDate();
  let b = new Date().getDate();
  let a1 = new Date(msgDate).getMonth();
  let b1 = new Date().getMonth();
  let a2 = new Date(msgDate).getFullYear();
  let b2 = new Date().getFullYear();
  let c = new Date(msgDate).getDay();
  // let d = new Date().getDay();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // console.log(days[c]);

  let value;

  if (a == b) value = "Today";
  else if (a == b - 1) value = "Yesterday";
  else if (b - a < 7 && a1 == b1 && a2 == b2) value = days[c];
  else value = formatDate1(msgDate);

  return value;
};

function Chat({
  contacts,
  full,
  convoList,
  logUser,
  refreshChat,
  setRefreshChat,
}) {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [refr, setRefr] = useState(false);
  // const [chatBar, setChatBar] = useState(true);
  // const [userData, setUserData] = useState(null);
  // const [convoList, setConvoList] = useState(null);
  const [online, setOnline] = useState([]);
  const [selected, setSelected] = useState(null);
  const [newContacts, setNewContacts] = useState([]);
  const [conUser, setConUser] = useState(null);
  const dispatch = useDispatch();
  let history = useHistory();

  const [chatData, setChatData] = useState([
    {
      isOpen: false,
      isMin: false,
      userData: null,
      conId: null,
      chatUsername: null,
    },
    {
      isOpen: false,
      isMin: false,
      userData: null,
      conId: null,
      chatUsername: null,
    },
    {
      isOpen: false,
      isMin: false,
      userData: null,
      conId: null,
      chatUsername: null,
    },
    {
      isOpen: false,
      isMin: false,
      userData: null,
      conId: null,
      chatUsername: null,
    },
  ]);

  socket.on("connect", () => {
    console.log(socket.connected); // true
  });
  // console.log(socket);

  // const handleOnlineUsers = (info) => {
  //   console.log(info);
  // };

  // function CheckOnline(data) {
  //   const [on, setOn] = useState(false);
  //   // console.log(data);
  //   // let value = null;
  //   socket.emit("online_list", data);
  //   const status = socket.on("online", (res) => {
  //     console.log(res);
  //     // setOnline(data);
  //     // console.log(Object.values(res));
  //     let value = Object.values(res);
  //     console.log(data[0], value[0]);
  //     // setOn(value[0]);
  //     return value[0];
  //   });
  //   return status;
  // }
  useEffect(() => {
    setTimeout(() => setRefr(!refr), 500);
  }, [refreshChat]);

  useEffect(() => {
    let data = [];
    let filter1 = [];

    convoList.map((cl) =>
      cl.users.filter((us) => {
        if (us.username != logUser.username) {
          filter1.push(us);
        }
      })
    );
    const filtered = filter1.concat(contacts);

    const filtered1 = filtered.filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    );

    filtered1.forEach((fl) => data.push(fl.id));
    socket.emit("online_list", data);
    socket.on("online", (data) => {
      const out = [];
      const ids = Object.keys(data);
      const vals = Object.values(data);
      for (let i = 0; i < ids.length; i++) {
        let samp = {
          id: ids[i],
          status: vals[i],
        };
        out.push(samp);
      }
      setOnline(out);

      let filContacts = [];
      contacts.forEach((ct) => {
        var pos = filter1.map((e) => e.id).indexOf(ct.id);

        if (pos == -1) {
          filContacts.push(ct);
        }
      });
      setNewContacts(filContacts);
    });

    // const newcont = contacts.map((ct) => filter1.forEach((x) => x.id == ct.id));
    // console.log(newcont);
    // setNewContacts(newcont);
  }, [refr]);

  console.log(online);

  // const handleChatInit = (userId) => {
  //   const data = { to: userId };
  //   socket.emit("conversation_init", data);
  //   // useEffect(() => {
  //   socket.on("conversation_initiated", (data) => {
  //     console.log(data.id);
  //     // setConvoId(data.id);
  //   });
  // };

  console.log("chat");

  // useEffect(() => {
  //   // const filter = "nature";
  //   // const filteredResult = convoList.filter((li) => {
  //   //   return li.users.indexOf(filter) >= 0;
  //   // });
  //   if (convoList) {
  //     // console.log(
  //     let len = convoList.length;
  //     let i = 0;
  //     // let j = 0;
  //     for (i; i < len; i++) {
  //       if (convoList[i].users[1].username == userData.username)
  //         setConUser("0");
  //       else console.log("1");
  //     }
  //   }
  // convoList.map((cl) => {
  //   // cl.users.map((us, i) => {
  //   if (cl.id == "6202570e98d91accf769be3d") return cl.id;
  //   // });
  // })
  // );
  // }, [convoList]);

  var [j, setJ] = useState(0);

  const { chatText } = useSelector((state) => state.newsfeed);
  const { user } = useSelector((state) => state.user);

  const Chatbox = ({ number, converseId }) => {
    const [text, setText] = useState("");
    const [chatImg, setChatImg] = useState(null);
    // const [alert, setAlert] = useState(false);
    const [error, setError] = useState(false);
    const [boxLoad, setBoxLoad] = useState(true);
    const [messages, setMessages] = useState([]);
    const [convoId, setConvoId] = useState(null);
    const [msgId, setMsgId] = useState(false);
    const [recMsg, setRecMsg] = useState(false);
    const [page, setPage] = useState(0);
    const [isMore, setIsMore] = useState(false);
    // const [toggle, setToggle] = useState(false);
    const [dispatchData, setDispatchData] = useState({
      ad: "",
      caption: "",
    });
    let userno = [];
    convoList.map((cl) => {
      if (cl.id == converseId)
        userno = cl.users.filter((us) => us.username != logUser.username);
    });
    // console.log(userno);
    const receiveUser = userno[0];
    let loadMore = 0;

    let isOnline = null;
    online.forEach((us) => {
      if (us.id == receiveUser.id) isOnline = us.status;
    });

    const changedDay = (i) => {
      let a, b;
      if (i != 0) {
        a = new Date(messages[i].created_at).getDate();
        b = new Date(messages[i - 1].created_at).getDate();
      }
      // console.log(a, b);
      if (a == b) return false;
      else return true;
      // const d = new Date(msg_date);
      // // const taskDate = d.getDate();
      // console.log(d.getDate());
    };

    const scrollRef = useRef(null);
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
      !chatData[number].isMin &&
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => console.log("page", page), [page]);
    useEffect(() => console.log("is?", isMore), [page]);
    useEffect(scrollToBottom, [boxLoad]);

    useEffect(() => {
      messages && setTimeout(() => setBoxLoad(false), 1000);
    }, [messages]);

    const handleScroll = (e) => {
      // console.log("load", loadMore);
      // console.log(window.innerHeight);
      // console.log("CB h =", scrollRef.current.clientHeight);
      // console.log(e.target.documentElement.scrollHeight);
      // var height = document.getElementById("chat_white").offsetHeight;
      // console.log(height);
      // // const scrollHeight = e.target.scrollHeight;
      const scrollTop = scrollRef.current.scrollTop;
      // console.log("top =", scrollTop);
      if (scrollTop < 140) {
        loadMore++;
        console.log("load more", loadMore);
        // loadTenPokemon();
        // setPage(1);
      }
      if (loadMore > 9 && isMore) setPage(1 + page);
      // console.log(
      //   Math.ceil(e.target.documentElement.scrollTop + window.innerHeight)
      // );
      // const scrollHeight = e.target.documentElement.scrollHeight;
      // const currentHeight = Math.ceil(
      //   e.target.documentElement.scrollTop + window.innerHeight
      // );
      // console.log(round);
      // console.log(e.target.documentElement.scrollTop);
      // console.log(window.innerHeight);
      // console.log(e.target.documentElement.scrollHeight);
      // // console.log(
      // //   Math.ceil(e.target.documentElement.scrollTop + window.innerHeight)
      // // );
      // // const scrollHeight = e.target.documentElement.scrollHeight;
      // // const currentHeight = Math.ceil(
      // //   e.target.documentElement.scrollTop + window.innerHeight
      // // );
      // if (currentHeight + 1 >= scrollHeight) {
      //   // loadTenPokemon();
      //   console.log("page+1")
      // }
    };
    // const active = online.filter((fl) => fl.id == receiveUser.id);
    // console.log(active);

    // console.log(messages);
    // const data = { to: receiveUser.id };
    // socket.emit("conversation_init", data);
    // // useEffect(() => {
    // socket.on("conversation_initiated", (data) => {
    //   console.log(data.id);
    //   // setConvoId(data.id);
    // });
    // }, [number]);
    console.log("box");
    // let userMesseage = [];

    useEffect(() => {
      if (page != 0) {
        axios
          .get(
            `${endpoint}/messages?conversation_id=${converseId}&page=${page}&limit=15`,
            config
          )
          .then((res) => {
            console.log("msg", res.data.data);
            // setMessages(res.data.data.slice(0).reverse());

            setMessages([...res.data.data.slice(0).reverse(), ...messages]);
            // setLoad(false);
            res.data.data.length == 15 ? setIsMore(true) : setIsMore(false);
            // res.data.data.length == 15 ? setIsMore(true) : setIsMore(true);
          })
          .catch((err) => console.log(err));
      }
    }, [converseId, page]);

    useEffect(() => {
      setPage(0);
      axios
        .get(
          `${endpoint}/messages?conversation_id=${converseId}&page=0&limit=15`,
          config
        )
        .then((res) => {
          console.log("msg", res.data.data);
          setMessages(res.data.data.slice(0).reverse());
          res.data.data.length == 15 ? setIsMore(true) : setIsMore(false);
          // setMessages([...res.data.data.slice(0).reverse(), ...messages]);
          // setLoad(false);
          // res.data.data.length == 15 ? setIsMore(true) : setIsMore(false);
          // res.data.data.length == 15 ? setIsMore(true) : setIsMore(true);
        })
        .catch((err) => console.log(err));
    }, [msgId, recMsg]);

    // const handleChatImageChange = (e) => {
    //   setError(false);
    //   const selected = e.target.files[0];
    //   const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    //   if (selected && ALLOWED_TYPES.includes(selected.type)) {
    //     let reader = new FileReader();
    //     reader.onload = () => {
    //       setChatImg(reader.result);
    //       console.log(reader.result);
    //       console.log(chatImg);
    //       // setAlert(false);
    //       setDispatchData({ ...dispatchData, ad: reader.result });
    //     };
    //     reader.readAsDataURL(selected);
    //   } else {
    //     setError(true);
    //   }
    // };
    // scrollListener.addScrollHandler(
    //   "some-id",
    //   myScrollStartHandler,
    //   myScrollEndHandler
    // );

    socket.on("message", () => {
      // setMsgId(data.id);
      console.log("msssgggg");
      setRecMsg(!recMsg);
    });

    const handleEmitMeassage = (typ) => {
      // e.preventDefault();
      if (text != "" && text != "\n" && text != "\n\n") {
        var struct = {
          toUser: receiveUser.username,
          byUser: user,
          text,
          type: typ,
        };

        // dispatch(sendText({ struct }));

        // const messageData = {
        //   room: 123,
        //   author: receiveUser.username,
        //   message: text,
        //   time:
        //     new Date(Date.now()).getHours() +
        //     ":" +
        //     new Date(Date.now()).getMinutes(),
        // };
      }
      setText("");
      // const { toUser, byUser, text, type } = struct;
      const data = {
        conversation_id: converseId,
        text: struct.text,
        // type: type,
      };
      socket.emit("message", data);
      socket.on("message_done", (data) => {
        setMsgId(data.id);
        // console.log(data.id);
      });
      // socket.on("receive_message", (data) => {
      //   setRecMsg(data.id);
      //   console.log(data.id);
      // });
    };

    // useEffect(() => {
    // // loadTenPokemon();
    // window.addEventListener("scroll", handleScroll);
    // }, []);

    return (
      <div
        className={
          chatData[number].isMin
            ? "position-fixed d-flex overflow-hidden flex-column justify-content-between"
            : "position-fixed d-flex overflow-hidden flex-column justify-content-between"
        }
        style={
          chatData[number].isMin
            ? {
                boxShadow: "0px 0px 10px black",
                borderRadius: 10,
                right: number * 310 + number * 10 + (!full ? 20 : 0),
                bottom: 0,
                height: 60,
                width: 300,
                zIndex: 4,
                borderRadius: 10,
              }
            : {
                boxShadow: "0px 0px 10px black",
                borderRadius: 10,
                right: number * 320 + (!full ? 20 : 0),
                bottom: 0,
                height: full ? "94vh" : 500,
                width: full ? "100vw" : 300,
                zIndex: 4,
              }
        }
      >
        <div className="d-flex justify-content-between align-items-end bg-white">
          <div
            className="bg-linearlr text-white h-100 w-100"
            style={
              !chatData[number].isMin
                ? { borderBottomRightRadius: " 30px 15px " }
                : {}
            }
          >
            <div className="d-flex align-items-center mx-1 mt-3 ps-1">
              {isOnline ? (
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar
                    className="shadow me-1"
                    alt={receiveUser.username}
                    src={receiveUser.profile_pic.public_url}
                    style={{
                      width: full ? 40 : 30,
                      height: full ? 40 : 30,
                    }}
                  />
                </StyledBadge>
              ) : (
                <Avatar
                  className="shadow me-1"
                  alt={receiveUser.username}
                  src={receiveUser.profile_pic.public_url}
                  style={{ width: full ? 40 : 30, height: full ? 40 : 30 }}
                />
              )}
              <div style={{ fontSize: full ? 20 : 14 }}>
                {receiveUser.username}
              </div>
            </div>
          </div>
          <div className="h-100 d-flex flex-column justify-content-end bg-white">
            <div
              className="h-100 d-flex align-items-center text-white justify-content-center py-2 ps-3 pe-1"
              style={{ backgroundColor: "#7201c8" }}
            >
              {/* <MoreHorizIcon style={{ fontSize: 18 }} /> */}
              {/* <VideocamIcon className="ms-1" style={{ fontSize: 18 }} /> */}
              {!full &&
                (!chatData[number].isMin ? (
                  <CloseFullscreenIcon
                    className="ms-2 cursor-pointer"
                    style={{ fontSize: 18 }}
                    onClick={() => {
                      let dup = [...chatData];
                      dup[number].isMin = true;
                      setChatData(dup);
                    }}
                  />
                ) : (
                  <OpenInFullIcon
                    className="ms-2 cursor-pointer"
                    style={{ fontSize: 18 }}
                    onClick={() => {
                      let dup = [...chatData];
                      dup[number].isMin = false;
                      setChatData(dup);
                    }}
                  />
                ))}
              <CloseIcon
                className="ms-2 me-1 cursor-pointer"
                style={{ fontSize: full ? 25 : 20 }}
                onClick={() => {
                  let dup = [...chatData];
                  dup[number].isMin = false;
                  dup[number].isOpen = false;
                  dup[number].userData = null;
                  setChatData(dup);
                }}
              />
            </div>
            <div style={{ backgroundColor: "#7201c8" }}>
              <div
                className="p-3"
                style={
                  !chatData[number].isMin
                    ? {
                        borderTopLeftRadius: " 30px 20px ",
                        backgroundColor: "#fff",
                      }
                    : {
                        borderTopLeftRadius: " 30px 20px ",
                        backgroundColor: "#7201c8",
                      }
                }
              ></div>
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
        {!chatData[number].isMin && (
          <>
            <div
              className="bg-white overflow-auto"
              ref={scrollRef}
              id="chat_white"
              style={{
                height: full ? "88%" : "78%",
                // background: `url("${receiveUser.profile_pic.public_url}")no-repeat center/cover`,
              }}
              onScroll={(e) => handleScroll(e)}
            >
              <div className="px-1 py-3 d-flex flex-column justify-content-center">
                {/* <div className="py-1 d-flex flex-column align-items-end justify-content-end"> */}
                {/* {console.log(chatText, chatSocket)} */}
                {boxLoad ? (
                  <div className="col-12 d-flex align-justify-center my-5 py-5 h-100">
                    <img src={loaderP} width="15%" height="15%" />
                  </div>
                ) : messages.length == 0 ? (
                  <div className=" px-2 py-5 col-12  d-flex flex-column justify-content-center align-items-center">
                    <img src={hi} width="60%" />
                    <p
                      className="purple"
                      style={{
                        fontSize: 13,
                      }}
                    >
                      Say "Hello" to start a conversation
                    </p>
                    <div
                      className="br-10 border border-2 border-seconadry purple px-2 py-1 cursor-pointer li-y-shadow"
                      // style={{boxShadow:"0px 5px 3px #0000005e"}}
                      onClick={() => {
                        let data = {
                          conversation_id: converseId,
                          text: "Hello 😊",
                        };
                        socket.emit("message", data);
                        socket.on("message_done", (data) => {
                          setMsgId(data.id);
                          console.log(data.id);
                        });
                      }}
                    >
                      Hello 😊
                    </div>
                  </div>
                ) : (
                  messages.map((ct, ind) => {
                    // if (
                    //   receiveUser.username == ct.toUser &&
                    //   user == ct.byUser
                    // ) {
                    //   if (ct.type == "txt") {
                    const dayChange = changedDay(ind);
                    // console.log(dayChange);

                    if (
                      ct.user.username == receiveUser.username ||
                      ct.user.username == logUser.username
                    ) {
                      let link =
                        ct.text.slice(0, 6) === "zdshr:" ? true : false;
                      let display = link
                        ? `https://zilliondreamz.com/post/${ct.text.slice(6)}` // `localhost:3000/post/${ct.text.slice(6)}`
                        : ct.text;
                      link && console.log(ct.text.slice(6));
                      const fw = display.split(" ")[0];
                      if (logUser.username == ct.user.username) {
                        return (
                          <>
                            {(ind == 0 || dayChange) && (
                              <div className="px-3 d-flex align-justify-center position-relative py-4">
                                <div
                                  className="px-3 bg-white grey purple br-20"
                                  style={{
                                    fontSize: 12,
                                    border: "1px solid #7201c8",
                                  }}
                                >
                                  {calDay(ct.created_at)}
                                </div>
                              </div>
                            )}
                            <div
                              key={ind}
                              className="d-flex justify-content-end align-items-end mt-1 w-100"
                            >
                              <div
                                className="text-dark ms-1"
                                style={{ fontSize: 8, width: 40 }}
                              >
                                {handleTime(ct.created_at)}
                              </div>
                              {messages.length - 1 == ind ? (
                                !link ? (
                                  <motion.div
                                    key={messages}
                                    className={`px-3 py-1 bg-linearlr mt-1 ${
                                      fw.length > 34 && " word-break-all"
                                    }`}
                                    style={{
                                      borderRadius: 25,
                                      borderBottomRightRadius: 0,
                                      overflow: "auto",
                                      fontSize: full ? 16 : 12,
                                      boxShadow: "0px 2px 3px #0000005e",
                                      maxWidth: 250,
                                    }}
                                    initial={{ x: "100%", scale: 0 }}
                                    animate={{ x: 0, scale: 1 }}
                                    transition={{
                                      duration: 0,
                                      type: "easeInOut",
                                    }}
                                  >
                                    {display}
                                  </motion.div>
                                ) : (
                                  <a
                                    href={display}
                                    className="px-3 py-1 mt-1 word-break-all cursor-pointer purple"
                                    style={{
                                      borderRadius: 25,
                                      borderBottomRightRadius: 0,
                                      overflow: "auto",
                                      fontSize: full ? 16 : 12,
                                      boxShadow: "0px 0px 5px #0000005e",
                                      maxWidth: 250,
                                    }}
                                  >
                                    <u>{display}</u>
                                  </a>
                                )
                              ) : !link ? (
                                <div
                                  className={`px-3 py-1 bg-linearlr mt-1 ${
                                    fw.length > 34 && " word-break-all"
                                  }`}
                                  style={{
                                    borderRadius: 25,
                                    borderBottomRightRadius: 0,
                                    overflow: "auto",
                                    fontSize: full ? 16 : 12,
                                    boxShadow: "0px 2px 3px #0000005e",
                                    maxWidth: 250,
                                  }}
                                >
                                  {display}
                                </div>
                              ) : (
                                <a
                                  href={display}
                                  className="px-3 py-1 mt-1 word-break-all cursor-pointer purple"
                                  style={{
                                    borderRadius: 25,
                                    borderBottomRightRadius: 0,
                                    overflow: "auto",
                                    fontSize: full ? 16 : 12,
                                    boxShadow: "0px 0px 5px #0000005e",
                                    maxWidth: 250,
                                  }}
                                >
                                  <u>{display}</u>
                                </a>
                              )}
                            </div>
                          </>
                        );
                      } else {
                        return (
                          <>
                            {(ind == 0 || dayChange) && (
                              <div className="px-3 d-flex align-justify-center position-relative py-4">
                                <div
                                  className="px-3 bg-white grey purple br-20"
                                  style={{
                                    fontSize: 12,
                                    border: "1px solid #7201c8",
                                  }}
                                >
                                  {calDay(ct.created_at)}
                                </div>
                              </div>
                            )}
                            <div className="py-1 d-flex align-items-end justify-content-start mt-1">
                              <Avatar
                                src={
                                  ct.user.profile_pic
                                    ? ct.user.profile_pic.public_url
                                    : ""
                                }
                                style={{
                                  width: full ? 30 : 20,
                                  height: full ? 30 : 20,
                                }}
                                className="mt-2"
                              />
                              {/* <div className="d-flex justify-content-start"> */}
                              {!link ? (
                                <div
                                  className={`px-3 py-1 bg-hash text-dark mt-1 ${
                                    fw.length > 34 && " word-break-all"
                                  }`}
                                  style={{
                                    borderRadius: 25,
                                    borderBottomRightRadius: 0,
                                    overflow: "auto",
                                    fontSize: full ? 16 : 12,
                                    boxShadow: "0px 2px 3px #0000005e",
                                    maxWidth: 250,
                                  }}
                                >
                                  {display}
                                </div>
                              ) : (
                                <a
                                  href={display}
                                  className="px-3 py-1 mt-1 word-break-all cursor-pointer purple"
                                  style={{
                                    borderRadius: 25,
                                    borderBottomRightRadius: 0,
                                    overflow: "auto",
                                    fontSize: full ? 16 : 12,
                                    boxShadow: "0px 0px 5px #0000005e",
                                    maxWidth: 250,
                                  }}
                                >
                                  <u>{display}</u>
                                </a>
                              )}
                              <div
                                className="text-dark ms-2"
                                style={{ fontSize: 8, width: 45 }}
                              >
                                {handleTime(ct.created_at)}
                              </div>
                            </div>
                          </>
                        );
                      }
                    }
                    // }
                    // if (ct.type == "img") {
                    //   return (
                    //     <div
                    //       key={ind}
                    //       className="d-flex justify-content-end"
                    //     >
                    //       <img
                    //         className="shadow col-10 mt-2 ms-auto"
                    //         style={{
                    //           borderRadius: 25,
                    //           height: 300,
                    //         }}
                    //         src={ct.text}
                    //       />
                    //     </div>
                    //   );
                    // }
                    // }
                  })
                )}
                {/* receiveUser.username == chatText.toUser &&
                  user == chatText.bytoUser && ( */}
                {/* )} */}
                {/* </div> */}
                {!chatData[number].isMin && <div ref={messagesEndRef} />}
              </div>
            </div>
            <div className=" p-2 py-2 d-flex justify-content-between align-items-center bg-linearlr py-1">
              {/* <StarIcon style={{ fontSize: 14 }} /> */}
              {/* <form
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(sendText({ user: user.username, text: text }));
                }}
              > */}
              <InputBase
                // multiline
                // maxRows={2}
                size="small"
                onChange={(e) => setText(e.target.value)}
                placeHolder="Message"
                value={text}
                // className={classes.textfield}
                // onKeyDown={(e) => {
                //   if (e.keyCode === 13 && !e.shiftKey) {
                //     e.preventDefault();
                //     setText("");
                //   }
                //   // e.key === "Enter" && handleEmitMeassage("txt");
                // }}
                // onKeyPress={(e) => {}}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !(e.keyCode === 13 && !e.shiftKey)) {
                    console.log("Enter key pressed");
                    handleEmitMeassage("txt");
                    // write your functionality here
                  }
                }}
                sx={{
                  borderRadius: 10,
                  width: full ? 330 : 240,
                  border: "2px solid white",
                  backgroundColor: "white",
                  mx: 1,
                  fontSize: full ? 18 : 12,
                  px: 1,
                  color: "black",
                }}
              />
              <SendIcon
                className="text-white cursor-pointer"
                style={{ fontSize: full ? 30 : 20 }}
                onClick={() => {
                  // console.log(struct);

                  handleEmitMeassage("txt");
                  // await socket.emit("send_message", messageData, () =>
                  //   console.log("send message")
                  // );
                }}
              />
              {/* </form> */}
              {/* <input
                className="d-none"
                type="file"
                id="chat_img"
                onChange={handleChatImageChange}
              />
              <label for="chat_img">
                <AddCircleOutlineIcon
                  className="text-white cursor-pointer"
                  style={{ fontSize: full ? 30 : 20 }}
                />
              </label> */}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      {chatData.map((chat, indexx) => {
        if (!full && chat.isOpen)
          return (
            <Chatbox number={indexx} converseId={chat.conId} key={indexx} />
          );
      })}
      {full && chatData[0].isOpen && (
        <Chatbox converseId={chatData[0].conId} number={0} />
      )}
      <div className="p-2 bg-white fw-bold overflow-auto">
        <div className="mb-3">
          {convoList &&
            convoList.map((con, index) => {
              const userno = con.users.filter((us) =>
                us.username != logUser.username ? us : null
              );
              // console.log(userno);
              let isOnline = null;
              online.forEach((us) => {
                if (us.id == userno[0].id) isOnline = us.status;
              });

              return (
                <>
                  <div
                    key={index}
                    className={`d-flex cursor-pointer justify-content-between py-1 pe-2 my-2  ${
                      selected ? "bg-linear " : "purple bg-white "
                    }align-items-center`}
                    style={{
                      borderRadius: 10,
                      zIndex: 0,
                      boxShadow: selected ? "0px 0px 10px #0000008f" : "",
                    }}
                    onClick={() => {
                      let dup = [...chatData];
                      if (full) {
                        dup[0].isOpen = true;
                        dup[0].isMin = false;
                        dup[0].userData = index;
                        dup[0].conId = con.id;
                      } else {
                        var i = 0;
                        for (i = 0; i < dup.length; i++) {
                          if (
                            dup[0].isOpen &&
                            dup[1].isOpen &&
                            dup[2].isOpen &&
                            dup[3].isOpen
                          ) {
                            console.log("4 plus condition");
                            while (j >= 0) {
                              var k = j % 4;
                              var flag = 0;
                              dup.map((abcd) => {
                                if (abcd.userData == index) {
                                  flag = 1;
                                }
                              });
                              if (flag == 0) {
                                dup[k].isOpen = true;
                                dup[k].isMin = false;
                                dup[k].userData = index;
                                dup[k].conId = con.id;
                                setJ(++j);
                              }
                              break;
                            }
                            break;
                          } else {
                            if (!dup[i].isOpen) {
                              var flag = 0;
                              dup.map((abcd) => {
                                if (abcd.userData == index) {
                                  flag = 1;
                                }
                              });
                              if (flag == 0) {
                                dup[i].isOpen = true;
                                dup[i].userData = index;
                                dup[i].conId = con.id;
                              }
                              break;
                            }
                          }
                        }
                      }
                      setChatData(dup);
                    }}
                  >
                    <div className="d-flex justify-content-between mx-2 align-items-center ">
                      <Avatar
                        className="col-3 shadow border border-1 border-secondary shadow-lg"
                        alt={userno[0].username}
                        src={
                          userno[0].profile_pic
                            ? userno[0].profile_pic.public_url
                            : ""
                        }
                        sx={{ mr: 1, width: 50, height: 50 }}
                      />
                      <div className="">
                        <Typography className="fw-bold" nowrap variant="body1">
                          {userno[0].username}
                        </Typography>
                        {!selected && (
                          <Typography
                            className="text-dark"
                            nowrap
                            variant="body2"
                          >
                            {userno[0].username}
                          </Typography>
                        )}
                      </div>
                    </div>
                    {isOnline ? (
                      <img
                        src={on}
                        style={{ width: 50, height: 50 }}
                        className=" "
                      />
                    ) : (
                      <img
                        src={off}
                        style={{ width: 30, height: 30 }}
                        className="rounded-circle me-2"
                      />
                    )}
                  </div>
                </>
              );
            })}

          {convoList && convoList.length < 11 && newContacts.length > 0 && (
            <>
              <div className="purple fw-600 text-center col-12">
                Your Contacts
              </div>
              {newContacts.map((profile, index) => {
                // const active = online.filter((fl) => fl.id == profile.id);
                // console.log(active);
                //   setSelected(false);
                //   chatData.filter((dt) => {
                //     if (dt.userData == index) {
                //       setSelected(true);
                //     }
                //   });
                //   console.log(selected);
                // const userno = con.users.filter(
                //   (us) => us.username != logUser.username
                // );
                // let isOnline = CheckOnline([profile.id]);
                // console.log(online);
                let isOnline = null;
                online.forEach((us) => {
                  if (us.id == profile.id) isOnline = us.status;
                });
                // console.log(isOnline);

                return (
                  <>
                    <div
                      key={index}
                      className={`d-flex cursor-pointer justify-content-between py-1 pe-2 my-2  ${
                        selected ? "bg-linear " : "purple bg-white "
                      }align-items-center`}
                      style={{
                        borderRadius: 10,
                        boxShadow: selected ? "0px 0px 10px #0000008f" : "",
                      }}
                      // onClick={handleChatInit(profile.id)}
                      onClick={() => {
                        const data = { to: profile.id };
                        socket.emit("conversation_init", data);
                        // useEffect(() => {
                        socket.on("conversation_initiated", (data) => {
                          console.log(data.id);
                          setRefreshChat(!refreshChat);
                        });
                      }}
                    >
                      <div className="d-flex justify-content-between mx-2 align-items-center ">
                        <Avatar
                          className="col-3 shadow border border-1 border-secondary shadow-lg"
                          alt={profile.username}
                          src={
                            profile.profile_pic
                              ? profile.profile_pic.public_url
                              : ""
                          }
                          sx={{ mr: 1 }}
                        />
                        <div className="">
                          <Typography
                            className="fw-bold"
                            nowrap
                            variant="body1"
                          >
                            {profile.username}
                          </Typography>
                        </div>
                      </div>
                      {isOnline ? (
                        <img
                          src={on}
                          style={{ width: 50, height: 50 }}
                          className=" "
                        />
                      ) : (
                        <img
                          src={off}
                          style={{ width: 30, height: 30 }}
                          className="rounded-circle me-2"
                        />
                      )}
                    </div>
                  </>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default memo(Chat);
