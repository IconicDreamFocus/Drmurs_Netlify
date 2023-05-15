import { styled } from "@mui/material/styles";
import { Badge } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { endpoint, config } from "../../endpoint";
import axios from "axios";
import OthersPost from "../../components/main/newsfeed/OthersPost";
import { memo } from "react";

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

function Trending({ mob, logUser }) {
  const [uploadGallery, setUploadGallery] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [emote, setEmote] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [reportAlert, setReportAlert] = useState(false);
  // const [reportIndex, setReportIndex] = useState(null);
  const [thoughts, setThoughts] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [page, setPage] = useState(0);
  const [isMore, setIsMore] = useState(false);
  const [shareData, setShareData] = useState([]);

  const dispatch = useDispatch();

  let { id } = useParams();

  const checkVideo = [
    "video/x-flv",
    "video/mp4",
    "appication/x-mpegURL",
    "video/MP2T",
    "video/3gpp",
    "video/quicktime",
    "video/x-msvideo",
    "video-x-ms-wmv",
  ];

  console.log("trending");

  const [dumData, setDumData] = useState([]);

  useEffect(() => {
    axios
      .get(`${endpoint}/trending/${id}`, config)
      .then((res) => {
        console.log(res.data.data);
        setDumData(res.data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [emote, id]);

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
  }, []);

  const { postimg, userpostimg, usercaptions, poststatus, hashTrend } =
    useSelector((state) => state.newsfeed);
  const { loggedIn, user, username, avatar } = useSelector(
    (state) => state.user
  );

  return (
    <div className="w-100">
      <div className="mt-md-2 mb-2 col-11 mx-auto">
        <p
          className="fw-bold bg-linearlr col-5 col-md-2 mx-auto text-center p-2 mt-0"
          style={{
            borderRadius: "0px 0px 10px 10px",
            boxShadow: "0px 5px 10px #0000005e",
          }}
        >
          Trending
        </p>
      </div>
      <OthersPost
        mob={mob}
        page={page}
        setPage={setPage}
        logUser={logUser}
        dumData={dumData}
        loading={loading}
        setDumData={setDumData}
        // fetchFeed={fetchFeed}
        isMore={isMore}
        emote={emote}
        setEmote={setEmote}
        shareData={shareData}
        setShareData={setShareData}
        uploadGallery={uploadGallery}
        postSuccess={postSuccess}
      />
    </div>
  );
}

export default memo(Trending);
