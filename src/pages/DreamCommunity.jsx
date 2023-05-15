import React, { useState, useHistory } from "react";
import Box from "@mui/material/Box";
import ZillionEvents from "../components/dreamCommunity/ZillionEvents";
import CreateEvents from "../components/dreamCommunity/CreateEvents";
import BrainstormingFamily from "../components/dreamCommunity/BrainstormingFamily";
import Modal from "@mui/material/Modal";
import { Checkbox } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import dream from "../assets/images/DC.jpeg";
import dc1 from "../assets/images/dc1.gif";
import dreamCom from "../assets/images/DC_load.gif";
import dc_loader from "../assets/images/dc_loader.mov";
import dc2 from "../assets/images/dc2.gif";
import dc3 from "../assets/images/dc3.gif";
import dc4 from "../assets/images/dc4.gif";
import brain from "../assets/images/BW.jpeg";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Snackbar, Slide, Alert } from "@mui/material";
import { ModalAnimation } from "../endpoint";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#a11cf9",
//     },
//   },
// });
function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

export default function DreamCommunity({ mob, tab }) {
  const [loader, setLoader] = useState(true);
  const [events, setEvents] = useState(false);
  const [zEvents, setZEvents] = useState(false);
  const [brainstroming, setBrainstroming] = useState(false);
  const [success, setSuccess] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const {
    loggedIn,
    user,
    username,
    password,
    avatar,
    gender,
    email,
    phone,
    interest,
  } = useSelector((state) => state.user);

  const {
    eConductorName,
    eConductorMail,
    eConductorContact,
    ePoster,
    eDescription,
    eRules,
  } = useSelector((state) => state.event);

  setTimeout(() => {
    setLoader(false);
  }, [1900]);

  const ModalBody = () => {
    // const classes= styles;
    const [check, setCheck] = useState(false);
    return (
      // <AnimatePresence>
      <Modal
        // className={classes.modalStyle1}
        // sx={{ overflow: "scroll" }}
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="d-flex justify-content-center  py-sm-5 mx-md-3 mx-lg-4 mx-lg-5"
      >
        <Box
          className="bg-linearlr"
          sx={{
            // position: "absolute",
            // top: "50%",
            // left: "50%",
            // transform: "translate(-50%, -50%)",
            width: mob ? "100vw" : tab ? "90vw" : "70vw",
            maxHeight: "100vh",
            overflowY: "scroll",
            // border: "3px solid #ffffff",
            outline: "none",
            borderRadius: 10,
            boxShadow: 24,
            px: mob ? 2 : 4,
            pb: mob || tab ? 4 : 0,
          }}
          component={motion.div}
          {...ModalAnimation}
        >
          <div className="d-flex align-items-start justify-content-between mb-4">
            <div
              className="text-white modal-text li-shadow my-auto bg-white p-3 purple ms-2  fw-600"
              style={{ borderRadius: " 0px 0px 10px 10px" }}
            >
              Community Conditions
            </div>
            <div
              className="bg-white p-2 purple li-shadow"
              style={{ borderRadius: " 0px 0px 10px 10px" }}
            >
              <CloseIcon
                onClick={() => {
                  setModalOpen(false);
                  setEvents(false);
                }}
                className="cursor-pointer"
                style={{ fontSize: "1.5rem" }}
              />
            </div>
          </div>
          {/* <div className="d-flex align-items-center justify-content-start mb-sm-2 ">
            <div
              className="text-white h4 fw-600 bg-white p-2 purple li-shadow"
              style={{ borderRadius: " 0px 0px 10px 10px" }}
            >
              Community Conditions
            </div>
          </div> */}
          <div className="bg-white br-10 li-shadow purple py-3 px-1 px-md-3">
            <ol className=" mt-2 my-sm-3 overflow-auto">
              <li>
                The poster/Ad of the event should be added only in HD Quality
                and with the resolution of 1080 x 520 pixels
              </li>
              <li>
                The poster/Ad should contain event name, event participation
                amount(if any), cash prize(if any), timing, event start date to
                end date, venue and contact details.
              </li>
              <li>
                The event's description mentioned should be clear and relevant
                to the event.
              </li>
              <li>
                The event's rules, which is optional. If mentioned it must be
                clear and contain every rules regarding the event.
              </li>
              <li>
                Once the event is completed, the event conductors should post
                the following details in the post events section without fail.
                <ol>
                  <li>
                    Event Winners (who joined throught zillion dreamz app, by
                    mentioning them as #zillion-<em>eventname</em>-
                    <em>username</em> )
                  </li>
                  <li>Event cash prize/certificates(if any).</li>
                  <li>
                    Event participants (who joined using zillion dreamz app) and
                    their certificates/cash prize(if any).
                  </li>
                  <li>
                    Next event update by mentioning #zillionevents, #
                    <em>eventname</em> (if applicable).
                  </li>
                </ol>
              </li>
              <li>
                The event's rules, which is optional. If mentioned it must be
                clear and contain every rules regarding the event.
              </li>
              <li>
                After uploading your events, our team will confirm your given
                details with the above said criterias. If any data regarding the
                event found missing/irrelevant, we will reject your event and
                initimate you through your given mail id.
              </li>
            </ol>
          </div>
          <div className="d-flex align-items-center text-white my-3">
            <Checkbox
              classname="me-sm-2"
              style={{ color: "white" }}
              onChange={() => setCheck(!check)}
            />
            <div className="fw-600">
              Check here to accept and agree all the terms and conditions
              mentioned above
            </div>
          </div>
          <div className="d-flex col-12 col-lg-11 align-items-center justify-content-end mt-4 ">
            {/* <Button
              variant="contained"
              onClick={() => {
                setModalOpen(false);
                setEvents(false);
              }}
              className=" col-5 col-sm-4 col-md-3 col-lg-2 me-1 me-sm-2 purple bg-white"
            >
              Cancel
            </Button> */}
            {check ? (
              <Button
                variant="contained"
                color="success"
                className=" col-5 col-sm-4 col-md-3 col-lg-2 me-1 me-sm-2 bg-white purple li-shadow"
                style={{ textTransform: "initial", fontWeight: "600" }}
                onClick={() => {
                  setModalOpen(false);
                  setEvents(true);
                }}
              >
                Proceed
              </Button>
            ) : (
              <Button
                variant="contained"
                style={{ opacity: 0.6 }}
                className=" col-5 col-sm-4 col-md-3 col-lg-2 me-1 me-sm-2 bg-purple text-white li-shadow cursor-disable"
                style={{ textTransform: "initial", fontWeight: "600" }}
              >
                Proceed
              </Button>
            )}
          </div>
        </Box>
      </Modal>
    );
  };

  const Welcome = () => (
    <div
      className="overflow-hidden d-flex flex-column justify-content-start px-4 mt-2"
      style={{ height: !mob && !tab && "90.8vh" }}
    >
      <div className="purple-gradient fw-bold mb-2 mt-4 welcome">
        Welcome to <br></br>Dream Community !!
      </div>
      <div className="purple fw-600 mt-2 mb-4" style={{ fontSize: 18 }}>
        Participate in events! create your own events and<br></br> build a
        community among your friends.
      </div>
      <div className="row d-flex justify-content-evenly align-items-center px-4 mt-md-5">
        <div
          className="col-10 col-xl-3 col-md-5 mt-4 mt-md-0 li-shadow bg-linearlr p-0 pt-2 br-10 cursor-pointer d-flex flex-column align-items-center"
          onClick={() => {
            setEvents(false);
            setBrainstroming(false);
            setZEvents(true);
          }}
        >
          <img
            height="200px"
            width="200px"
            src={dc1}
            className="bg-hash li-shadow mx-auto rounded-circle"
          ></img>
          <div
            className=" bg-white li-shadow p-4 col-12 mt-3 purple text-center fw-600"
            style={{ borderRadius: "10px 10px 0px 0px", fontSize: 20 }}
          >
            Zillion Events
          </div>
        </div>
        <div
          className="col-10 col-xl-3 col-md-5 mt-4 mt-md-0 li-shadow bg-linearlr p-0 pt-2 br-10 cursor-pointer d-flex flex-column align-items-center"
          onClick={() => handleOpen()}
        >
          <img
            height="200px"
            width="200px"
            src={dc4}
            className="bg-hash li-shadow mx-auto rounded-circle"
          ></img>
          <div
            className=" bg-white li-shadow p-4 w-100 mt-3 m-0 purple text-center fw-600"
            style={{ borderRadius: "10px 10px 0px 0px", fontSize: 20 }}
          >
            Create Events
          </div>
        </div>
        <div
          className="col-10 col-xl-3 col-md-5 my-4 my-xl-0 li-shadow bg-linearlr p-0 pt-2 br-10 cursor-pointer d-flex flex-column align-items-center "
          onClick={() => {
            setEvents(false);
            setBrainstroming(true);
          }}
        >
          <img
            height="200px"
            width="200px"
            src={dc3}
            className="bg-hash li-shadow mx-auto rounded-circle"
          ></img>
          <div
            className=" bg-white li-shadow p-4 col-12 mt-3 purple text-center fw-600"
            style={{ borderRadius: "10px 10px 0px 0px", fontSize: 20 }}
          >
            ZD Brainwave
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div>
        {loader ? (
          <div className="vh-100 col-12 bg-white d-flex flex-column align-justify-center">
            <video
              src={dc_loader}
              // width="40%"
              className="dream-gif"
              type="mov"
              // muted="muted"
              autoPlay="true"
              loop
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "spring", stiffness: 60, duration: 0.5 }}
              className="h4 fw-600 purple text-uppercase"
            >
              Dream Community
            </motion.div>
          </div>
        ) : (
          <section className="bg-white d-flex justify-items-center pt-2">
            <div className={`${!mob && "container"}`}>
              {events ? (
                <CreateEvents
                  setEvents={setEvents}
                  setSuccess={setSuccess}
                  mob={mob}
                  tab={tab}
                />
              ) : brainstroming ? (
                <BrainstormingFamily
                  setBrainstroming={setBrainstroming}
                  mob={mob}
                  tab={tab}
                />
              ) : zEvents ? (
                <ZillionEvents setZEvents={setZEvents} mob={mob} tab={tab} />
              ) : (
                <Welcome />
              )}
            </div>
            <AnimatePresence>{modalOpen && <ModalBody />}</AnimatePresence>
          </section>
        )}
      </div>
      <Snackbar
        sx={{ ml: { md: "100px" } }}
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        TransitionComponent={TransitionUp}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          sx={{ width: "100%", backgroundColor: "#9bf8cf" }}
        >
          Your <strong>Event</strong> was created successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
