import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { editprofile, login } from "../../slices/userSlice";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  endpoint,
  config,
  checkVideo,
  socket,
  token,
  months,
} from "../../endpoint";
import axios from "axios";
import loaderP from "../../assets/images/loader-color.gif";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Button, Snackbar, Slide, Alert } from "@mui/material";
import nodata from "../../assets/images/nodata.gif";

import InfiniteScroll from "react-infinite-scroll-component";
import { ProfileBox, TimelineUI } from "../../components/Common";

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

export default function UserProfile({
  mob,
  logUser,
  refreshChat,
  setRefreshChat,
}) {
  const [error, setError] = useState(false);
  const [modal, setModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [timeline, setTimeline] = useState([]);
  const [follow, setFollow] = useState(false);
  const [error1, setError1] = useState(false);
  const [req, setReq] = useState(false);
  const [userData, setUserData] = useState(null);
  const [page, setPage] = useState(0);
  const [isMore, setIsMore] = useState(false);
  const [addChat, setAddChat] = useState(false);

  const history = useHistory();
  let { user_id } = useParams();

  // socket.emit("follow", {
  //   to: user_id,
  //   from: "abc",
  // });

  // socket.on("follow", (data) => console.log(data));

  const handleChatInit = () => {
    const data = { to: user_id };
    socket.emit("conversation_init", data);
    // useEffect(() => {
    socket.on("conversation_initiated", (data) => {
      console.log(data.id);
      // setConvoId(data.id);
      setAddChat(true);
      setReq(true);
      setRefreshChat(!refreshChat);
    });
  };

  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    axios
      .get(`${endpoint}/user/${user_id}`, config)
      .then((res) => {
        console.log(res.data.data);
        setUserData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh, user_id]);

  useEffect(() => {
    if (userData) {
      if (userData.relations != [])
        userData.relations.filter((rel) => {
          if (rel.to == user_id) {
            if (rel.is_accepted) setIsFollowing(true);
            else setIsFollowing(false);
          }
        });
      else setIsFollowing(false);
    }
  }, [userData, user_id]);

  // const isFollow = () => {
  //   let status = !isFollowing ? "Follow" : "Unfollow";
  //   return status;
  // };

  function handleUnfollow() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      data: {
        user_id,
      },
    });

    console.log(raw, myHeaders);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${endpoint}/follow`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setIsFollowing(false);
        setRefresh(!refresh);
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    axios
      .get(`${endpoint}/${user_id}/posts?page=${page}&limit=7`, config)
      .then((res) => {
        console.log("tl", res.data.data);
        setTimeline([...timeline, ...res.data.data]);
        res.data.data.length < 7 ? setIsMore(false) : setIsMore(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {timeline && userData ? (
        <div className="mt-md-3 mb-3 px-1 px-md-2 px-lg-4 position-relative ">
          <ProfileBox userData={userData} mob={mob} />
          <div className="mx-auto col-12 col-xl-10 d-flex justify-content-end">
            {!isFollowing ? (
              <Button
                className=" bg-linearlr shadow px-3 py-1 cursor-pointer me-4"
                variant="contained"
                // onClick={() => setFollow(true)}
                onClick={() => {
                  let data = {
                    user_id,
                  };
                  axios
                    .post(`${endpoint}/follow`, { data }, config)
                    .then((res) => {
                      console.log(res.data.msg);
                      setRefresh(!refresh);
                      setReq(true);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  // setIsFollowing(!isFollowing);
                }}
                style={{
                  textTransform: "initial",
                  borderRadius: "0px 0px 10px 10px",
                }}
              >
                {/* {!isFollowing ? "Follow" : "Unfollow"} */}
                Follow
              </Button>
            ) : (
              <Button
                className=" bg-linearlr shadow px-3 py-1 cursor-pointer me-4"
                variant="contained"
                onClick={handleUnfollow}
                style={{
                  textTransform: "initial",
                  borderRadius: "0px 0px 10px 10px",
                }}
              >
                UnFollow
              </Button>
            )}
            <Button
              className=" bg-linearlr shadow px-3 py-1 cursor-pointer me-4"
              variant="contained"
              // onClick={() => setFollow(true)}
              onClick={handleChatInit}
              style={{
                textTransform: "initial",
                borderRadius: "0px 0px 10px 10px",
              }}
            >
              Add to chats
            </Button>
          </div>
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
        <div className="col-12 d-flex align-justify-center vh-100">
          <div className="col-12 d-flex align-justify-center my-5">
            <img className="my-5" src={loaderP} width="10%" height="10%" />
          </div>
        </div>
      )}
      <Snackbar
        sx={{ ml: { md: "100px" } }}
        open={req}
        autoHideDuration={6000}
        onClose={() => setReq(false)}
        TransitionComponent={TransitionUp}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={() => setReq(false)}
          severity="success"
          sx={{ width: "100%", backgroundColor: "#9bf8cf" }}
        >
          {!addChat
            ? "Follow request sent successfully!"
            : "User added to chats!"}
        </Alert>
      </Snackbar>
    </>
  );
}
