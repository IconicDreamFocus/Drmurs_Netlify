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
import { postComment, uploadFeed } from "../../slices/newsfeedSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import hotsauce from "../../assets/images/hotsauce.svg";
import heart from "../../assets/images/heart.svg";
import hypno from "../../assets/images/hypno.svg";
import ice from "../../assets/images/ice.svg";
import cylinder from "../../assets/images/cylinder.svg";
import Tooltip from "@mui/material/Tooltip";
import angrygif from "../../assets/images/angry.gif";
import freezegif from "../../assets/images/freeze.gif";
import heartgif from "../../assets/images/heart.gif";
import laughgif from "../../assets/images/laugh.gif";
import mindblowngif from "../../assets/images/mindblown.gif";
import blankFace from "../../assets/images/blank-face.gif";
import tick from "../../assets/images/tick.gif";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import { endpoint, config, imgConfig, checkVideo } from "../../endpoint";
import axios from "axios";
import bg from "../../assets/images/bg.mp4";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { motion } from "framer-motion";
import loaderW from "../../assets/images/loader-white.gif";
import loaderP from "../../assets/images/loader-color.gif";
import nodata from "../../assets/images/nofeed.gif";
import { useHistory } from "react-router-dom";
import { memo } from "react";
import feed_loader from "../../assets/images/feed_load.gif";

