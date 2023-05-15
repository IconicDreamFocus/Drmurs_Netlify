import Avatar from "@mui/material/Avatar";
import { useState, useEffect, useCallback } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { postComment } from "../../../slices/newsfeedSlice";
import Alert from "@mui/material/Alert";
import {
  endpoint,
  config,
  imgConfig,
  checkVideo,
  months,
} from "../../../endpoint";
import axios from "axios";
import { memo } from "react";
import feed_loader from "../../../assets/images/feed_load.gif";

import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";

function Comments({
  commentsData,
  dumData,
  selectedUser,
  cpage,
  setCpage,
  cisMore,
  commentsLoad,
  setCommentsLoad,
  mob,
  logUser,
  setCommentsOpen,
  postId,
  tab,
  setCommentsData,
}) {
  const [alert, setAlert] = useState(false);
  const postOwner = dumData[selectedUser];
  const dispatch = useDispatch();

  const [dispatchData, setDispatchData] = useState({
    byUser: logUser.username,
    toUser: postOwner.username,
    comment: "",
  });

  setTimeout(() => setAlert(false), 3000);

  const handlePostComments = (dispatchData) => {
    dispatch(postComment(dispatchData));
    let data = { text: dispatchData.comment };
    axios
      .post(`${endpoint}/post/${postId}/comment`, { data }, config)
      .then((res) => {
        console.log(res.data);
        setCommentsLoad(!commentsLoad);

        let nextCmt = {
          commented_at: res.data.commented_at,
          id: res.data.id,
          text: res.data.text,
          user: {
            email: logUser.email,
            id: 1,
            profile_pic: logUser.profile_pic,
            username: logUser.username,
          },
        };

        // console.log();
        setCommentsData([...commentsData, nextCmt]);
      })
      .catch((err) => {
        console.log(err);
      });
    setDispatchData({ ...dispatchData, comment: "" });
  };
  return (
    <div
      className={`position-fixed comment-bg overflow-hidden`}
      style={{
        zIndex: mob ? 15 : 3,
        width: mob ? "100vw" : "25vw",
        height: "100vh",
        right: !mob && 0,
        left: mob && 0,
        top: 0,
        // backgroundColor:"#e4e4e4"
      }}
    >
      <div
        className=" me-2 pe-3 d-flex align-items-start justify-content-between "
        style={{ height: "6vh" }}
      >
        <div
          className="h4 py-2 px-3 bg-linearlr fw-600 li-shadow"
          style={{ borderRadius: "0 0 10px 0px" }}
        >
          Comments
        </div>
        <CloseIcon
          className="mb-2 cursor-pointer bg-white p-2 li-shadow purple"
          style={{ fontSize: 40, borderRadius: "0 0 10px 10px" }}
          onClick={() => setCommentsOpen(false)}
        />
      </div>
      <div
        className="d-flex flex-column justify-content-around"
        style={{ height: "92vh" }}
      >
        <div
          className="bg-white m-3 m-md-2 m-xl-3 pb-3 d-flex flex-column justify-content-start li-shadow overflow-hidden"
          style={{ height: "65vh", borderRadius: 30 }}
        >
          <div className="col-12 li-shadow bg-linearlr inner-shadow p-2">
            <div className="d-flex align-items-center">
              <Avatar
                className="rounded-circle bg-linearlr li-shadow"
                src={
                  postOwner.user.profile_pic
                    ? postOwner.user.profile_pic.public_url
                    : ""
                }
                width="30px"
                height="30px"
                alt={postOwner.user.username}
              />
              <div className="ms-2 fw-bold text-white">
                {postOwner.user.username}
              </div>
            </div>
            {postOwner.text && (
              <div
                className="bg-white purple col-11 mx-3 px-4 py-2 li-shadow overflow-auto"
                style={{ borderRadius: 30, fontSize: 12, maxHeight: 45 }}
              >
                {postOwner.text}
              </div>
            )}
          </div>
          <div>
            {/* <div> */}
            <InfiniteScroll
              className="col-12 overflow-auto pb-3 w-100"
              // style={{ height: 400 }}
              style={{ height: "53.7vh" }}
              dataLength={commentsData.length}
              hasMore={cisMore}
              // hasMore={true}
              next={() => {
                console.log("next");
                setCpage(cpage + 1);
                console.log(cpage); // paginate
              }}
              loader={<h3 className="purple col-12 text-center">Loading...</h3>}
            >
              {commentsData != [] &&
                commentsData.map((comment, index) => (
                  <div
                    key={index}
                    className="py-2 col-12 align-items-center justify-content-start px-2 "
                  >
                    <div className="d-flex align-items-center ">
                      <Avatar
                        className="rounded-circle bg-linearlr"
                        src={comment.user.profile_pic.public_url}
                        sx={{ width: 40, height: 40 }}
                        alt={comment.user.username}
                      />
                      <div className="col-10">
                        <div className="ms-2 purple">
                          {comment.user.username}
                        </div>
                        <div
                          className="bg-hash ms-2 me-3 px-3 py-1 text-dark"
                          style={{ borderRadius: 30, fontSize: 13 }}
                        >
                          {comment.text}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </InfiniteScroll>
            {/* </div> */}
          </div>
        </div>
        <div
          className="bg-linearlr m-3 m-md-2 m-xl-3 overflow-auto p-3 px-md-1 p-xl-3 py-3 li-shadow"
          style={{ height: 130, borderRadius: 30 }}
        >
          <div className="d-flex my-1 col-12 align-items-start justify-content-start">
            <Avatar
              src={logUser.profile_pic.public_url}
              alt={logUser.username}
              className="rounded-circle bg-linearlr"
              sx={{ width: tab ? 28 : 35, height: tab ? 28 : 35 }}
            />
            <textarea
              rows="3"
              value={dispatchData.comment}
              className="bg-white purple col-10 px-3 py-1 border-0 ms-2 ms-xl-2 ms-md-1 no-out li-y-shadow"
              onChange={(e) =>
                setDispatchData({ ...dispatchData, comment: e.target.value })
              }
              style={{ borderRadius: 20, fontSize: 12 }}
            />
          </div>
          {alert && (
            <div className="mt-1 col-12 text-center px-4">
              <Alert
                className="mx-auto p-0 col-12 "
                severity="error"
                style={{ fontSize: 10 }}
              >
                Your Comment can't be empty!
              </Alert>
            </div>
          )}
          <div className="d-flex my-1 col-12 align-items-center justify-content-end px-3 mt-2">
            <div
              className="bg-purple py-1 text-white rounded cursor-pointer col-3 col-md-4 col-xl-3 fw-bold text-center mx-3 li-y-shadow"
              style={{
                // border: "2px solid #a11cf9",
                color: "#a11cf9",
                fontSize: 12,
              }}
              onClick={() => setDispatchData({ ...dispatchData, comment: "" })}
            >
              Cancel
            </div>
            <div
              className="bg-white purple py-1 col-3 col-md-4 col-xl-3 cursor-pointer rounded fw-bold px-md-2 px-lg-4 text-center li-y-shadow"
              style={{ fontSize: 12 }}
              onClick={() => {
                setDispatchData({ ...dispatchData, comment: null });
                dispatchData.comment != ""
                  ? handlePostComments(dispatchData)
                  : setAlert(true);
              }}
            >
              Post
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Comments);
