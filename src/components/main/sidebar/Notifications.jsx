import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useHistory } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { config, endpoint, socket, token } from "../../../endpoint";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CancelIcon from "@mui/icons-material/Cancel";
import nodata from "../../../assets/images/data.gif";
import { Link } from "react-router-dom";

export default function Notifications({
  setNotificationOpen,
  notificationOpen,
  full,
  notific,
  setNotific,
}) {
  let history = useHistory();
  const [type, setType] = useState(1);
  // const [accept, setAccept] = useState(false);
  // const [reject, setReject] = useState(false);
  // const [indd, setIndd] = useState(null);

  //   const postOwner = data[selectedUser];
  //   const [dispatchData, setDispatchData] = useState({
  //     byUser: user,
  //     toUser: postOwner.username,
  //     comment: "",
  //   });

  //   const handlePostComments = (dispatchData) => {
  //     // e.preventDefault();
  //     dispatch(postComment(dispatchData));
  //     postOwner.comments.unshift({
  //       avatar: avatar
  //         ? avatar
  //         : "https://i.pinimg.com/736x/f4/a3/4e/f4a34ef7fd2f8d3a347a8c0dfb73eece.jpg",
  //       user: user ? user : "userKnown",
  //       comment: dispatchData.comment,
  //     });
  //   };
  console.log("notific");

  socket.on("follow", (data) => console.log(data));
  // {
  //   to: user_id,
  //   from: logUser.username,
  // }

  function randomNumber(rangeStart, rangeEnd) {
    return Math.floor(Math.random() * (rangeStart - rangeEnd + 1) + rangeEnd);
  }

  function handleReject(_id, not_ind) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var raw = "";

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${endpoint}/follow/action/${_id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        let dup = [...notific];
        dup[not_ind].reject = true;
        setNotific(dup);
      })
      .catch((error) => console.log("error", error));
  }

  const category = ["Friends", "Events", "Goals"];
  const quotes = [
    "Today is your opportunity to build tomorrow you want",
    "Dreams don't work unless you do",
    "Don't let one bad day stop you from reaching your goal",
    "A goal without a plan is just a wish",
    "Your happiness and success lies in you",
    "A goal is a dream with action behind it",
    "Focus on the goal not the obstacles",
  ];

  // console.log(randomNumber(0, 10));

  return (
    <div
      className=""
      style={{
        zIndex: 5,
        // width: full ? "100vw" : "25vw",
        height: "100vh",
        right: 0,
        top: 0,
      }}
    >
      <div className="overflow-auto p-3 px-md-1 px-xl-3">
        <div className=" col-12 d-flex align-items center justify-content-between ">
          {category.map((cat, num) => (
            <div
              onClick={() => {
                setType(num + 1);
                setNotificationOpen(notificationOpen);
              }}
              className={`${
                type != num + 1 ? " bg-white purple " : "bg-linearlr "
              } text-center p-1 col-3 col-md-4 col-xl-3 cursor-pointer fw-bold`}
              style={{
                borderRadius: 8,
                fontSize: "15px",
                boxShadow: "0px 0px 10px #0000005e",
              }}
            >
              {cat}
            </div>
          ))}
        </div>
        {notific.length == [] ? (
          <div className="col-12 mt-2 d-flex flex-column align-justify-center">
            <img src={nodata} width="100%" />
            <div className="purple">No stories to display!</div>
          </div>
        ) : (
          notific.map((not, index) => {
            if (not.type == type + 1) {
              return (
                <div
                  key={index}
                  className="col-12 px-3 py-2 my-2 px-3 purple"
                  style={{
                    borderRadius: 8,
                    fontSize: "13px",
                    boxShadow: "0px 0px 10px #0000005e",
                    backgroundColor: not.accept
                      ? "#9bf8cf"
                      : not.reject
                      ? "#ff0000"
                      : "#fff",
                  }}
                >
                  {not.type == 3 && (
                    <>
                      <div>
                        <span className="fw-bold">{not.text}</span>- A new event
                        has been launched 🤩! Excited 😃? Go check our
                        <Link
                          to="/dream-community"
                          className="fw-bold cursor-pointer purple"
                        >
                          {" "}
                          Dream Community{" "}
                        </Link>
                        page to see more about the event.
                      </div>
                    </>
                  )}
                  {not.type == 2 &&
                    (not.accept ? (
                      <div className="text-dark">
                        {" "}
                        Accepted <span className="fw-bold">{not.text}</span>'s
                        request.
                      </div>
                    ) : not.reject ? (
                      <div className="text-white">
                        Rejected <span className="fw-bold">{not.text}</span>'s
                        request.
                      </div>
                    ) : (
                      <>
                        <div>
                          From <span className="fw-bold">{not.text}</span>,
                          <br></br>Hi, I want to be your friend.
                        </div>
                        <div className="col-12 p-2 d-flex justify-content-evenly">
                          <div
                            className="cursor-pointer bg-white rounded li-y-shadow purple px-2 py-1"
                            onClick={() => handleReject(not.id, index)}
                          >
                            Reject
                          </div>
                          <div
                            className="bg-linearlr cursor-pointer px-2 py-1 rounded li-shadow"
                            onClick={() => {
                              axios
                                .post(
                                  `${endpoint}/follow/action/${not.resource_id}`,
                                  {
                                    user_id: not.id,
                                  },
                                  config
                                )
                                .then((res) => {
                                  // window.alert(res.data.msg);
                                  let dup = [...notific];
                                  dup[index].accept = true;
                                  setNotific(dup);
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                            }}
                          >
                            Accept
                          </div>
                        </div>
                      </>
                    ))}
                  {not.type == 4 && (
                    <>
                      <div>
                        <span className="fw-bold">{not.text}</span>,<br></br>"
                        <em>{quotes[randomNumber(0, 7)]}</em>"<br></br>The
                        deadline is nearing! Complete your task 😊.
                      </div>
                    </>
                  )}
                </div>
              );
            } else {
              return null;
            }
          })
        )}
      </div>
      <div
        className="col-12 px-4 pt-1 text-white "
        style={{ color: "#858585", fontSize: 10 }}
      >
        <u>Show more</u>
      </div>
    </div>
  );
}
