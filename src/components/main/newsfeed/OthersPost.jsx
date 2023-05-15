import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState, useEffect, useCallback } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import { postComment, uploadFeed } from "../../../slices/newsfeedSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import hotsauce from "../../../assets/images/hotsauce.svg";
import heart from "../../../assets/images/heart.svg";
import hypno from "../../../assets/images/hypno.svg";
import ice from "../../../assets/images/ice.svg";
import cylinder from "../../../assets/images/cylinder.svg";
import Tooltip from "@mui/material/Tooltip";
import angrygif from "../../../assets/images/angry.gif";
import freezegif from "../../../assets/images/freeze.gif";
import heartgif from "../../../assets/images/heart.gif";
import laughgif from "../../../assets/images/laugh.gif";
import mindblowngif from "../../../assets/images/mindblown.gif";
import blankFace from "../../../assets/images/blank-face.gif";
import tick from "../../../assets/images/tick.gif";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import {
  endpoint,
  config,
  imgConfig,
  checkVideo,
  months,
  socket,
} from "../../../endpoint";
import axios from "axios";
import bg from "../../../assets/images/bg.mp4";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { motion } from "framer-motion";
import loaderW from "../../../assets/images/loader-white.gif";
import loaderP from "../../../assets/images/loader-color.gif";
import nodata from "../../../assets/images/nofeed.gif";
import { useHistory } from "react-router-dom";
import { memo } from "react";
import feed_loader from "../../../assets/images/feed_load.gif";

import Comments from "./Comments";
import Share from "./Share";

import InfiniteScroll from "react-infinite-scroll-component";

// const StyledBadge = styled(Badge)(({ theme }) => ({
//   "& .MuiBadge-badge": {
//     // left: 30,
//     backgroundColor: "#44b700",
//     color: "#44b700",
//     boxShadow: `0 0 0 1px ${theme.palette.background.paper}`,
//     "&::after": {
//       position: "absolute",
//       // top: 0,
//       // left: 0,
//       width: "200%",
//       height: "200%",
//       borderRadius: "50%",
//       content: '""',
//     },
//   },
// }));

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

