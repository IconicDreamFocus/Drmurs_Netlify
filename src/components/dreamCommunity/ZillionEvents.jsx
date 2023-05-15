import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActions, Box, Link } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Modal from "@mui/material/Modal";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DialogTitle from "@mui/material/DialogTitle";
import { endpoint, token, config, formatDate1, ModalAnimation } from "../../endpoint";
import { Link as Linkto } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import loaderW from "../../assets/images/loader-white.gif";
import loaderP from "../../assets/images/loader-color.gif";
import nodata from "../../assets/images/nodata.gif";
import { AnimatePresence, motion } from "framer-motion";

import InfiniteScroll from "react-infinite-scroll-component";

const foi = [
  {
    name: "Artainment",
    img: require("../../assets/icons/artainment.svg").default,
  },
  {
    name: "Education",
    img: require("../../assets/icons/education.svg").default,
  },
  {
    name: "Entrepreneur",
    img: require("../../assets/icons/entrepreneur.svg").default,
  },
  {
    name: "Food",
    img: require("../../assets/icons/food.svg").default,
  },
  {
    name: "Sports",
    img: require("../../assets/icons/sports.svg").default,
  },
  {
    name: "Tourism",
    img: require("../../assets/icons/tourism.svg").default,
  },
];

export default function ZillionEvents({ setZEvents, mob, tab }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [iValue, setIValue] = useState(null);
  // const handleClose = () => {
  //   console.log(modalOpen);
  // };
  const [field, setField] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(0);
  const [isMore, setIsMore] = useState(false);

  const [eveData, setEveData] = useState([]);

  useEffect(() => {
    console.log(modalOpen);
  }, [modalOpen]);

  useEffect(() => console.log(eveData), [eveData]);

  useEffect(() => {
    axios
      .get(`${endpoint}/events?page=${page}&limit=7&field=${field}`, config)
      .then((res) => {
        console.log(res.data.data);
        // setEveData(res.data.data);
        setEveData([...eveData, ...res.data.data]);
        setLoaded(true);
        // setLoad(false);
        res.data.data.length < 7 ? setIsMore(false) : setIsMore(true);
      })
      .catch((err) => console.log(err));
  }, [field, page]);

  // setTimeout(() => {
  //   setModalOpen(false);
  // }, 4000);

  const EventDetails = () => {
    const details = eveData[iValue];
    return (
      <>
        <Modal
          // className={classes.modalStyle1}
          // sx={{ overflow: "scroll" }}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          className="d-flex justify-content-center align-items-center mx-2 mx-md-3 mx-lg-4 mx-lg-5"
        >
          <Box
            component={motion.div}
            {...ModalAnimation}
            className=" overflow-hidden bg-linearlr no-out"
            sx={{
              // backgroundColor: "#7201c8 !important",
              // position: "absolute",
              // top: "50%",
              // left: "50%",
              // transform: "translate(-50%, -50%)",
              overflowY: "scroll",
              // border: "3px solid #fff",
              borderRadius: 5,
              boxShadow: 24,
              height: mob || tab ? "100vh" : "80vh",
              width: mob || tab ? "100vw" : "70vw",
              // px: 4,
              // py: 2,
            }}
          >
            <div className="d-flex justify-content-between align-items-start">
              <ArrowBackIcon
                className="bg-white purple rounded-circle p-1 me-3 mt-2 ms-3 cursor-pointer li-shadow col-1"
                sx={{ fontSize: 30 }}
                onClick={() => setModalOpen(false)}
              />
              <div className=" col-11 pe-4 pe-md-0 d-flex justify-content-between">
                <div className="d-flex justify-content-center align-items-start col-9 col-md-10 ps-xl-5">
                  <div className=" mx-auto ">
                    <div
                      className={`bg-white li-shadow purple px-4 py-2 fw-bold ms-xl-4`}
                      style={{ borderRadius: "0px 0px 10px 10px" }}
                    >
                      {details.title}
                    </div>
                  </div>
                </div>
                <div className=" col-2 mt-3 me-0 d-flex align-items-center justify-content-end">
                  <div
                    className="bg-white li-shadow purple px-3 py-2 text-center"
                    style={{
                      borderRadius: "10px 0px 0px 10px",
                      fontSize: mob ? 10 : 15,
                    }}
                  >
                    {formatDate1(details.event_date)}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 d-flex justify-content-center position-relative">
              <img
                className="mt-3 br-10 li-shadow mx-auto mb-3"
                src={details.banner_pic_d.public_url}
                style={{
                  height: 280,
                  width: mob ? "95%" : 550,
                }}
              />
              <a
                href={details.link}
                target="_blank"
                rel="noreferrer noopener"
                className={`position-absolute bg-white purple ${
                  mob ? "li-y-shadow" : "li-shadow"
                } fw-600 py-2 px-3 br-10`}
                style={{ right: 20, bottom: 20 }}
              >
                Register
              </a>
            </div>
            <Box
              className="p-2"
              style={{ overflowY: "scroll", height: mob ? "55%" : "40%" }}
            >
              <div
                className="bg-white purple li-shadow px-4 py-2 br col-11 col-md-6 mx-auto text-center br-15"
                style={{ minHeight: 75, overflowX: "hidden" }}
              >
                {details.description}
              </div>
              <div className="bg-white li-shadow d-md-flex justify-content-between col-11 p-2 mx-auto mt-4 text-center br-15">
                <div className="bg-linearlr li-shadow  px-4 py-2 br col-12 col-md-5 mx-auto text-center br-15">
                  <div className="bg-white li-shadow col-md-7 purple px-4 py-2 br mx-auto text-center br-10 fw-bold">
                    Organizer Details
                  </div>
                  <div className="bg-white purple li-shadow px-2 py-2 mt-3 br mx-auto text-center br-10">
                    <div className="">
                      <div className="text-left col-12 fw-600">Name:</div>
                      <div className="text-left col-12 word-break-all">
                        {details.organizer_name}
                      </div>
                    </div>
                    <div className="">
                      <div className="text-left col-12 fw-600">Mobile:</div>
                      <div className="text-left col-12 ">
                        {details.organizer_mobile}
                      </div>
                    </div>
                    <div className="">
                      <div className="text-left col-12 fw-600">Mail Id:</div>
                      <div
                        className="col-12 word-break-all"
                        // style={{ textAlign: "left !important" }}
                      >
                        {details.organizer_email}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-linearlr li-shadow  px-4 py-2 br col-12 col-md-5 mx-auto text-center br-15 mt-3 mt-md-0">
                  <div className="bg-white purple li-shadow px-4 py-2 br col-5 mx-auto text-center fw-bold br-10">
                    Rules
                  </div>
                  <div
                    className="bg-white purple li-shadow px-4 py-2 mt-3 mx-auto text-center br-10"
                    style={{ minHeight: 90, overflowX: "hidden" }}
                  >
                    {details.rules}
                  </div>
                </div>
              </div>
            </Box>
          </Box>
        </Modal>
      </>
    );
  };

  return (
    <>
      <div
        className=" mb-2 col-11 mx-auto d-flex pe-4"
        // style={{ borderTop: "2px solid #7201c8" }}
      >
        <ArrowBackIcon
          className="bg-purple rounded-circle p-1 me-3 mt-2 cursor-pointer li-shadow"
          sx={{ fontSize: 30 }}
          onClick={() => setZEvents(false)}
        />
        <p
          className="fw-bold bg-linearlr col-6 col-md-3 col-xl-2 mx-auto text-center p-2 mt-0"
          style={{
            borderRadius: "0px 0px 10px 10px",
            boxShadow: "0px 5px 10px #0000005e",
          }}
        >
          Zillion Events
        </p>
      </div>
      <section className="justify-content-center align-items-center px-1 px-md-4 mt-4">
        <div className="row align-justify-center rounded bg-white mb-2 px-2">
          <h3 className="purple fw-600 mb-3">
            Choose your<br></br> Favourite interest!
          </h3>
          <div
            className={`d-flex bg-linearlr li-shadow p-2 justify-content-around br-10 ${
              mob && "row col-11"
            } ${tab && " col-12"}`}
          >
            {foi.map((interest, index) => (
              <div
                className={`d-flex flex-column justify-content-center align-items-center ${
                  mob && "col-3 mx-2"
                }`}
                style={{ height: mob && 100 }}
              >
                <div
                  className={` bg-white px-2 pb-4 br-10 cursor-pointer  ${
                    mob && "col-12"
                  }`}
                  style={{
                    width: tab ? 100 : 110,
                    height: mob ? 80 : 110,
                    border: index == field - 1 ? "0px solid #7201c8" : "",
                    boxShadow: index == field - 1 ? "0px 0px 10px #fff" : "",
                  }}
                  onClick={() => {
                    setLoaded(false);
                    setEveData([]);
                    setField(index + 1);
                  }}
                >
                  <img
                    height="100%"
                    width="100%"
                    className=" rounded"
                    style={{ transform: "scale(1)" }}
                    src={interest.img}
                  />
                  <div
                    className={`interest text-center ${
                      index == field - 1 ? "purple" : "purple"
                    }`}
                  >
                    {interest.name}
                  </div>
                </div>
                {index == field - 1 && !mob && (
                  <div className="mt-2 py-1 px-3 bg-white rounded li-shadow"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div
          className="mt-3 mb-2 col-11 mx-auto"
          style={{ borderTop: "2px solid #7201c8" }}
        >
          <p
            className="fw-bold bg-linearlr col-6 col-md-3 col-xl-2 mx-auto text-center p-2 mt-0"
            style={{
              borderRadius: "0px 0px 10px 10px",
              boxShadow: "0px 5px 10px #7d7d7d",
            }}
          >
            Your Events
          </p>
        </div>

        {
          !loaded ? (
            <div className="col-12 d-flex align-justify-center my-5">
              <img className="my-5" src={loaderP} width="10%" height="10%" />
            </div>
          ) : // <div className="row d-flex justify-content-center align-items-center">
          eveData.length == 0 ? (
            <div className="col-12 d-flex flex-column align-justify-center">
              <img src={nodata} className="forgot-gif" />
              <div className="purple">No related Events found</div>
            </div>
          ) : (
            <InfiniteScroll
              className="col-12 row d-flex justify-content-center align-items-center mx-auto"
              dataLength={eveData.length}
              hasMore={isMore}
              // hasMore={true}
              next={() => {
                console.log("next");
                setPage(page + 1); // paginate
              }}
              loader={
                <div className="col-12 d-flex align-justify-center my-5 py-5 h-100">
                  <img
                    src={loaderP}
                    width="10%"
                    height="10%"
                    className="my-5"
                  />
                </div>
              }
              // endMessage={
              //   <div className="col-12 d-flex flex-column align-justify-center">
              //     {/* <img src={nodata} width="40%" /> */}
              //     <div className="purple">Caught up</div>
              //   </div>
              // }
            >
              {eveData.map((event, index) => {
                return (
                  <div className="col-xl-5 mx-0 mx-md-3 mb-4 mx-0 my-2">
                    <div
                      className="br-15 bg-linearlr li-shadow mx-auto overflow-hidden cursor-pointer"
                      onClick={() => {
                        setModalOpen(true);
                        setIValue(index);
                      }}
                      style={{
                        height: 250,
                        width: 375,
                      }}
                    >
                      <div className="d-flex flex-wrap justify-content-between align-items-center">
                        <div className="bg-white purple fw-600 py-1 mt-1 ms-1 px-3 br-10 li-shadow">
                          {event.title}
                        </div>
                        <div
                          className="bg-white purple py-1 fw-600 px-2 me-1 br-10 li-shadow"
                          style={{ fontSize: 12 }}
                        >
                          {formatDate1(event.event_date)}
                        </div>
                      </div>
                      <img
                        className="w-100 h-100 mt-3 br-10 li-up-shadow"
                        src={event.banner_pic_d.public_url}
                      />
                    </div>
                  </div>
                );
              })}
            </InfiniteScroll>
          )
          // </div>
        }

        <AnimatePresence>{modalOpen && <EventDetails />}</AnimatePresence>
      </section>
    </>
  );
}
