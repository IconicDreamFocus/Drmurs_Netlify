import React, { useState, useEffect } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Avatar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddIcon from "@mui/icons-material/Add";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import axios from "axios";
import {
  endpoint,
  config,
  token,
  checkVideo,
  formatStoryDate,
  ModalAnimation,
} from "../../../endpoint";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import { addStory } from "../../../slices/newsfeedSlice";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import HorizontalScroll from "react-scroll-horizontal";
import whiteTick from "../../../assets/images/whiteTick.mov";
import loaderW from "../../../assets/images/loader-white.gif";
import loaderP from "../../../assets/images/loader-color.gif";
import nodata from "../../../assets/images/nodairy.gif";
import storyDone from "../../../assets/images/storyDone.gif";
import { AnimatePresence, motion } from "framer-motion";

const style = {
  watched: {
    border: "3px solid #7201c8",
    boxShadow: "0px 0px 6px white",
  },
  unWatched: {
    border: "3px solid #7201c8",
    // boxShadow: "0px 0px 6px black",
  },
};

const StyledPlusBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#7201c8",
    color: "#ffffff",
    fontSize: "15px",
    fontweight: "bold",
  },
}));

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

const imgSlider = {
  slider: {
    height: "85vh",
    // backgroundColor: "#7201c8",
  },

  rightArrow: {
    fontSize: "4rem",
    color: "#ffffff",
    cursor: "pointer",
    userSelect: "none",
  },

  leftArrow: {
    fontSize: "4rem",
    color: "#ffffff",
    cursor: "pointer",
    userSelect: "none",
  },
};

// create story api
// axios
//   .post(
//     `${endpoint}/story`,
//     {
//       text: "fhgfhf",
//       attachment_id: "61b747b32f93f7ca9bc178e2",
//     },
//     config
//   )
//   .then((res) => {
//     data = res.data;
//     console.log("res.data");
//     console.log(res.data);
//   })
//   .catch((err) => console.log(err));