function OthersPost({
  mob,
  page,
  setPage,
  logUser,
  dumData,
  setDumData,
  loading,
  fetchFeed,
  isMore,
  emote,
  setEmote,
  shareData,
  setShareData,
  uploadGallery,
  postSuccess,
  post,
  tab,
}) {
  const history = useHistory();
  // const [shareData, setShareData] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [commentsData, setCommentsData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [commentsLoad, setCommentsLoad] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [postId, setPostId] = useState(null);
  const [online, setOnline] = useState(null);
  const [cpage, setCpage] = useState(0);
  const [cisMore, setCisMore] = useState(false);
  const [source, setSource] = useState([
    {
      name: "Laughing gas",
      src: cylinder,
      gif: laughgif,
      scale: 0.8,
      align: "",
      glow: "5px #266bee",
    },
    {
      name: "Hot Sauce",
      src: hotsauce,
      gif: angrygif,
      scale: 1.4,
      align: "",
      glow: "3px #8b0110",
    },
    {
      name: "Heart",
      src: heart,
      gif: heartgif,
      scale: 1.5,
      align: "ms-1",
      glow: "2px #ff0000",
    },
    {
      name: "Freeze Flake",
      src: ice,
      gif: freezegif,
      scale: 1.4,
      align: "me-1",
      glow: "2px #7cbdff",
    },
    {
      name: "Illusion glass",
      src: hypno,
      gif: mindblowngif,
      scale: 1.5,
      align: "ms-1",
      glow: "2px #7201c8",
    },
  ]);

  useEffect(() => {
    let data = [];

    dumData.forEach((fl) => data.push(fl.user.id));
    // console.log(data);
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
    });
    console.log(online);
  }, []);

  // let postno = dumData[selectedUser];
  // console.log(postno.id);

  // useEffect(() => {
  //   console.log(postId);
  //   axios
  //     .get(`${endpoint}/post/${postId}/comments?page=${page}&limit=7`, config)
  //     .then((res) => {
  //       console.log("cmt", res.data.data);
  //       setCommentsData(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [selectedUser, commentsLoad]);

  useEffect(() => {
    console.log("cmt", commentsData);
  }, [commentsData]);

  useEffect(() => {
    // console.log(postId);
    axios
      .get(`${endpoint}/post/${postId}/comments?page=${cpage}&limit=7`, config)
      .then((res) => {
        setCommentsData([...commentsData, ...res.data.data]);
        res.data.data.length < 7 ? setCisMore(false) : setCisMore(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cpage, postId]);

  //   fetchFeed();

  //   console.log("othersPost");

  const handleReaction = (type, postId, postInd) => {
    // let dupData = [...dumData];
    // dupData[index].reaction = indexno;
    // setDumData(dupData);
    // console.log(dupData[index].reaction);
    const data = {
      type,
    };
    axios
      .post(`${endpoint}/post/${postId}/emote`, { data }, config)
      .then((res) => {
        console.log(res.data);
        setEmote(!emote);
        let dup = [...dumData];
        dup[postInd].emote_type = type;
        setDumData(dup);
      })
      .catch((err) => console.log(err));
  };
  const checkImg = ["image/jpeg", "image/png", "image/gif"];
  return (
    <>
      {loading ? (
        <div className="col-12 d-flex align-justify-center my-5 py-5">
          <img src={loaderP} width="10%" height="10%" className="my-5" />
        </div>
      ) : (
        <>
          {dumData.length == [] ? (
            !(uploadGallery || postSuccess) && (
              <div className="col-12 d-flex flex-column align-justify-center">
                <img src={nodata} width="40%" />
                <div className="purple">
                  No feed yet! Add friends to view their posts
                </div>
              </div>
            )
          ) : (
            <InfiniteScroll
              className="col-12 "
              dataLength={dumData.length}
              hasMore={isMore}
              //   hasMore={true}
              next={() => {
                console.log("next");
                setPage(page + 1); // paginate
              }}
              loader={
                <div className="col-12 d-flex align-justify-center my-5 py-5">
                  <img
                    src={loaderP}
                    width="10%"
                    height="10%"
                    className="my-5"
                  />
                </div>
              }
              endMessage={
                !post && (
                  <div className="col-12 d-flex flex-column align-justify-center">
                    <img src={nodata} width="40%" />
                    <div className="purple">Caught up</div>
                  </div>
                )
              }
            >
              {dumData.map((feed, index) => {
                let imgView = 0;
                if (feed.attachment) {
                  var img = new Image();
                  img.src = feed.attachment.public_url;
                  let h = img.height;
                  let w = img.width;
                  // console.log(
                  //   index + 1,
                  //   h,
                  //   w,
                  //   !(w > h && w - h > 300) ? "potrait" : "landascape"
                  // );
                  if (w > h && w - h > 300) imgView = 1;
                }

                const d = new Date(feed.posted_at);
                const postedDate = d.getDate();

                const postedMonth = months[d.getMonth()];

                let isOnline = null;
                online &&
                  online.forEach((us) => {
                    if (us.id == feed.user.id) isOnline = us.status;
                  });
                // console.log(isOnline);

                return (
                  <div
                    key={index}
                    className="mx-0 ms-md-2 me-md-3 mx-lg-0 mb-5 mt-5 pt-3 col-12 d-flex flex-column align-justify-center"
                  >
                    <div className="col-12 col-lg-10 col-xxl-9 d-flex flex-column justify-content-center px-1">
                      <div className="d-flex col-12 position-relative">
                        <Box
                          className={`col-12 col-md-11 d-flex mx-auto flex-column justify-content-start
                       position-relative ${
                         !feed.attachment && " bg-linearlr li-shadow"
                       }`}
                          style={
                            feed.attachment
                              ? {
                                  borderRadius: "25px",
                                  height: mob ? 275 : 325,
                                  // height: 325,
                                  boxShadow: "0px 0px 15px grey",
                                  // background: feed.attachment.public_url
                                  //   ? `url("${feed.attachment.public_url}")no-repeat center/contain`
                                  //   : "",
                                  zIndex: 1,
                                }
                              : {
                                  borderRadius: "25px",
                                  maxHeight: 525,
                                  // boxShadow: "0px 0px 15px grey",
                                  // border: "3px solid #7201c8",
                                }
                          }
                        >
                          <div
                            className=" px-sm-4 pe-2 d-flex align-items-end justify-content-between"
                            style={{ height: "20px", zIndex: 2 }}
                          >
                            <div className="ps-1 d-flex align-items-center justify-content-start ms-2 mb-sm-0 mx-sm-0 ">
                              {isOnline ? (
                                <StyledBadge
                                  overlap="circular"
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                  }}
                                  variant="dot"
                                >
                                  <Avatar
                                    className="bg-linearlr cursor-pointer"
                                    alt={feed.user.username}
                                    src={
                                      feed.user.profile_pic
                                        ? feed.user.profile_pic.public_url
                                        : ""
                                    }
                                    style={{
                                      boxShadow: "0px 5px 10px black",
                                      // bottom:"25px",
                                      // transform: "scale(1.2)",
                                      width: mob ? 50 : 60,
                                      height: mob ? 50 : 60,
                                    }}
                                    onClick={() =>
                                      history.push(
                                        `/user-profile/${feed.user.id}`
                                      )
                                    }
                                  />
                                </StyledBadge>
                              ) : (
                                <Avatar
                                  className="bg-linearlr cursor-pointer"
                                  alt={feed.user.username}
                                  src={
                                    feed.user.profile_pic
                                      ? feed.user.profile_pic.public_url
                                      : ""
                                  }
                                  style={{
                                    boxShadow: "0px 5px 10px black",
                                    // bottom:"25px",
                                    // transform: "scale(1.2)",
                                    width: mob ? 50 : 60,
                                    height: mob ? 50 : 60,
                                  }}
                                  onClick={() =>
                                    history.push(
                                      `/user-profile/${feed.user.id}`
                                    )
                                  }
                                />
                              )}
                              <div className="d-flex flex-column flex-sm-row justify-content-start align-items-start ms-2 pe-1 pe-sm-2 mb-sm-3 mt-0 ">
                                <div
                                  className="fw-bold pe-sm-2 purple mb-4 mb-sm-0"
                                  style={{ fontSize: 18 }}
                                >
                                  {feed.user.username}
                                </div>
                                {/* <div className="fw-bold grey post-uname">
                            @{feed.user.id}
                          </div> */}
                              </div>
                            </div>
                            <div className="d-flex mb-2">
                              <div
                                className="h6 grey pe-1 pe-sm-2 mt-1 mt-sm-0 mb-3 "
                                style={{ fontSize: 12 }}
                              >
                                {postedMonth + " " + postedDate}
                              </div>
                            </div>
                          </div>
                          {!feed.attachment && (
                            <div
                              className="col-12 my-1 cursor-auto overflow-auto"
                              style={{
                                height: "88%",
                                // overflowY: "scroll !important",
                                // maxHeight: 305,
                              }}
                            >
                              <div
                                className="w-100 px-4 py-2 text-white cursor-auto"
                                // style={{
                                //   maxHeight: 275,
                                // }}
                              >
                                {feed.text}
                              </div>
                            </div>
                          )}
                          {feed.attachment &&
                            checkImg.includes(feed.attachment.mimetype) && (
                              <div className="position-absolute br-20 h-100 w-100 p-0 overflow-hidden bg-white">
                                <div
                                  className="position-absolute h-100 w-100 overflow-hidden"
                                  style={{
                                    zIndex: 1,
                                    background: feed.attachment.public_url
                                      ? `url("${
                                          feed.attachment.public_url
                                        }")no-repeat center/${
                                          !imgView ? "contain" : "cover"
                                        }`
                                      : "",
                                  }}
                                ></div>
                                {!imgView && (
                                  <div
                                    className="position-absolute h-100 w-100"
                                    style={{
                                      zIndex: 0,
                                      background: feed.attachment.public_url
                                        ? `url("${feed.attachment.public_url}")no-repeat center/cover`
                                        : "",
                                      filter: "blur(3px)",
                                      opacity: 0.7,
                                    }}
                                  ></div>
                                )}
                              </div>
                            )}
                          <div
                            className="br-20 w-100 position-absolute overflow-hidden "
                            style={{
                              height: mob ? 275 : 325,
                            }}
                          >
                            {feed.attachment &&
                              checkVideo.includes(feed.attachment.mimetype) && (
                                // <Player src="http://www.w3schools.com/html/mov_bbb.mp4">
                                //   <BigPlayButton position="center" />
                                // </Player>
                                <video
                                  className="my-auto"
                                  // width="100%"
                                  // height="100%"
                                  style={{
                                    width: "100%" /* or any custom size */,
                                    height: "100%",
                                    objectFit: "contain",
                                  }}
                                  autoPlay
                                  muted
                                  loop
                                  controls
                                  controlsList="nodownload"
                                >
                                  <source
                                    src={
                                      feed.attachment
                                        ? feed.attachment.public_url
                                        : ""
                                    }
                                    type={feed.attachment.mimetype}
                                  />
                                  {/* <source src="movie.ogg" type="video/ogg" /> */}
                                  Your browser does not support the video tag.
                                </video>
                              )}
                          </div>
                        </Box>
                        <div
                          className={`${
                            mob && "d-none"
                          } d-flex flex-column jusitify-content-between my-auto align-items-center ps-1 ps-sm-3`}
                        >
                          <div
                            className={
                              feed.attachment && feed.text
                                ? "mb-5 rounded bg-white li-y-shadow d-flex flex-column justify-content-center align-items-center"
                                : "rounded bg-white li-y-shadow d-flex flex-column justify-content-center align-items-center"
                            }
                          >
                            <img
                              src={
                                feed.emote_type || feed.emote_type == 0
                                  ? source[feed.emote_type].gif
                                  : blankFace
                              }
                              className="col-12 p-0"
                              style={{
                                width: 70,
                                height: 70,
                              }}
                            />
                            {/* <div
                    className="m-0 purple fw-bold"
                    style={{ fontSize: "8px" }}
                  >
                    {feed.reactions}
                  </div> */}
                          </div>
                          <div
                            className={`${
                              feed.attachment && feed.text ? " mt-5" : " mt-2"
                            } px-1 py-2 rounded bg-white li-shadow d-flex flex-column align-justify-center
                            `}
                          >
                            <CommentIcon
                              className="cursor-pointer rounded-circle purple"
                              onClick={() => {
                                setCommentsOpen(true);
                                setShareOpen(false);
                                setSelectedUser(index);
                                setPostId(feed.id);
                              }}
                            />
                            <ShareIcon
                              className="cursor-pointer rounded-circle mt-2 purple"
                              onClick={() => {
                                setShareOpen(true);
                                setCommentsOpen(false);
                                setSelectedUser(index);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-11 d-flex flex-column align-justify-center">
                        {feed.attachment &&
                          feed.text &&
                          (feed.toggle ? (
                            <div className="d-flex flex-column col-11 mx-auto">
                              <div
                                className="px-3 text-white col-12"
                                style={{
                                  fontSize: "12px",
                                  // backgroundColor: "#A9A9A9",
                                  color: "white",
                                }}
                              >
                                {/* <div
                                className={
                                  feed.attachment
                                    ? `px-4 mt-auto text-white col-12 py-2 rounded`
                                    : "px-4 mt-1 text-dark fw-bold mb-3 bg-hash col-11 py-2 rounded"
                                }
                                style={
                                  feed.text && feed.attachment
                                    ? {
                                        fontSize: "12px",
                                        backgroundColor: "#4b4b4b9b",
                                      }
                                    : { fontSize: "15px" }
                                }
                              >
                                {feed.text}
                              </div> */}
                                <div
                                  className=" bg-linearlr col-12 py-2 px-2 change li-shadow overflow-auto"
                                  style={{
                                    borderRadius: "0 0 10px 10px",
                                    maxHeight: 60,
                                  }}
                                >
                                  {feed.text}
                                </div>
                                {/* <textarea
                                className="bg-linearlr li-shadow rounded col-12 border-0 no-out pt-1 px-2 change"
                                placeHolder="Type something..."
                                value={dispatchData.caption}
                                onChange={(e) => {
                                  setDispatchData({
                                    ...dispatchData,
                                    caption: e.target.value,
                                  });
                                }}
                              /> */}
                                <div className="text-center col-12  cursor-pointer purple ">
                                  <KeyboardArrowUpIcon
                                    onClick={() => {
                                      let dup = [...dumData];
                                      dumData[index].toggle = false;
                                      setDumData(dup);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div
                              className=" bg-linearlr px-2 li-shadow"
                              style={{ borderRadius: "0px 0px 5px 5px" }}
                            >
                              <KeyboardArrowDownIcon
                                style={
                                  {
                                    // color: "#A9A9A9",
                                  }
                                }
                                className=" cursor-pointer"
                                onClick={() => {
                                  let dup = [...dumData];
                                  dumData[index].toggle = true;
                                  setDumData(dup);
                                }}
                              />
                            </div>
                          ))}
                      </div>
                      <div
                        className={`col-12 col-md-11 row d-flex align-items-center align-items-md-start justify-content-around p-2 mb-4 mb-md-0 ms-1 ${
                          !feed.attachment && mob && "mt-3"
                        }`}
                      >
                        <div className="col-1 d-sm-none rounded bg-white li-y-shadow d-flex flex-column justify-content-center align-items-center ">
                          <img
                            src={
                              feed.emote_type || feed.emote_type == 0
                                ? source[feed.emote_type].gif
                                : blankFace
                            }
                            className="col-12 p-0"
                            style={{
                              width: 40,
                              height: 40,
                            }}
                          />
                          {/* <div
                    className="m-0 purple fw-bold"
                    style={{ fontSize: "8px" }}
                  >
                    {feed.reactions}
                  </div> */}
                        </div>
                        {/* <div
                            className={` pe-2 pt-2 h-100 d-flex h-100 col-6
                            ${
                              feed.text && feed.attachment
                                ? "justify-content-between align-items-start"
                                : "justify-content-center align-items-start p-2"
                            }
                          `}
                            style={{ right: 0, top: 0 }}
                          ></div> */}
                        <div
                          className="col-8 mx-auto mt-md-2 mb-md-5 d-flex justify-content-evenly bg-white"
                          key={index}
                          style={{
                            borderRadius: "15px",
                            // backgroundColor: "#7201c8",
                            boxShadow: "0px 0px 10px #0000005e",
                            // border: "3px solid #a11cf9",
                          }}
                        >
                          {source.map((reactions, indexno) => (
                            <Tooltip title={reactions.name}>
                              {feed.emote_type == indexno ? (
                                <div className="d-flex flex-column align-items-center">
                                  <Box
                                    className="br-10 cursor-pointer d-flex align-justify-center"
                                    sx={{
                                      height: tab ? 50 : mob ? 40 : 60,
                                      width: 50,
                                      "&:hover": {
                                        transform: `scale(1.1)`,
                                      },
                                    }}
                                  >
                                    <img
                                      src={reactions.src}
                                      // onClick={() =>
                                      //   handleReaction(indexno, feed.id)
                                      // }
                                      className="reacticon"
                                      style={{
                                        filter: `drop-shadow(0px 0px ${reactions.glow})`,
                                        transform: `scale(${reactions.scale})`,
                                      }}
                                    />
                                  </Box>
                                  <div
                                    className={`br-10 col-6 ${reactions.align} py-1 bg-purple`}
                                  ></div>
                                </div>
                              ) : (
                                <Box
                                  className=" rounded-circle cursor-pointer"
                                  sx={{
                                    height: tab ? 50 : mob ? 40 : 60,
                                    width: 50,
                                    "&:hover": {
                                      transform: `scale(1.1)`,
                                    },
                                  }}
                                >
                                  <img
                                    src={reactions.src}
                                    onClick={() =>
                                      handleReaction(indexno, feed.id, index)
                                    }
                                    className="reacticon"
                                    style={{
                                      filter: " drop-shadow(0px 0px 2px #000)",
                                      transform: `scale(${reactions.scale})`,
                                    }}
                                  />
                                </Box>
                              )}
                            </Tooltip>
                          ))}
                        </div>
                        {/* <div className="d-sm-none col-4 d-flex jusitify-content-between my-auto align-items-center ps-1 ps-sm-3"> */}
                        <div className="col-2 d-sm-none rounded bg-white li-shadow d-flex align-justify-center px-1 py-2 ">
                          <CommentIcon
                            className="cursor-pointer rounded-circle purple me-2"
                            onClick={() => {
                              setCommentsOpen(true);
                              setShareOpen(false);
                              setSelectedUser(index);
                              setPostId(feed.id);
                            }}
                          />
                          <ShareIcon
                            className="cursor-pointer rounded-circle purple"
                            onClick={() => {
                              setShareOpen(true);
                              setCommentsOpen(false);
                              setSelectedUser(index);
                            }}
                          />
                        </div>
                        {/* </div> */}
                      </div>
                    </div>
                    {commentsOpen && (
                      <Comments
                        commentsData={commentsData}
                        setCommentsData={setCommentsData}
                        dumData={dumData}
                        selectedUser={selectedUser}
                        cpage={cpage}
                        setCpage={setCpage}
                        cisMore={cisMore}
                        commentsLoad={commentsLoad}
                        setCommentsLoad={setCommentsLoad}
                        logUser={logUser}
                        setCommentsOpen={setCommentsOpen}
                        postId={postId}
                        mob={mob}
                        tab={tab}
                      />
                    )}
                    {shareOpen && (
                      <Share
                        dumData={dumData}
                        shareData={shareData}
                        selectedUser={selectedUser}
                        setShareData={setShareData}
                        setShareOpen={setShareOpen}
                        logUser={logUser}
                        mob={mob}
                      />
                    )}
                  </div>
                );
              })}
            </InfiniteScroll>
          )}
        </>
      )}
    </>
  );
}
export default memo(OthersPost);