import OthersPost from "../../components/main/newsfeed/OthersPost";
import { useMemo } from "react";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    left: 30,
    backgroundColor: "#fff",
    color: "#44b700",
    boxShadow: `0 0 0 5px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      content: '""',
    },
  },
}));
const StyledBadge1 = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 10,
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      right: 10,
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

var token = window.localStorage.getItem("token");

function NewsFeed({ mob, logUser, tab, authToken }) {
  const [uploadGallery, setUploadGallery] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [report, setReport] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reportAlert, setReportAlert] = useState(false);
  const [reportIndex, setReportIndex] = useState(null);
  const [thoughts, setThoughts] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [page, setPage] = useState(0);

  const dispatch = useDispatch();
  const history = useHistory();

  const [refresh, setRefresh] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [dumData, setDumData] = useState([]);
  const [shareData, setShareData] = useState([]);
  const [emote, setEmote] = useState(false);
  // const [userData, setUserData] = useState([]);
  const [addVideo, setAddVideo] = useState(false);

  // const CancelToken = axios.CancelToken;
  // const cancelSource = CancelToken.source();

  // useEffect(() => {
  //   axios
  //     .get(`${endpoint}/me`, config)
  //     .then((res) => {
  //       console.log("Me!!");
  //       console.log(res.data.data);
  //       setLogUser(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log("Me!!");
  //       console.log(err);
  //     });
  // }, [refresh]);

  // useEffect(() => {
  //   axios
  //     .get(`${endpoint}/conversations`, config)
  //     .then((res) => {
  //       console.log("convo", res.data.data);
  //       setConvoList(res.data.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, [refreshChat]);
  useEffect(() => {
    axios
      .get(`${endpoint}/conversations`, config)
      .then((res) => {
        console.log(res.data.data);
        setShareData(res.data.data);
      })
      .catch((err) => {
        // console.log("7.get comment api!!!!");
        console.log(err);
      });
  }, [authToken]);

  // const cancelSource = axios.CancelToken.source();

  // const fetchNewsFeed = () => {

  // let cancelToken;

  // if (typeof cancelToken != typeof undefined) {
  //   cancelToken.cancel("Cancelling the previous req :)");
  //   console.log("Cancelling the previous req :)");
  // }

  // cancelToken = axios.CancelToken.source();

  // axios
  //   .get(`${endpoint}/news_feed?page=${page}&limit=7`, config, {
  //     cancelToken: cancelToken.token,
  //   })
  //   .then((res) => {
  //     console.log("1.Newsfeed get!!!!");
  //     console.log(res.data.data);
  //     setDumData([...dumData, ...res.data.data.slice(0).reverse()]);
  //     setLoading(false);
  //     if (res.data.data.length == 0) setIsMore(true);
  //     else setIsMore(false);
  //   })
  //   .catch((err) => {
  //     if (axios.isCancel(err)) {
  //       console.log("Request canceled", err.message);
  //     } else {
  //       console.log("1.Newsfeed get!!!!");
  //       console.log(err);
  //     }
  //   });

  // const setFeedData = useMemo(
  //   (res) =>
  //     // setSomeState(current => !current),
  //     setDumData([...dumData, ...res.data.data.slice(0).reverse()])[page] // to append data when page changes
  // );

  useEffect(() => {
    console.log(dumData);
  }, [dumData]);

  // console.log("feeeeeeeed");

  useEffect(() => {
    // newsfeed get api
    axios
      .get(`${endpoint}/news_feed?page=${page}&limit=7`, config)
      .then((res) => {
        // console.log("feed", res.data.data);
        // setFeedData(res);
        setDumData([...dumData, ...res.data.data.slice(0).reverse()]); // to append data when page changes
        setLoading(false);
        res.data.data.length < 7 ? setIsMore(false) : setIsMore(true);
      })
      .catch((err) => {
        console.log("feed", err);
      });
  }, [page]);

  // useEffect(() => {
  //   if (dumData.length < 7) {
  //     console.log("emote change");
  //   } else {
  //     let len = dumData.length / 7;
  //     for (let i = 1; i <= len; i++) {
  //       console.log("emote change");
  //       // newsfeed get api
  //       axios
  //         .get(`${endpoint}/news_feed?page=${page}&limit=7`, config)
  //         .then((res) => {
  //           // console.log("feed", res.data.data);
  //           // setFeedData(res);
  //           i == 1
  //             ? setDumData(res.data.data.slice(0).reverse()) // to append data when page changes
  //             : setDumData([...dumData, ...res.data.data.slice(0).reverse()]); // to append data when page changes
  //           setLoading(false);
  //           res.data.data.length < 7 ? setIsMore(false) : setIsMore(true);
  //         })
  //         .catch((err) => {
  //           console.log("feed", err);
  //         });
  //     }
  //   }
  // }, [emote]);

  // fetchNewsFeed();

  // }, [emote]);

  // }
  // useEffect(() => console.log("selectedUser", selectedUser),[selectedUser]);

  const handleTextSubmit = () => {
    // if (dispatchData.ad != "") {
    // dispatch(uploadFeed(dispatchData));

    let data = [];
    data = {
      text: thoughts,
    };
    console.log(data);
    axios
      .post(`${endpoint}/post`, { data }, config)
      .then((res) => {
        console.log("create", res.data);
        setPostSuccess(true);
        setUploadGallery(false);
      })
      .catch((err) => {
        console.log("create", err);
      });
    setThoughts("");
  };

  const { postimg, userpostimg, usercaptions, poststatus, hashTrend } =
    useSelector((state) => state.newsfeed);
  const { loggedIn, user, username, avatar } = useSelector(
    (state) => state.user
  );

  function UploadFeed({ thoughts }) {
    const [postFile, setPostFile] = useState(null);
    const [alert, setAlert] = useState(false);
    const [videoFile, setVideoFile] = useState(false);
    const [imgLoad, setImgLoad] = useState(false);
    const [videoFormat, setVideoFormat] = useState(null);
    const [error, setError] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [dispatchData, setDispatchData] = useState({
      ad: "",
      caption: thoughts ? thoughts : "",
    });

    const [postResult, setPostResult] = useState(null);

    useEffect(() => {
      postResult && console.log(postResult);
    }, [postResult]);

    const handleSubmit = () => {
      // if (dispatchData.ad != "") {
      setThoughts("");
      // dispatch(uploadFeed(dispatchData));

      let data = [];

      if (dispatchData.caption || thoughts) {
        if (postResult) {
          data = {
            text: dispatchData.caption ? dispatchData.caption : thoughts,
            attachment_id: postResult.id,
          };
        } else {
          data = {
            text: dispatchData.caption ? dispatchData.caption : thoughts,
          };
        }
      } else {
        data = {
          attachment_id: postResult.id,
        };
      }
      console.log(data);
      // create api
      axios
        .post(`${endpoint}/post`, { data }, config)
        .then((res) => {
          console.log("9.create api!!!!");
          console.log(res.data);
          setPostSuccess(true);
          setUploadGallery(false);
        })
        .catch((err) => {
          console.log("9.create api!!!!");
          console.log(err);
        });
      console.log(data);
      // } else {
      //   setAlert(true);
      // }
    };

    const handleImageChange = (e) => {
      setImgLoad(true);
      // setError(false);
      // setDispatchData({
      //   ...dispatchData,
      //   ad: URL.createObjectURL(e.target.files[0]),
      // });
      const selected = e.target.files[0].type;
      setVideoFile(checkVideo.includes(selected));
      checkVideo.includes(selected) && setVideoFormat(selected);

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      var formdata = new FormData();
      formdata.append("content", e.target.files[0], postFile);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch(`${endpoint}/content`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setPostResult(result.data);
          setImgLoad(false);
        })
        .catch((error) => {
          console.log(error);
          // if (error.response) {
          //   console.log(error.response.data);
          //   console.log(error.response);
          //   console.log(error.response.headers);
          // }
          // console.log(JSON.parse(error));
          // console.warn(xhr.responseText);
          // console.warn(jqxhr.responseText);
        });
    };

    return (
      <>
        <div className="mx-2 mx-lg-0 mb-5 mt-5 pt-3 d-flex flex-column align-justify-center">
          <div className="col-12 col-md-11 col-xl-9 position-relative">
            <div
              className="col-12  d-flex flex-column justify-content-start position-relative li-shadow"
              style={{
                background: postResult
                  ? `url("${postResult.url}")no-repeat center/cover`
                  : "#e4e4e4",
                borderRadius: "25px",
                height: mob ? 275 : 325,
                zIndex: 0,
              }}
            >
              {postResult && videoFile && (
                <video
                  className="position-absolute w-100"
                  width="100%"
                  height="100%"
                  id="video"
                  autoPlay="autoplay"
                  // muted
                  loop
                  style={{ borderRadius: 25 }}
                >
                  <source
                    src={postResult ? postResult.url : ""}
                    type={videoFormat}
                  />
                  {/* <source src={postFile} type={videoFormat} /> */}
                  Your browser does not support the video tag.
                </video>
              )}

              <div className="user-div px-2 px-sm-4 px-2 pe-2 d-flex align-items-end justify-content-between ">
                <div className="ps-1 mb-3 pb-1 mb-sm-0 pb-sm-0 d-flex align-items-center justify-content-start">
                  {/* <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  > */}
                  <Avatar
                    className="bg-linearlr"
                    alt={logUser.username}
                    src={logUser.profile_pic.public_url}
                    style={{
                      boxShadow: "0px 5px 10px black",
                      transform: "scale(1.2)",
                      width: 50,
                      height: 50,
                    }}
                  />
                  {/* </StyledBadge> */}
                  <div className="d-flex flex-column flex-sm-row justify-content-end align-items-start ms-3 pe-1 pe-sm-2 mb-sm-3 mt-0 ">
                    <div
                      className="fw-bold pe-sm-2 purple"
                      style={{ fontSize: 18 }}
                    >
                      {logUser.username}
                    </div>
                    {/* <div className="fw-bold grey">
                      @{username ? username : "username"}
                    </div> */}
                  </div>
                </div>
                <div>
                  {postResult && (
                    <label for="gallery">
                      <EditIcon
                        className="cursor-pointer mb-3 mb-sm-2 purple pb-1 me-2"
                        style={{
                          fontSize: "25px",
                          color: "#a11cf9",
                          filter: " drop-shadow(0px 0px 5px #0000005e)",
                        }}
                      />
                    </label>
                  )}
                  <DeleteIcon
                    className="cursor-pointer mb-3 mb-sm-2 purple pb-1"
                    style={{
                      fontSize: "30px",
                      filter: " drop-shadow(0px 0px 5px #0000005e)",
                    }}
                    onClick={() => {
                      setUploadGallery(false);
                      setAddVideo(false);
                      setDispatchData({ ...dispatchData, ad: "", caption: "" });
                    }}
                  />
                </div>
              </div>
              <div className="d-flex h-100 justify-content-center align-items-center">
                <input
                  id="gallery"
                  type="file"
                  className="d-none"
                  accept={addVideo ? "video/*" : "image/*"}
                  onChange={(e) => {
                    setPostFile(URL.createObjectURL(e.target.files[0]));
                    handleImageChange(e);
                  }}
                />
                {!postResult &&
                  (imgLoad ? (
                    <div className="col-12 d-flex justify-content-center align-items-center">
                      <img
                        className=""
                        src={loaderP}
                        width="10%"
                        height="10%"
                      />
                    </div>
                  ) : (
                    <div className="d-flex justify-content-center">
                      <label
                        for="gallery"
                        className={`bg-linearlr li-shadow rounded-circle mt-2 mt-md-5 ${
                          mob ? "mb-3" : "mb-5"
                        }`}
                      >
                        <AddIcon
                          className="test-white cursor-pointer mb-0"
                          style={{
                            fontSize: mob ? 50 : 60,
                            filter: " drop-shadow(0px 0px 5px #0000005e)",
                          }}
                        />
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="col-9 d-flex flex-column align-justify-center">
            {toggle ? (
              <div className="d-flex flex-column col-12">
                <div
                  className="px-3 text-white col-12 "
                  style={{
                    fontSize: "12px",
                    // backgroundColor: "#A9A9A9",
                    color: "white",
                  }}
                >
                  <textarea
                    className="bg-linearlr li-shadow rounded col-12 border-0 no-out pt-1 px-2 change"
                    placeHolder="Type something..."
                    value={dispatchData.caption}
                    onChange={(e) => {
                      setDispatchData({
                        ...dispatchData,
                        caption: e.target.value,
                      });
                    }}
                  />
                  <div className="text-center col-12  cursor-pointer purple ">
                    <KeyboardArrowUpIcon onClick={() => setToggle(false)} />
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
                  onClick={() => setToggle(true)}
                />
              </div>
            )}
          </div>
          <div className="my-2 col-12 col-md-10 col-xl-9 mx-auto">
            {alert && (
              <Alert severity="error">Your Post Image is not added!</Alert>
            )}
            <div className="col-12 d-flex justify-content-end mt-2">
              <div
                className={`${
                  postResult
                    ? "cursor-pointer bg-linearlr li-shadow"
                    : "text-dark bg-hash cursor-disable"
                } mb-4 me-xl-3 py-1 px-3 rounded`}
                onClick={() => {
                  postResult && handleSubmit();
                }}
              >
                Post
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  setTimeout(() => {
    setPostSuccess(false);
  }, 2000);

  return (
    <div className="p-md-2 w-100">
      <div className="d-flex justify-content-between align-items-start row my-2 p-2">
        <div className="w-100 d-flex flex-column justify-content-center align-items-center mb-2">
          <div className="col-12 col-xl-11 upload-div mb-3 px-2 px-xl-0 mx-auto">
            <div
              className="col-12 col-md-11 col-xl-9 mx-auto bg-linearlr p-3 text-center inner-shadow mt-3"
              style={{
                borderRadius: "20px 20px 0px 0px",
                // boxShadow: "0px 5px 10px #0000008f",
              }}
            >
              <motion.div
                initial={{ x: 30 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
                className="fw-bold text-white col-11 pb-1 mx-auto d-flex justify-content-start"
              >
                <span className="me-auto ">Post Something</span>
              </motion.div>
              {/* <div className="text-center"> */}
              <motion.textarea
                rows={1}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                type="text"
                style={{
                  boxShadow: "0px 5px 10px #0000005e",
                }}
                className="bg-white border-0 col-11 py-1 px-3 rounded mx-auto no-out"
                value={thoughts}
                onChange={(e) => setThoughts(e.target.value)}
              ></motion.textarea>
              {/* </div> */}
            </div>
            <div
              className="col-12 col-md-10 col-xl-8 p-2 d-flex align-items-center justify-content-between mb-2 mx-auto"
              style={{
                borderRadius: "0px 0px 10px 10px",
                backgroundColor: "#fff",
                boxShadow: "0px 5px 10px #0000002e",
                // boxShadow:"-10px -10px 30px #000"
              }}
            >
              <div className={`${mob ? "col-4" : "col-5"} d-flex`}>
                <div
                  className=" styled-button learn-more col-6"
                  onClick={() => {
                    setUploadGallery(true);
                    setPostSuccess(false);
                    setAddVideo(false);
                  }}
                >
                  <span className="circle" aria-hidden="true">
                    <CameraAltIcon
                      className="icon arrow"
                      style={{
                        fontSize: 25,
                      }}
                    />
                  </span>
                  {!mob && <span className="button-text">Image</span>}
                </div>
                <div
                  className=" styled-button learn-more col-6"
                  onClick={() => {
                    setUploadGallery(true);
                    setPostSuccess(false);
                    setAddVideo(true);
                  }}
                >
                  <span className="circle" aria-hidden="true">
                    <VideoCameraBackIcon
                      className="icon arrow"
                      style={{
                        fontSize: 25,
                      }}
                    />
                  </span>
                  {!mob && <span className="button-text">Video</span>}
                </div>
              </div>
              <div>
                {thoughts ? (
                  <>
                    <Button
                      variant="contained"
                      className="bg-white cursor-pointer fw-bold purple mx-3 py-1 px-3 rounded"
                      sx={{ textTransform: "initial" }}
                      onClick={() => setThoughts("")}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      className="bg-linearlr cursor-pointer fw-bold mx-3 py-1 px-3 rounded"
                      sx={{ textTransform: "initial" }}
                      onClick={() => {
                        // const myPost = {
                        //   dp: avatar,
                        //   name: user,
                        //   post: null,
                        //   username: username ? username : "userKnown",
                        //   postDate: "today's date",
                        //   caption: thoughts,
                        //   reactions: "0",
                        //   comments: [],
                        // };
                        // dumData.unshift(myPost);
                        // console.log(dumData);
                        // setPostSuccess(true);
                        // setUploadGallery(false);
                        // dispatch(uploadFeed({ ad: null, caption: thoughts }));
                        // setThoughts("");
                        handleTextSubmit();
                      }}
                    >
                      Post
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    className="bg-white cursor-disable fw-bold purple mx-3 py-1 px-3 rounded"
                    sx={{ textTransform: "initial" }}
                  >
                    Post
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 2 }}
        transition={{ duration: 0.5 }}
        className="mt-2 mb-2 col-11 mx-auto"
        style={{ borderTop: "2px solid #7201c8" }}
      >
        <p
          className={`fw-bold bg-linearlr ${
            mob ? "col-5" : "col-2"
          } mx-auto text-center p-2 mt-0`}
          style={{
            borderRadius: "0px 0px 10px 10px",
            boxShadow: "0px 5px 10px #7d7d7d",
          }}
        >
          MEMOIR
        </p>
      </motion.div>
      {postSuccess && (
        <div className="d-flex flex-column align-justify-center col-12 ">
          <img className="finish-gif" src={tick} />
          {/* 
          <CheckIcon
            className="mx-auto p-2 rounded-circle text-white fw-bold bg-linearbt"
            style={{
              fontSize: mob ? "60px" : "80px",
            }}
          />
          <div className="mx-auto mt-2 align-justify-center purple fw-bold mb-3">
            Finished your process
          </div> */}
        </div>
      )}
      {uploadGallery && <UploadFeed thoughts={thoughts} />}
      <OthersPost
        mob={mob}
        page={page}
        setPage={setPage}
        logUser={logUser}
        dumData={dumData}
        loading={loading}
        // fetchFeed={fetchFeed}
        tab={tab}
        setDumData={setDumData}
        isMore={isMore}
        emote={emote}
        setEmote={setEmote}
        shareData={shareData}
        setShareData={setShareData}
        uploadGallery={uploadGallery}
        postSuccess={postSuccess}
      />
      {/* <div className="d-none d-sm-block">
        <Suggestions lap={true} />
      </div>
      <div className="d-block d-sm-none">
        <Suggestions lap={false} />
      </div> */}
    </div>
  );
}

// function Welcome() {
//   const [loader, setLoader] = useState(true);
//   setTimeout(() => {
//     setLoader(false);
//   }, [1800]);
//   return (
//     <div>
//       {loader ? (
//         <div className="vh-100 col-12 bg-white d-flex flex-column align-justify-center">
//           <img src={feed_loader} width="40%" className="rounded-circle" />
//           <div
//             // initial={{ opacity: 0 }}
//             // animate={{ opacity: 1 }}
//             // transition={{ type: "spring", stiffness: 60, duration: 0.5 }}
//             className="h4 fw-600 purple text-uppercase"
//           >
//             Memoir
//           </div>
//         </div>
//       ) : (
//         <NewsFeed />
//       )}
//     </div>
//   );
// }

export default memo(NewsFeed);
