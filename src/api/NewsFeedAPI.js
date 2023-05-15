import axios from "axios";
import { useState, useEffect } from "react";
import { endpoint } from "../endpoint";

var token = window.localStorage.getItem("token");
var config = {
  headers: { Authorization: `Bearer ${token}` },
};

// const [uploadGallery, setUploadGallery] = useState(false);
// const [postSuccess, setPostSuccess] = useState(false);
// const [commentsOpen, setCommentsOpen] = useState(false);
// const [selectedUser, setSelectedUser] = useState(0);
// const [shareOpen, setShareOpen] = useState(false);
// const [report, setReport] = useState(false);
// const [loading, setLoading] = useState(true);
// const [reportAlert, setReportAlert] = useState(false);
// const [reportIndex, setReportIndex] = useState(null);
// const [thoughts, setThoughts] = useState(null);
// const [selectedPost, setSelectedPost] = useState(null);
// const [page, setPage] = useState(0);

// const dispatch = useDispatch();
// const history = useHistory();

// const [refresh, setRefresh] = useState(false);
// const [dumData, setDumData] = useState([]);
// // const [userData, setUserData] = useState([]);
// const [addVideo, setAddVideo] = useState(false);
// const [emote, setEmote] = useState(false);
// const [commentsData, setCommentsData] = useState([]);
// const [shareData, setShareData] = useState([]);
// const [commentsLoad, setCommentsLoad] = useState(false);

// useEffect(() => {
//   axios
//     .get(`${endpoint}/me/contacts`, config)
//     .then((res) => {
//       console.log(res.data.data);
//       setShareData(res.data.data);
//     })
//     .catch((err) => {
//       // console.log("7.get comment api!!!!");
//       console.log(err);
//     });
// }, []);

// useEffect(() => {
//   console.log(dumData);
// }, [dumData]);
// console.log("feeeeeeeed");

// const fetchNewsFeed = () => {
export const getNewsFeed = ({ page, setDumData, dumData, setLoading }) => {
  //   useEffect(() => {
  // newsfeed get api
  axios
    .get(`${endpoint}/news_feed?page=0&limit=7`, config)
    .then((res) => {
      console.log("1.Newsfeed get!!!!");
      console.log(res.data.data);
      setDumData([...dumData, ...res.data.data.slice(0).reverse()]);
      // setDumData((old) => [...old, res.data.data.slice(0).reverse()]);
      setLoading(false);
    })
    .catch((err) => {
      console.log("1.Newsfeed get!!!!");
      console.log(err);
    });
  //   }, [page]);
};
