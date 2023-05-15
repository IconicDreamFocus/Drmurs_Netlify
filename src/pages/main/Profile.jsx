import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { editprofile, login } from "../../slices/userSlice";
import angrygif from "../../assets/images/angry.gif";
import freezegif from "../../assets/images/freeze.gif";
import heartgif from "../../assets/images/heart.gif";
import laughgif from "../../assets/images/laugh.gif";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import mindblowngif from "../../assets/images/mindblown.gif";
import blankFace from "../../assets/images/blank-face.gif";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { endpoint, config, checkVideo, token, months } from "../../endpoint";
import axios from "axios";
import loaderW from "../../assets/images/loader-white.gif";
import loaderP from "../../assets/images/loader-color.gif";
import nodata from "../../assets/images/nodata.gif";
import { AnimatePresence, motion } from "framer-motion";
import { ModalAnimation } from "../../endpoint";

import InfiniteScroll from "react-infinite-scroll-component";
import { ProfileBox, TimelineUI } from "../../components/Common";

export default function Profile({ mob, tab }) {
  const [modal, setModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [profPic, setProfPic] = useState(null);
  const [updated, setUpdated] = useState(null);
  const [contentId, setContentId] = useState(null);

  const emojies = [laughgif, angrygif, heartgif, freezegif, mindblowngif];

  // const {
  //   loggedIn,
  //   user,
  //   updatedUser,
  //   username,
  //   password,
  //   avatar,
  //   gender,
  //   email,
  //   about,
  //   phone,
  //   interest,
  // } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(0);
  const [isMore, setIsMore] = useState(false);
  const [reLoad, setReLoad] = useState(true);
  const [profilePic, setProfilePic] = useState(null);

  const handleReloadData = () => {
    axios
      .get(`${endpoint}/me`, config)
      .then((res) => {
        console.log(res.data.data);
        setUserData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log("post", timeline);
  }, [page]);

  useEffect(() => {
    axios
      .get(`${endpoint}/posts?page=${page}&limit=7`, config)
      .then((res) => {
        console.log("tl", res.data.data);
        setTimeline([...timeline, ...res.data.data]);
        res.data.data.length < 7 ? setIsMore(false) : setIsMore(true);
      })
      .catch((err) => console.log(err));
  }, [page]);

  const handleProfilePic = (e) => {
    setReLoad(false);
    var formdata = new FormData();
    formdata.append("display_picture", e.target.files[0], profPic);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://zilliondreamz.com/api/signup_display_picture",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setUpdated(result.data.url);
        setContentId(result.data.id);
        setReLoad(true);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    handleReloadData();
  }, [refresh]);

  const ModalBody = () => {
    const [editedUser, setEditedUser] = useState(null);
    const [editedAbout, setEditedAbout] = useState(null);

    const handleEdit = () => {
      const data = {
        hobbies: editedAbout ? editedAbout : userData ? userData.hobbies : "",
      };
      axios
        .patch(`${endpoint}/me`, { data }, config)
        .then((res) => {
          console.log(res.data);
          // window.alert("Edited Successfully!");
        })
        .catch((err) => console.log(err));

      // const handlePatch = (picId) => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        data: {
          profile_pic_id: contentId,
        },
      });

      var requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("https://zilliondreamz.com/api/me", requestOptions)
        .then((response) => {
          response.json();
        })
        .then((result) => {
          // console.log(result);
        })
        .catch((err) => console.log(err));
      setRefresh(!refresh);
      // };
    };
    // const classes= styles;
    return (
      <Modal
        // className={classes.modalStyle1}
        // sx={{ overflow: "scroll" }}
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="d-flex justify-content-center align-items-center mx-2 mx-md-3 mx-lg-4 mx-lg-5"
      >
        <Box
          component={motion.div}
          {...ModalAnimation}
          className="edit-prof overflow-hidden no-out"
          sx={{
            backgroundColor: "#fff !important",
            // position: "absolute",
            // top: "50%",
            // left: "50%",
            // transform: "translate(-50%, -50%)",
            // overflowY: "scroll",
            // border: "3px solid #fff",
            borderRadius: 5,
            boxShadow: 24,
            // height: 500,
            // px: 4,
            // py: 2,
          }}
        >
          <div className="d-flex align-items-start justify-content-between mb-4">
            <div
              className="h5 my-auto bg-linearlr p-3 purple mt-3"
              style={{
                borderRadius: " 0px 10px 10px 0px",
                boxShadow: "0px 0px 10px #000",
              }}
            >
              Edit Profile
            </div>
            <div
              className="bg-purple p-2 text-white me-4"
              style={{
                borderRadius: " 0px 0px 10px 10px",
                boxShadow: " 0px 5px 10px #000",
              }}
            >
              <CloseIcon
                onClick={() => setModal(false)}
                className="cursor-pointer"
                style={{ fontSize: "1.6rem" }}
              />
            </div>
          </div>
          {/* <div
            className="d-flex align-items-center justify-content-start p-sm-0 "
            // style={{ borderBottom: "2px solid #7201c8" }}
          >
            <div
              className="dark-purple bg-linearlr fw-bold p-2 ms-4"
              style={{ fontSize: 18, borderRadius: "0px 0px 10px 10px" }}
            >
              Edit Profile
            </div>
          </div> */}
          <div className="text-white mt-1 mt-sm-3">
            <div
              className=" mx-auto d-flex align-items-end p-0 overflow-hidden"
              style={{
                border: "1px solid #f8f8f8",
                height: " 140px",
                width: " 140px",
                borderRadius: "50%",
                boxShadow: "0px 0px 10px #000",
                background: userData
                  ? `url("${
                      updated ? updated : userData.profile_pic.public_url
                    }")no-repeat center/cover`
                  : "#860cdd",
              }}
            >
              <div
                className=" col-12 px-4 pb-2 m-0"
                style={{ backgroundColor: "#fff" }}
              >
                <input
                  className="d-none"
                  type="file"
                  id="profile"
                  onChange={(e) => {
                    handleProfilePic(e);
                    setProfPic(URL.createObjectURL(e.target.files[0]));
                    // setFileInput(e.target);
                  }}
                />
                <label
                  className=" col-12 d-flex align-items-center justify-content-center pb-1 cursor-pointer"
                  style={{ fontSize: "12px" }}
                  for="profile"
                >
                  <EditIcon className="purple" style={{ fontSize: "15px" }} />
                  <div className="mx-1 pt-1 purple">Profile pic</div>
                </label>
              </div>
            </div>
            {/* <input
                  placeHolder={updatedUser ? updatedUser : user}
                  className="col-12 p-2 text-dark my-2"
                  style={{ borderRadius: 10, border: "2px solid #7201c8" }}
                  type="text"
                  onChange={(e) => setEditedUser(e.target.value)}
                /> */}
            <div
              className=" bg-linearlr p-3 mt-3 overflow-auto"
              style={{
                borderRadius: "20px",
                boxShadow: "0px 0px 10px #000",
                height: 223,
              }}
            >
              <textarea
                rows="3"
                placeHolder={userData ? userData.hobbies : ""}
                // value=""
                className="col-12 p-2 text-dark mb-2 mt-4 no-out"
                style={{
                  borderRadius: 10,
                  border: "2px solid #7201c8",
                  boxShadow: "0px 0px 15px #000",
                  height: 95,
                }}
                type="text"
                onChange={(e) => setEditedAbout(e.target.value)}
              />

              <div className="d-flex col-12 align-items-center justify-content-end mt-4 mb-2 ">
                {/* <Button
                  variant="contained"
                  onClick={() => {
                    setModal(false);
                  }}
                  className=" col-5 col-sm-4 col-md-3 col-lg-2 me-1 me-sm-2 bg-white purple cursor-pointer"
                >
                  Cancel
                </Button> */}
                {reLoad ? (
                  <Button
                    variant="contained"
                    className=" col-8 col-sm-6 col-md-4 col-lg-3 cursor-pointer me-1 me-sm-2 bg-white purple fw-bold p-1"
                    sx={{ textTransform: "initial" }}
                    style={{ borderRadius: 10, boxShadow: "0px 0px 10px #000" }}
                    onClick={() => {
                      handleEdit();
                      //console.log(editedUser, editedAbout);
                      setModal(false);
                      dispatch(
                        editprofile({ user: editedUser, about: editedAbout })
                      );
                    }}
                  >
                    Save changes
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    style={{ borderRadius: 10, boxShadow: "0px 0px 10px #000" }}
                    sx={{ textTransform: "initial" }}
                    className="col-8 col-sm-6 col-md-4 col-lg-3 cursor-disable me-1 me-sm-2 bg-linearlr fw-bold p-1 rounded"
                  >
                    Save changes
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    );
  };
  return (
    <>
      {timeline && userData ? (
        <div className="mt-md-3 mb-3 px-1 px-md-2 px-lg-4 position-relative ">
          <AnimatePresence>{modal && <ModalBody />}</AnimatePresence>
          <ProfileBox userData={userData} mob={mob} setModal={setModal} edit />
          <TimelineUI
            timeline={timeline}
            nodata={nodata}
            isMore={isMore}
            setPage={setPage}
            page={page}
            mob={mob}
            setTimeline={setTimeline}
          />
        </div>
      ) : (
        // </div>
        <div className="col-12 d-flex align-justify-center vh-100">
          <div className="col-12 d-flex align-justify-center my-5">
            <img className="my-5" src={loaderP} width="10%" height="10%" />
          </div>
        </div>
      )}
    </>
  );
}
