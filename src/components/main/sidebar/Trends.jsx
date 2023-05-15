import React, { useState } from "react";
import { Box } from "@mui/system";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useHistory } from "react-router-dom";
import trendPurple from "../../../assets/images/trendPurple.svg";
import trendWhite from "../../../assets/images/trendWhite.svg";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import nodata from "../../../assets/images/empty.gif";
import { useParams } from "react-router-dom";

import InfiniteScroll from "react-infinite-scroll-component";

export default function Trends({
  trends,
  chat,
  full,
  trendData,
  tisMore,
  settPage,
  tpage,
}) {
  let history = useHistory();
  const [selectedId, setSelectedId] = useState(null);

  let { id } = useParams();

  console.log("trends");

  return (
    <Box
      className="col-12 mt-2 p-2  pb-4 overflow-auto"
      style={{ borderRadius: "12px", height: "100%" }}
    >
      {/* <div
        className=" overflow-auto"
        style={{ height: full ? "83vh" : "77vh" }}
      > */}
      {trendData.length == 0 ? (
        <div className="col-12 mt-5 d-flex flex-column align-justify-center">
          <img src={nodata} width="100%" />
        </div>
      ) : (
        // <InfiniteScroll
        //   // className="col-12 row d-flex align-items-between justify-content-around "
        //   dataLength={trendData.length}
        //   hasMore={tisMore}
        //   // hasMore={true}
        //   next={() => {
        //     console.log("next");
        //     // settPage(tpage + 1); // paginate
        //   }}
        //   loader={<h4>Loading...</h4>}
        //   // endMessage={
        //   //   <div className="col-12 d-flex flex-column align-justify-center">
        //   //     {/* <img src={nodata} width="40%" /> */}
        //   //     <div className="purple">Caught up</div>
        //   //   </div>
        //   // }
        // >
        trendData.map((value, index) => (
          <div
            key={index}
            className={`col-12 px-0 py-3 my-2 ${
              id == value.id ? "bg-white purple " : "bg-linearlr"
            } d-flex align-items-center justify-content-between cursor-pointer`}
            style={{
              borderRadius: 8,
              boxShadow: `0px 0px 10px ${
                id == value.id ? "#7201c8" : "#0000005e"
              }`,
            }}
            onClick={() => {
              history.push(`/trending/${value.id}`);
              // setSelectedId(value.id);
            }}
          >
            <div
              className="d-flex align-items-center ms-2 fw-bold"
              style={{ fontSize: "16px" }}
            >
              <div
                className={`${
                  id == value.id ? " bg-linearlr " : " bg-white purple"
                }   rounded-circle me-2 fw-600 text-center`}
                style={{ width: 25, height: 25 }}
              >
                {index + 1}
              </div>{" "}
              #{value.text}
            </div>
            <div
              className="d-flex align-items-center  "
              style={{ fontSize: "12px" }}
            >
              {/* <img
                src={selectedId == value.id ? trendWhite : trendPurple}
                width="30%"
                style={{ fontColor: "#fff" }}
              /> */}
              <div
                className=" bg-white purple py-1 px-3 text-center"
                style={{
                  borderRadius: "10px 0px 0px 10px",
                  boxShadow: `-1px 0px 5px ${
                    id == value.id ? "#7201c8" : "#0000005e"
                  }`,
                }}
              >
                {value.posts.length > 5 && (
                  <ArrowUpwardIcon
                    className=" text-success me-3"
                    style={{ textShadow: "0px 0px 15px #fff", fontSize: 20 }}
                  />
                )}
                &nbsp;
                {value.posts.length}
              </div>
            </div>
          </div>
        ))
      )}
      {/* </InfiniteScroll> */}
      {/* </div> */}
      {/* <div
        className="col-12 px-4 pt-1 text-danger cursor-pointer"
        style={{ fontSize: 10 }}
      >
        <u>Show more</u>
      </div> */}
    </Box>
  );
}
