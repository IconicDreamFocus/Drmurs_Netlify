import Avatar from "@mui/material/Avatar";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import {
  endpoint,
  config,
  imgConfig,
  checkVideo,
  months,
  socket,
} from "../../../endpoint";
import { memo } from "react";

import InfiniteScroll from "react-infinite-scroll-component";

function Share({
  mob,
  dumData,
  shareData,
  selectedUser,
  setShareData,
  setShareOpen,
  logUser,
}) {
  const postOwner = dumData[selectedUser];

  const handleSharePost = (postId, converseId) => {
    const data = {
      conversation_id: converseId,
      text: `zdshr:${postId}`,
      // type: type,
    };
    socket.emit("message", data);
    socket.on("message_done", (data) => {
      //   setMsgId(data.id);
      console.log(data.id);
    });
    // socket.on("receive_message", (data) => {
    //   setRecMsg(data.id);
    //   console.log(data.id);
    // });
  };

  //   let userno = [];
  //   shareData.map((cl) => {
  //     if (cl.id == converseId)
  //       userno = cl.users.filter((us) => us.username != logUser.username);
  //   });
  //   // console.log(userno);
  //   const receiveUser = userno[0];

  return (
    <div
      className={`position-fixed vh-100 comment-bg ${
        mob ? "d-sm-none" : "d-none d-md-block"
      } overflow-auto`}
      style={{
        zIndex: mob ? 15 : 3,
        width: mob ? "100vw" : "25vw",
        height: "100vh",
        right: 0,
        top: 0,
      }}
    >
      <div className=" me-2 pe-3 d-flex align-items-start justify-content-between">
        <div
          className="h4 py-2 px-3 bg-linearlr fw-600 li-shadow"
          style={{ borderRadius: "0 0 10px 0px" }}
        >
          Share
        </div>
        <CloseIcon
          className="mb-2 cursor-pointer bg-white p-2 li-shadow purple"
          style={{ fontSize: 40, borderRadius: "0 0 10px 10px" }}
          onClick={() => setShareOpen(false)}
        />
      </div>
      <div
        className="d-flex flex-column justify-content-center"
        style={{ height: "92vh" }}
      >
        <div
          className="bg-white m-3 pb-3 d-flex flex-column align-items-center justify-content-start li-shadow overflow-hidden"
          style={{ height: "85vh", borderRadius: 30 }}
        >
          <div className="col-12 li-shadow bg-linearlr inner-shadow p-2 pt-3">
            <div className="d-flex">
              <Avatar
                src={postOwner.user.profile_pic.public_url}
                alt={postOwner.user.username}
                className="rounded-circle bg-linearlr shadow"
                width="30px"
                height="30px"
              />
              <div className="ms-2 fw-bold text-white">
                {postOwner.user.username}
              </div>
            </div>
            {postOwner.text && (
              <div
                className="bg-white purple col-11 mx-3 px-4 py-2 li-shadow overflow-auto"
                style={{ borderRadius: 30, fontSize: 12,maxHeight:45 }}
              >
                {postOwner.text}
              </div>
            )}
          </div>
          <div className="m-3">
            {logUser &&
              shareData.map((profile, index) => {
                const userno = profile.users.filter((us) =>
                  us.username != logUser.username ? us : null
                );
                // console.log(userno);
                return (
                  <div
                    key={index}
                    className="d-flex justify-content-center cursor-pointer  py-2 align-items-center"
                    onClick={() => {
                      // setChatOpen(true);
                      // setIValue(index);
                    }}
                  >
                    {/* {profile.follow ? (
                      <StyledBadge1
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        variant="dot"
                      >
                        <Avatar
                          className="col-3 shadow border border-1 border-secondary"
                          alt={profile.username}
                          src={profile.avatar}
                          sx={{ mr: 1 }}
                        />
                      </StyledBadge1>
                    ) : ( */}
                    <Avatar
                      className="col-3 shadow border border-1 border-secondary"
                      alt={userno[0].username}
                      src={userno[0].profile_pic.public_url}
                      sx={{ mr: 1 }}
                    />
                    {/* )} */}
                    <div className="col-6 ">
                      <div
                        className="text-dark bg-white fw-bold"
                        style={{ fontSize: 12 }}
                      >
                        {userno[0].username}
                      </div>
                      {/* <div
                        className="text-dark bg-white"
                        style={{ fontSize: 12 }}
                      >
                        {profile.name}
                      </div> */}
                    </div>
                    {profile.send ? (
                      <Button
                        variant="caption"
                        className=" col-3 cursor-pointer  fw-bold p-1 text-center "
                        //   onClick={() => {
                        //     let shareCopy = [...shareData];
                        //     shareCopy[index].send = !shareCopy[index].send;
                        //     setShareData(shareCopy);
                        //   }}
                        sx={{
                          // backgroundColor: "#e4baff",
                          textTransform: "initial",
                          fontSize: "11px",
                          color: "#4b0382",
                          borderRadius: "10px",
                        }}
                      >
                        Sent
                      </Button>
                    ) : (
                      <Button
                        variant="caption"
                        className="p-1 cursor-pointer  col-3 text-center"
                        onClick={() => {
                          let shareCopy = [...shareData];
                          shareCopy[index].send = true;
                          setShareData(shareCopy);
                          handleSharePost(postOwner.id, profile.id);
                        }}
                        sx={{
                          border: "2px solid #a11cf9",
                          fontWeight: "bold",
                          color: "#4b0382",
                          textTransform: "initial",
                          fontSize: "11px",
                          borderRadius: "10px",
                        }}
                      >
                        <SendIcon
                          className="me-1"
                          style={{ fontSize: "15px" }}
                        />
                        Send
                      </Button>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
        {/* <div
            className="bg-white m-3 overflow-auto p-3"
            style={{ height: 130, borderRadius: 30 }}
          >
            <div className="col-12 row bg-warning">
              {shareMedia.map((media) => {
                const MediaIcon = media.icon;
                return (
                  <div className="col-4 d-flex flex-column align-justify-center">
                    <MediaIcon />
                    <div>{MediaIcon}</div>
                  </div>
                );
              })}
            </div>
          </div> */}
      </div>
    </div>
  );
}

export default memo(Share);
