import { useEffect } from "react";
import { io } from "socket.io-client";

export const endpoint = "https://api.drmurs.com/api";
export const chatpoint = "https://api.drmurs.com";

export var token = window.localStorage.getItem("token");
//export var dp = window.localStorage.getItem("dp");

export var config = {
  headers: { Authorization: `Bearer ${token}` },
};

export var imgConfig = {
  headers: {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
};

export var roomId = {
  transportOptions: {
    polling: {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    },
  },
};

export const checkVideo = [
  "video/x-flv",
  "video/mp4",
  "appication/x-mpegURL",
  "video/MP2T",
  "video/3gpp",
  "video/quicktime",
  "video/x-msvideo",
  "video-x-ms-wmv",
];

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export function formatDate(newDate) {
  const d = new Date(newDate);
  const taskDate = d.getDate();
  const taskMonth = months[d.getMonth()];
  const taskYear = d.getFullYear();
  return `${taskDate}-${taskMonth}-${taskYear}`;
}

export function formatDate1(newDate) {
  const d = new Date(newDate);
  const taskDate = d.getDate();
  const taskMonth = months[d.getMonth()];
  const taskYear = d.getFullYear();
  return `${taskDate} ${taskMonth}, ${taskYear}`;
}

export function formatDate2(dat) {
  let date = new Date(`${dat}`);
  let currentDate = date.getDate();
  let currentMonth = date.getMonth() + 1;
  let currentYear = date.getFullYear();
  if (currentDate < 10) {
    currentDate = `0${currentDate}`;
  }
  if (currentMonth < 10) {
    currentMonth = `0${currentMonth}`;
  }
  return `${currentMonth}/${currentDate}/${currentYear}`;
}

export function formatStoryDate(dat) {
  let a = new Date(`${dat}`);
  let n = new Date();
  let ad = a.getDate();
  let nd = n.getDate();
  let ah = a.getHours();
  let nh = n.getHours();
  let am = a.getMinutes();
  let nm = n.getMinutes();
  console.log(a, n, ah, nh, am, nm);
  if (ad == nd && nh - ah == 0) {
    if (nm - am == 0) return "just now";
    else return `${nm - am}m`;
  } else return ad == nd ? `${nh - ah}h` : `${24 + (nh - ah)}h`;
  // let currentDate = a.getDate();
  // let currentMonth = a.getMonth() + 1;
  // let currentYear = a.getFullYear();
  // if (currentDate < 10) {
  //   currentDate = `0${currentDate}`;
  // }
  // if (currentMonth < 10) {
  //   currentMonth = `0${currentMonth}`;
  // }
  // return `${currentMonth}/${currentDate}/${currentYear}`;
}

export const socket = io.connect(chatpoint, roomId);
// export const socket = sessionStorage.getItem("chatSocket");
// export const socket = JSON.parse(sessionStorage.getItem("chatSocket"));
// console.log(socket);

export const ModalAnimation = {
  key: "box",
  initial: { scale: 0 },
  exit: {
    // y: "100vh",
    scale: 0,
    transition: { duration: 0.1, type: "easeInOut" },
  },
  animate: { scale: 1 },
  transition: { duration: 0.3, type: "spring" },
};
export const ModalAnimation1 = {
  key: "box1",
  initial: { scale: 0 },
  exit: {
    // y: "100vh",
    scale: 0,
    transition: { duration: 0.1, type: "easeInOut" },
  },
  animate: { scale: 1 },
  transition: { duration: 0.3, type: "spring" },
};