export default function Story({
  mob,
  mainData,
  myStory,
  logUser,
  refreshstr,
  setRefreshstr,
  full,
}) {
  const { loggedIn, user, username, avatar } = useSelector(
    (state) => state.user
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isLoad, setIsLoad] = useState(true);
  const [mine, setMine] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [myModal, setMyModal] = useState(false);
  const [uploadStory, setUploadStory] = useState(false);
  const [indexValue, setIndexValue] = useState(null);
  const [myIndex, setMyIndex] = useState(null);
  const [current, setCurrent] = useState(0);

  const handleOpen = () => {
    setModalOpen(true);
    console.log(modalOpen);
  };
  const handleClose = () => {
    setModalOpen(false);
    setIndexValue(null);
    setCurrent(0);
  };
  const myModalClose = () => {
    setMyModal(false);
    setMyIndex(null);
  };
  console.log("story");

  // useEffect(() => {}, []);

  const dispatch = useDispatch();

  const ImageSlider = ({ slides }) => {
    const length = slides.length;
    console.log(indexValue);
    const checkImg = ["image/jpeg", "image/png", "image/gif"];

    // useEffect(() => {
    //   setTimeout(() => {
    //     console.log(current, length - 1, indexValue, mainData.length - 1);
    //     current === length - 1
    //       ? // indexValue != mainData.length - 1
    //         // ?
    //         setIndexValue((prevState) =>
    //           indexValue == mainData.length - 1 ? prevState : prevState + 1
    //         )
    //       : // : setModalOpen(false)
    //         setCurrent((prevState) => prevState + 1);
    //   }, 7000);
    // }, [current]);

    let timer = setTimeout(
      () => {
        nextSlide();
        console.log("next sssssssssssslidddddddddeeeeeeeee!");
      },
      checkVideo.includes(slides[current].attachment.mimetype) ? 30000 : 7000
    );
    useEffect(() => {
      console.log(timer);
      window.clearTimeout(timer, () => console.log("cleared"));
      timer = setTimeout(
        () => {
          nextSlide();
          console.log("next slide!");
        },
        checkVideo.includes(slides[current].attachment.mimetype) ? 30000 : 7000
      );
    }, [current, indexValue]);

    useEffect(() => {
      console.log("currrent:" + current);
    }, [current]);

    const nextSlide = () => {
      if (current >= length - 1 && indexValue == mainData.length - 1) {
        setModalOpen(false);
        return;
      }
      current >= length - 1
        ? setIndexValue((prevState) =>
            indexValue == mainData.length - 1 ? prevState : indexValue + 1
          )
        : setCurrent((prevState) => prevState + 1);
      // clearTimeout(timer);
      // runTimer();
    };
    // current >= length
    //   ? indexValue == mainData.length - 1
    //     ? setModalOpen(false)
    //     : nextSlide()
    //   : nextSlide();

    const prevSlide = () => {
      current === 0
        ? setIndexValue((prevState) => prevState - 1)
        : setCurrent((prevState) => prevState - 1);
      // clearTimeout(timer);
      // runTimer();
    };
    console.log(current);
    console.log(slides);
    return (
      <>
        <div
          className=" mx-auto my-4 col-8 overflow-hidden d-flex"
          style={{ borderRadius: 10 }}
        >
          {slides.map((a, ii) => (
            <div
              className="w-100 bg-purple li-shadow overflow-hidden"
              style={{ borderRadius: 10 }}
            >
              {ii == current && (
                <motion.div
                  className="py-1 bg-white w-100 li-shadow"
                  style={{ borderRadius: 10 }}
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{
                    duration: checkVideo.includes(a.attachment.mimetype)
                      ? 30
                      : 7,
                  }}
                ></motion.div>
              )}
              {ii < current && (
                <div
                  className="py-1 bg-white w-100"
                  style={{ borderRadius: 10 }}
                ></div>
              )}
            </div>
          ))}
        </div>
        <section
          className="slider d-flex align-items-center justify-content-center overflow-hidden"
          style={imgSlider.slider}
        >
          {!(indexValue == 0 && current == 0) && (
            <KeyboardArrowLeft
              className="p-1 cursor-pointer"
              style={imgSlider.rightArrow}
              onClick={prevSlide}
            />
          )}
          {slides.map((slide, index) => {
            // console.log(slide);
            return (
              <div
                className="text-center overflow-hidden rounded-3"
                style={
                  index === current ? imgSlider.slideActive : imgSlider.slider
                }
                key={index}
              >
                {index === current &&
                  checkVideo.includes(slide.attachment.mimetype) && (
                    <>
                      <video
                        autoplay="true"
                        loop
                        height="50%"
                        width="100%"
                        src={slide.attachment.public_url}
                      />
                      <div className="text-white my-2">{slide.text}</div>
                    </>
                  )}
                {index === current &&
                  checkImg.includes(slide.attachment.mimetype) && (
                    <>
                      <img
                        src={slide.attachment.public_url}
                        alt="travel image"
                        // height="50%"
                        width="70%"
                        className="bg-danger"
                      />
                      <div className="text-white my-2">{slide.text}</div>
                    </>
                  )}
              </div>
            );
          })}
          {!(
            indexValue == mainData.length - 1 && slides.length - 1 == current
          ) && (
            <KeyboardArrowRight
              className="p-1 cursor-pointer"
              style={imgSlider.leftArrow}
              onClick={nextSlide}
            />
          )}
        </section>
      </>
    );
  };
  const ModalBody = ({ index }) => {
    console.log(index);
    const user = mainData[index];
    console.log(user);
    return (
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="d-flex justify-content-center"
        // sx={{ backgroundColor: "#a11cf9 !important" }}
      >
        <Box
          component={motion.div}
          {...ModalAnimation}
          className="no-out"
          sx={{
            background: "linear-gradient(to top, #a11cf9,#7201c8) !important",
            position: "absolute",
            // top: "50%",
            // left: "50%",
            // transform: "translate(-50%, -50%)",
            width: "100vw",
            height: "100vh",
            // bgcolor: "background.paper",
            // border: "3px solid #ffffff",
            boxShadow: 24,
            px: 4,
            // py: 2,
          }}
        >
          <div
            className="d-flex align-items-start justify-content-between p-0 mb-2 col-12"
            // style={{ borderBottom: "2px solid white" }}
          >
            <div className="d-flex align-items-center mt-3">
              <Avatar
                alt={user.user.username}
                src={
                  user.user.profile_pic ? user.user.profile_pic.public_url : ""
                }
                sx={{
                  width: "50px",
                  height: "50px",
                  border: !full && "3px solid white",
                  boxShadow: "0px 0px 10px black",
                }}
              />
              &nbsp;&nbsp;
              <div className="text-white h4">{user.user.username}</div>
              <div className="text-white ms-2 ">
                {formatStoryDate(user.stories[current].created_at)}
              </div>
            </div>
            <div
              className="cursor-pointer bg-white purple li-shadow p-2"
              style={{ borderRadius: "0px 0px 10px 10px" }}
            >
              <CloseIcon
                onClick={handleClose}
                className=""
                style={{ fontSize: "2rem" }}
              />
            </div>
          </div>

          <ImageSlider slides={user.stories} />
        </Box>
      </Modal>
    );
  };

  const MyModalBody = ({ index }) => {
    console.log(index);
    // const user = mainData[index];
    // console.log(user);
    return (
      <Modal
        open={myModal}
        onClose={myModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="d-flex justify-content-center"
        // sx={{ backgroundColor: "#a11cf9 !important" }}
      >
        <Box
          component={motion.div}
          {...ModalAnimation}
          // classname="bg-primary"
          sx={{
            background: "linear-gradient(to top, #a11cf9,#7201c8) !important",
            position: "absolute",
            // top: "50%",
            // left: "50%",
            // transform: "translate(-50%, -50%)",
            width: "100vw",
            height: "100vh",
            // bgcolor: "background.paper",
            border: "3px solid #ffffff",
            boxShadow: 24,
            px: 4,
            // py: 2,
          }}
        >
          <div
            className="d-flex align-items-start justify-content-between px-2  mb-4"
            // style={{ borderBottom: "2px solid white" }}
          >
            <div className="d-flex align-items-center mt-3">
              <Avatar
                alt={logUser.username}
                src={logUser.profile_pic ? logUser.profile_pic.public_url : ""}
                sx={{
                  width: "50px",
                  height: "50px",
                  border: !full && "3px solid white",
                  boxShadow: "0px 0px 10px black",
                }}
              />
              &nbsp;&nbsp;
              <div className="text-white h4">{logUser.username}</div>
              <div className="text-white ms-2 ">
                {formatStoryDate(myStory[myIndex].created_at)}
              </div>
            </div>
            <div
              className="bg-white p-2 li-shadow"
              style={{ borderRadius: "0 0 10px 10px" }}
            >
              <CloseIcon
                onClick={myModalClose}
                className="purple cursor-pointer"
                style={{ fontSize: "2rem" }}
              />
            </div>
          </div>

          <MyImageSlider slides={myStory[myIndex]} />
        </Box>
      </Modal>
    );
  };
  const MyImageSlider = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;
    console.log(indexValue);

    const checkImg = ["image/jpeg", "image/png", "image/gif"];

    // useEffect(() => {
    //   setTimeout(() => {
    //     console.log(current, length - 1, indexValue, mainData.length - 1);
    //     current === length - 1
    //       ? // indexValue != mainData.length - 1
    //         // ?
    //         setIndexValue((prevState) =>
    //           indexValue == mainData.length - 1 ? prevState : prevState + 1
    //         )
    //       : // : setModalOpen(false)
    //         setCurrent((prevState) => prevState + 1);
    //   }, 7000);
    // }, [current]);

    // let timer;
    // const runTimer = () => {
    //   timer = setTimeout(
    //     () => {
    //       nextSlide();
    //       console.log("next sssssssssssslidddddddddeeeeeeeee!");
    //     },
    //     checkVideo.includes(slides.attachment.mimetype) ? 30000 : 7000
    //   );
    // };
    // useEffect(() => {
    //   clearTimeout(timer);
    //   runTimer(current);
    // }, [current, indexValue]);

    useEffect(() => {
      console.log("currrent:" + current);
    }, [current]);

    const nextSlide = () => {
      if (current >= length - 1 && indexValue == mainData.length - 1) {
        setModalOpen(false);
        return;
      }
      current >= length - 1
        ? setIndexValue((prevState) =>
            indexValue == mainData.length - 1 ? prevState : indexValue + 1
          )
        : setCurrent((prevState) => prevState + 1);
      // clearTimeout(timer);
      // runTimer();
    };
    // current >= length
    //   ? indexValue == mainData.length - 1
    //     ? setModalOpen(false)
    //     : nextSlide()
    //   : nextSlide();

    const prevSlide = () => {
      current === 0
        ? setIndexValue((prevState) => prevState - 1)
        : setCurrent((prevState) => prevState - 1);
      // clearTimeout(timer);
      // runTimer();
    };
    console.log(current);
    console.log(slides);
    return (
      <>
        {/* <div
          className=" mx-auto my-4 col-8 overflow-hidden d-flex p-2 bg-dark"
          style={{ borderRadius: 10 }}
        >
           {slides.map((a, ii) => (
            <div
              className="w-100 bg-white shadow overflow-hidden"
              style={{ borderRadius: 10 }}
            >
              {ii == current && (
                <motion.div
                  className="py-1 bg-purple w-100"
                  style={{ borderRadius: 10 }}
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{
                    duration: checkVideo.includes(a.attachment.mimetype)
                      ? 30
                      : 7,
                  }}
                ></motion.div>
              )}
              {ii < current && (
                <div
                  className="py-1 bg-purple w-100"
                  style={{ borderRadius: 10 }}
                ></div>
              )}
            </div>
          ))} 
        </div> */}
        <section
          className="d-flex align-justify-center overflow-hidden"
          // style={imgSlider.slider}
        >
          {/* {!(indexValue == 0 && current == 0) && (
            <KeyboardArrowLeft
              className="p-1 cursor-pointer"
              style={imgSlider.rightArrow}
              onClick={prevSlide}
            />
          )} */}
          {/* {slides.map((slide, index) => { */}
          {/* // console.log(slide); return ( */}
          <div
            className="text-center overflow-hidden rounded-3"
            // style={index === current ? imgSlider.slideActive : imgSlider.slider}
            // key={index}
          >
            {checkVideo.includes(slides.attachment.mimetype) ? (
              <>
                <div
                  style={{
                    width: "96vw",
                    height: "75vh",
                  }}
                >
                  <video
                    autoplay="true"
                    loop
                    height="100%"
                    width="100%"
                    src={slides.attachment.public_url}
                  />
                </div>
                {slides.text && (
                  <div className="col-6 d-flex flex-column align-justify-center mx-auto">
                    <div
                      className="text-white bg-white br-10 li-shadow text-center purple mx-auto my-2 px-2 overflow-auto py-2 "
                      style={{ maxHeight: 80 }}
                      // className="text-white my-2"
                    >
                      {slides.text}
                    </div>
                    {/* </div> */}
                  </div>
                )}
              </>
            ) : (
              <>
                {/* <div
                  className="d-flex flex-column align-justify-center"
                  // style={{
                  //   objectFit: "scale-down",
                  //   width: "96vw",
                  //   height: "84vh",
                  // }}
                > */}
                <img
                  src={slides.attachment.public_url}
                  alt={slides.attachment.public_url}
                  // height="100%"
                  // width="100%"
                  style={{
                    objectFit: "scale-down",
                    width: "96vw",
                    height: "75vh",
                  }}
                  className=""
                />
                {slides.text && (
                  <div className="col-6 d-flex flex-column align-justify-center mx-auto">
                    <div
                      className="text-white bg-white br-10 li-shadow text-center purple mx-auto my-2 px-2 overflow-auto py-2 "
                      style={{ maxHeight: 80 }}
                    >
                      {slides.text}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          {/* ); */}
          {/* })} */}
          {/* {!(
            indexValue == mainData.length - 1 && slides.length - 1 == current
          ) && (
            <KeyboardArrowRight
              className="p-1 cursor-pointer"
              style={imgSlider.leftArrow}
              onClick={nextSlide}
            />
          )} */}
        </section>
      </>
    );
  };

  const UploadStory = () => {
    const handleStoryClose = () => setUploadStory(false);

    // const [gallery, setGallery] = useState(null);
    const [postFile, setPostFile] = useState(null);
    const [storyResult, setStoryResult] = useState(null);
    const [videoFile, setVideoFile] = useState(false);
    const [videoFormat, setVideoFormat] = useState(null);
    const [alert, setAlert] = useState(false);
    const [imgLoad, setImgLoad] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [dispatchData, setDispatchData] = useState({
      source: "",
      status: "",
      owner: user,
    });

    useEffect(() => {
      console.log(storyResult);
    }, [storyResult]);

    const handleStorySubmit = () => {
      setSuccess(false);
      if (storyResult) {
        dispatch(addStory(dispatchData));
        setTimeout(() => {
          setRefreshstr(!refreshstr);
          setUploadStory(false);
        }, 3000);

        let disData = {
          text: dispatchData.status,
        };
        console.log(disData);

        let data = {
          text: dispatchData.status,
          attachment_id: storyResult.id,
        };
        if (dispatchData.status == "" || dispatchData.status == null) {
          data = {
            attachment_id: storyResult.id,
          };
        }
        // create api
        axios
          .post(`${endpoint}/story`, { data }, config)
          .then((res) => {
            console.log("Upl sty", res.data.data);
            setSuccess(true);
          })
          .catch((err) => {
            console.log(err);
          });
        console.log(data);
      } else {
        setAlert(true);
      }
    };

    const handleStoryImageChange = (e) => {
      setImgLoad(true);
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
          setStoryResult(result.data);
          setImgLoad(false);
        })
        .catch((error) => console.log(error));
    };

    return (
      <Modal
        open={uploadStory}
        onClose={handleStoryClose}
        className="d-flex justify-content-center align-items-center"
      >
        <Box
          component={motion.div}
          {...ModalAnimation}
          className="no-out"
          sx={{
            background: "linear-gradient(to top, #a11cf9,#7201c8) !important",
            // position: "absolute",
            // top: "50%",
            // left: "50%",
            // transform: "translate(-50%, -50%)",
            minWidth: full ? "100vw" : "80vw",
            minHeight: full ? "50vh" : "70vh",
            // bgcolor: "background.paper",
            // border: "3px solid #ffffff",
            boxShadow: 24,
            borderRadius: 5,
            px: mob ? 1 : 4,
            // py: 2,
          }}
        >
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div
              className="text-white h4 my-auto bg-white p-3 purple ms-2 fw-600 li-shadow"
              style={{ borderRadius: " 0px 0px 10px 10px" }}
            >
              Upload your Story
            </div>
            <div
              className="bg-white p-3 purple li-shadow"
              style={{ borderRadius: " 0px 0px 10px 10px" }}
            >
              <CloseIcon
                onClick={() => {
                  setUploadStory(false);
                  setSuccess(false);
                }}
                className="cursor-pointer"
                style={{ fontSize: "1.5rem", fontWeight: 700 }}
              />
            </div>
          </div>
          {success ? (
            <div className="d-flex align-justify-center">
              <img
                src={storyDone}
                width={full ? "80%" : "40%"}
                className="rounded-circle mx-auto mt-3 mt-md-0"
                // type="mov"
                // // muted="muted"
                // autoPlay="true"
                // loop
              />
            </div>
          ) : (
            <div className="col-12 col-md-11 col-xl-9 mx-auto mb-5 mt-5 pt-3 d-flex flex-column align-justify-center pt-5 pt-md-0">
              <div className="col-12 mt-3">
                <div
                  className="col-12  d-flex flex-column justify-content-start li-shadow position-relative li-shadow"
                  style={{
                    background: storyResult
                      ? `url("${storyResult.url}")no-repeat center/cover`
                      : "#fff",
                    borderRadius: "25px",
                    height: full ? 300 : 425,
                  }}
                >
                  {storyResult && videoFile && (
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
                        src={storyResult ? storyResult.url : ""}
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
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
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
                          className="fw-bold text-white pe-sm-2"
                          style={{ fontSize: 17 }}
                        >
                          {logUser.username}
                        </div>
                        {/* <div
                        className="fw-bold text-white"
                        style={{ fontSize: 12 }}
                      >
                        @{username ? username : "username"}
                      </div> */}
                      </div>
                    </div>
                    <div>
                      {storyResult && (
                        <label for="gallery">
                          <EditIcon
                            className="cursor-pointer mb-3 mb-sm-2 text-white pb-1 me-2"
                            style={{
                              fontSize: "25px",
                              filter: " drop-shadow(0px 0px 5px #0000005e)",
                            }}
                          />
                        </label>
                      )}
                      <DeleteIcon
                        className="cursor-pointer mb-3 mb-sm-2 text-white pb-1"
                        style={{
                          fontSize: "30px",
                          filter: " drop-shadow(0px 0px 5px #0000005e)",
                        }}
                        onClick={() => {
                          setUploadStory(false);
                          setDispatchData({
                            ...dispatchData,
                            source: "",
                            status: "",
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="d-flex h-100 justify-content-center align-items-center">
                    <input
                      id="gallery"
                      type="file"
                      className="d-none"
                      onChange={(e) => {
                        setPostFile(URL.createObjectURL(e.target.files[0]));
                        handleStoryImageChange(e);
                      }}
                    />
                    {error && (
                      <p className="text-danger m-4">
                        File format isn't supported
                      </p>
                    )}
                    {!storyResult &&
                      (imgLoad ? (
                        <div className="col-12 d-flex justify-content-center">
                          <img
                            className=""
                            src={loaderP}
                            width="10%"
                            height="10%"
                          />
                        </div>
                      ) : (
                        <div className="d-flex h-100 align-items-center justify-content-center">
                          <label
                            for="gallery"
                            className={`bg-linearlr li-shadow rounded-circle  mt-5 ${
                              mob ? "mb-3" : "mb-5"
                            }`}
                          >
                            <AddIcon
                              className="test-white cursor-pointer "
                              style={{
                                fontSize: 60,
                                filter: " drop-shadow(0px 0px 5px #0000005e)",
                              }}
                            />
                          </label>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="col-11 col-md-9 d-flex flex-column align-justify-center">
                {toggle ? (
                  <div className="d-flex flex-column justify-content-end col-12">
                    <div
                      className="px-3 text-white col-12 "
                      style={{
                        fontSize: "12px",
                        // backgroundColor: "#A9A9A9",
                        color: "white",
                      }}
                    >
                      <textarea
                        className="bg-white li-shadow border border-3 border-white no-out rounded col-12  pt-1 px-2"
                        placeHolder="Type something..."
                        value={dispatchData.status}
                        onChange={(e) => {
                          setDispatchData({
                            ...dispatchData,
                            status: e.target.value,
                          });
                        }}
                      />
                      <div className="text-center col-12  cursor-pointer ">
                        <KeyboardArrowUpIcon onClick={() => setToggle(false)} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className=" purple bg-white px-2 li-shadow"
                    style={{ borderRadius: "0px 0px 5px 5px" }}
                  >
                    <KeyboardArrowDownIcon
                      style={
                        {
                          // color: "#A9A9A9",
                        }
                      }
                      className=" cursor-pointer "
                      onClick={() => setToggle(true)}
                    />
                  </div>
                )}
              </div>
              <div className="my-2 col-md-9">
                {alert && (
                  <Alert severity="error">Your Post Image is not added!</Alert>
                )}
              </div>
              <div className="d-flex justify-content-end mt-2 col-12 pe-3">
                <div
                  className={`${
                    storyResult
                      ? "purple cursor-pointer bg-white"
                      : "text-dark bg-hash cursor-disable"
                  } mb-4 me-3 py-1 px-3 rounded li-shadow`}
                  onClick={() => {
                    storyResult && handleStorySubmit();
                  }}
                >
                  Post
                </div>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    );
  };

  // window.onload = () => {
  //   const element = document.querySelector("div");
  //   console.log(element);
  //   if (element) {
  //     element.addEventListener("wheel", (event) => {
  //       event.preventDefault();

  //       element.scrollBy({
  //         left: event.deltaY < 0 ? -30 : 30,
  //       });
  //     });
  //   }
  // };
  // var slider = document.getElementsByClassName("slider");
  // // var container = document.getElementsByClassName("container");
  // var hs = new HorizontalScroll.default({
  //   slider: slider,
  // });

  return (
    <>
      <div
        className="bg-white h-100"
        // style={{ height: "90vh", marginTop: "2vh" }}
      >
        <div className="d-flex justify-content-between align-items-center py-1 pe-2">
          <div
            className="mt-2 bg-linearlr text-white fw-bold p-2 "
            style={{
              borderRadius: "0px 10px 10px 0px",
              boxShadow: "0px 0px 10px #0000005e",
            }}
          >
            My Story
          </div>

          <div
            className="bg-linearlr p-2 rounded-circle cursor-pointer li-shadow"
            onClick={() => setUploadStory(true)}
          >
            <AddIcon
              className="p-1 bg-white purple rounded-circle li-shadow"
              style={{ fontSize: 25 }}
            />
          </div>
        </div>
        {/* <HorizontalScroll> */}
        {myStory.length == 0 ? (
          <div className="m-auto purple text-center my-3">Add your story</div>
        ) : myStory.length > 3 ? (
          <HorizontalScroll
            className="col-12 mt-2 d-flex justify-content-start align-items-center slider"
            style={{ height: 90 }}
          >
            {logUser &&
              myStory.map((mine, ide) => (
                <>
                  <div
                    className="d-flex flex-column align-items-center justify-content-center mb-3"
                    style={{ width: 100 }}
                  >
                    <Avatar
                      className="li-shadow d-flex align-items-center justify-content-center cursor-pointer"
                      style={{ width: 50, height: 50 }}
                      alt={logUser.username}
                      src={
                        logUser.profile_pic
                          ? logUser.profile_pic.public_url
                          : logUser.username
                      }
                      onClick={() => {
                        setMyIndex(ide);
                        // console.log(ide);
                        setMyModal(true);
                        setMine(true);
                      }}
                    />
                    <div
                      className="purple mt-2 fw-bold text-wrap col-8 text-center"
                      style={{ fontSize: 10, height: 15 }}
                    >
                      {mine.text}
                    </div>
                  </div>
                </>
              ))}
          </HorizontalScroll>
        ) : (
          <div
            className="col-12 mt-2 d-flex justify-content-center align-items-center slider"
            style={{ height: 90 }}
          >
            {logUser &&
              myStory.map((mine, ide) => (
                <>
                  <div
                    className="d-flex flex-column align-items-center justify-content-center mb-3"
                    style={{ width: 100 }}
                  >
                    <Avatar
                      className="li-shadow d-flex align-items-center justify-content-center cursor-pointer"
                      style={{ width: 50, height: 50 }}
                      alt={logUser.username}
                      src={
                        logUser.profile_pic
                          ? logUser.profile_pic.public_url
                          : logUser.username
                      }
                      onClick={() => {
                        setMyIndex(ide);
                        // console.log(ide);
                        setMyModal(true);
                        setMine(true);
                      }}
                    />
                    <div
                      className="purple mt-2 fw-bold text-wrap col-8 text-center"
                      style={{ fontSize: 10, height: 15 }}
                    >
                      {mine.text}
                    </div>
                  </div>
                </>
              ))}
          </div>
        )}
        {/* </HorizontalScroll> */}
        <div
          className="bg-white bg-white li-shadow h-100 mt-2 px-3"
          style={{
            borderRadius: 20,
            boxShadow: "0px 0px 10px #0000005e",
          }}
        >
          <div
            className=" bg-linearlr text-white text-center fw-bold py-1 px-2 mx-auto col-4 col-md-6 col-xl-4"
            style={{
              borderRadius: "0px 0px 10px 10px",
              boxShadow: "0px 0px 10px #0000005e",
            }}
          >
            Recent
          </div>
          <div className="d-flex row align-items-center justify-content-center py-3 ">
            {mainData.length == 0 ? (
              <div className="col-12 d-flex flex-column align-justify-center">
                <img src={nodata} width="100%" />
                <div className="purple">No stories to display!</div>
              </div>
            ) : (
              mainData.map((folStry, index) => (
                <>
                  <div className="col-4 d-flex flex-column align-items-center justify-content-center mb-3">
                    <Avatar
                      className="li-y-shadow d-flex align-items-center justify-content-center cursor-pointer"
                      style={{ width: 50, height: 50 }}
                      alt={folStry.user.username}
                      src={
                        folStry.user.profile_pic
                          ? folStry.user.profile_pic.public_url
                          : folStry.user.username
                      }
                      onClick={() => {
                        setIndexValue(index);
                        console.log(index);
                        setModalOpen(true);
                      }}
                    />
                    <div
                      className="purple mt-2 fw-bold"
                      style={{ fontSize: 10 }}
                    >
                      {folStry.user.username}
                    </div>
                  </div>
                </>
              ))
            )}
          </div>
        </div>
        <AnimatePresence>
          {modalOpen && <ModalBody index={indexValue} />}
        </AnimatePresence>
        <AnimatePresence>
          {myModal && <MyModalBody index={myIndex} />}
        </AnimatePresence>
        {/* {isOpen && ( */}
        {/* <ClickAwayListener onClickAway={() => setIsOpen(false)}> */}
        {/* <div
              className="d-flex justify-content-center position-absolute pt-3 pb-4 scrollbar bg-linearlr"
              style={{
                top: "5.6vh",
                zIndex: 5,
                maxHeight: "90vh",
                overflowY: "scroll",
                boxShadow: "0px 5px 15px black",
                // borderRadius: "60% 10% 10% 60% ",
                borderBottomRightRadius: 25,
                borderBottomLeftRadius: 25,
                // clipPath: "polygon(0 6%, 100% 0, 100% 100%, 0 95%)",
                transition: "0.1s ease-in-out",
              }}
            >
              <div className="d-flex flex-column justify-content-start align-items-center mx-1 mt-2 px-2">
                <div className="d-flex flex-column align-items-center">
                  <div className="d-flex flex-row align-items-center"> */}
        {/* <StyledPlusBadge>
                    <Badge overlap="circular" badgeContent={"+"}>
                      <Avatar
                        alt="Current_User"
                        src="https://i.pinimg.com/736x/cc/e1/db/cce1db594930d2217fc4f484434742d9.jpg"
                        sx={{ width: "50px", height: "50px" }}
                      />
                    </Badge>
                  </StyledPlusBadge> */}
        {/* <div
                      className="bg-linearlr p-1 mx-auto rounded-circle border border-3 cursor-pointer"
                      onClick={() => setUploadStory(true)}
                    >
                      <AddIcon style={{ fontSize: "28px" }} />
                    </div>
                  </div>
                  <Typography
                    variant="caption"
                    color="primary"
                    className="fw-bold text-white"
                  >
                    Add Story
                  </Typography>
                </div>
                {isLoad ? (
                  <div className="my-3" style={{ fontSize: 10 }}>
                    Loading...
                  </div>
                ) : (
                  mainData.map((data, index) => {
                    return (
                      <div
                        className="d-flex flex-column align-items-center mt-2"
                        key={index}
                      >
                        <div classname="d-flex flex-row align-items-center "> */}
        {/* {data.online ? (
                            <StyledBadge
                              overlap="circular"
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                              }}
                              variant="dot"
                            >
                              <Avatar
                                src={data.avatar}
                                alt={data.username}
                                className="cursor-pointer"
                                onClick={() => {
                                  setIndexValue(index);
                                  console.log(index);
                                  setModalOpen(true);
                                }}
                                sx={{ width: "50px", height: "50px" }}
                                style={
                                  data.story ? style.watched : style.unWatched
                                }
                              />
                            </StyledBadge>
                          ) : (
                            <> */}
        {/* <Avatar
                            src={
                              data.user.profile_pic
                                ? data.user.profile_pic.public_url
                                : ""
                            }
                            alt={
                              data.user.profile_pic
                                ? data.user.profile_pic.id
                                : ""
                            }
                            className="cursor-pointer"
                            onClick={() => {
                              setIndexValue(index);
                              console.log(index);
                              handleOpen();
                            }}
                            sx={{ width: "50px", height: "50px" }}
                            // style={data.story ? style.watched : style.unWatched}
                          />
                          {/* </>
                          )} */}
        {/* </div>
                        {modalOpen && <ModalBody index={indexValue} />}
                        <Typography
                          variant="caption"
                          color="primary"
                          className="fw-bold text-white"
                        >
                          {data.user.username
                            ? data.user.username
                            : "Username yet to come"}
                        </Typography>
                      </div>
                    );
                  })
                )}
              </div>
            </div> */}
        {/* </ClickAwayListener> */}
        {/* // )} */}

        {/* <div className="purple rounded-circle p-0 cursor-pointer">
          <HistoryToggleOffIcon
            // alt="Current_User"
            // src="https://i.pinimg.com/736x/cc/e1/db/cce1db594930d2217fc4f484434742d9.jpg"
            sx={{ fontSize: 30 }}
            onClick={() => setIsOpen(!isOpen)}
          />
          {/* {!isOpen ? (
            <ExpandMoreIcon
              style={{ fontSize: 30 }}
              onClick={() => setIsOpen(!isOpen)}
            />
          ) : (
            <KeyboardArrowUpIcon
              style={{ fontSize: 30 }}
              onClick={() => setIsOpen(!isOpen)}
            />
          )} 
        </div> */}
        <AnimatePresence>{uploadStory && <UploadStory />}</AnimatePresence>
      </div>
    </>
  );
}
