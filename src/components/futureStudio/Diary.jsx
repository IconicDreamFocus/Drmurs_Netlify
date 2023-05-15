import { useState, useRef, useEffect } from "react";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { addDiaryContent } from "../../slices/futureStudioSlice";
import axios from "axios";
import {
  endpoint,
  token,
  config,
  formatDate,
  formatDate2,
  ModalAnimation,
} from "../../endpoint";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import loaderW from "../../assets/images/loader-white.gif";
import loaderP from "../../assets/images/loader-color.gif";
import nodata from "../../assets/images/nodairy.gif";
import { TextField, Button, Snackbar, Slide, Alert } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

import InfiniteScroll from "react-infinite-scroll-component";

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

export default function Diary({ setDiary, mob, tab }) {
  const { diary } = useSelector((state) => state.futureStudio);
  const dispatch = useDispatch();

  const [diaryData, setDiaryData] = useState([]);
  const [load, setLoad] = useState(true);
  const [addDiary, setAddDiary] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [overWrite, setOverWrite] = useState(false);
  const [ind, setInd] = useState(null);
  // const [pageNo, setPageNo] = useState(0);
  const [page, setPage] = useState(0);
  const [isMore, setIsMore] = useState(false);

  const diaryTitleRef = useRef(null);
  const diaryTextRef = useRef(null);
  const [diaryDate, setDiaryDate] = useState(null);

  const [dataCopy, setDataCopy] = useState({
    text: "",
    title: "",
    date: "",
  });
  const [error, setError] = useState(false);
  const [added, setAded] = useState(false);
  const [edited, setEdited] = useState(false);

  useEffect(() => console.log(diaryData), [diaryData]);

  useEffect(() => {
    axios
      .get(`${endpoint}/diary?page=${page}&limit=10`, config)
      .then((res) => {
        setDiaryData([...diaryData, ...res.data.data]);
        setLoad(false);
        res.data.data.length < 10 ? setIsMore(false) : setIsMore(true);
      })
      .catch((err) => console.log(err));
  }, [page]);

  useEffect(() => {
    setPage(0);
    axios
      .get(`${endpoint}/diary?page=${page}&limit=10`, config)
      .then((res) => {
        setDiaryData(res.data.data);
        setLoad(false);
        // res.data.data.length < 10 ? setIsMore(false) : setIsMore(true);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  const ViewStory = ({ i }) => {
    const story = diaryData[i];

    const handleCloseView = () => {
      let dupData = [...diaryData];
      dupData[i].expand = false;
      setDiaryData(dupData);
    };
    return (
      <Modal
        // className={classes.modalStyle1}
        // sx={{ overflow: "scroll" }}
        open={story.expand}
        onClose={handleCloseView}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="d-flex justify-content-center align-items-center mx-2 mx-md-3 mx-lg-4 mx-lg-5"
      >
        <Box
          component={motion.div}
          {...ModalAnimation}
          className="edit-prof overflow-hidden bg-linearlr no-out"
          sx={{
            // backgroundColor: "#7201c8 !important",
            // position: "absolute",
            // top: "50%",
            // left: "50%",
            // transform: "translate(-50%, -50%)",
            // overflowY: "scroll",
            // border: "3px solid #fff",
            borderRadius: 5,
            boxShadow: 24,
            // height: 500,
            // px: 4,
            // py: 2,
          }}
        >
          <div className="d-flex align-items-start justify-content-between mb-4">
            <div className="h6 bg-white px-3 py-2 purple br-10 m-2 li-shadow ">
              {formatDate(story.dairy_date)}
            </div>
            <div
              className="bg-white p-2 purple me-4 li-shadow"
              style={{
                borderRadius: " 0px 0px 10px 10px",
              }}
            >
              <CloseIcon
                onClick={handleCloseView}
                className="cursor-pointer bg-white purple"
                style={{ fontSize: "1.6rem" }}
              />
            </div>
          </div>
          <div
            className="bg-white purple m-3 br-15 h-75 li-shadow"
            // style={{ minHeight: 300 }}
          >
            <div className="col-12 d-flex justify-content-center">
              <div
                className="py-2 px-4 bg-linearlr li-shadow"
                style={{
                  borderRadius: " 0px 0px 10px 10px",
                }}
              >
                {story.title}
              </div>
            </div>
            <div className="purple my-4 mx-3">{story.text}</div>
          </div>
        </Box>
      </Modal>
    );
  };

  const AddDiary = () => {
    const story = ind != null ? diaryData[ind] : null;
    // const [error, setError] = useState(false);
    const [addData, setAddData] = useState(dataCopy);

    function checkDate() {
      let repeat = false;
      diaryData.forEach((dd) => {
        if (formatDate2(dd.dairy_date) == addData.date) repeat = true;
      });
      return repeat;
    }

    const handleSubmit = (e) => {
      // e.preventDefault();
      // const diaryTitle = diaryTitleRef.current.value;
      // const diaryText = diaryTextRef.current.value;

      // console.log(diaryText, diaryTitle);

      let { date, title, text } = addData;
      if (ind) date = diaryData[ind].dairy_date;

      console.log(addData);
      if (date == "" || text == "" || title == "") {
        setError(true);
        setTimeout(() => setError(false), 3000);
      } else {
        const data = {
          dairy_date: ind != null ? diaryData[ind].dairy_date : date,
          title,
          text,
        };
        ind != null ? setEdited(true) : setEdited(false);
        dispatch(
          addDiaryContent({
            title,
            date,
            description: text,
          })
        );

        axios
          .post(`${endpoint}/diary`, { data }, config)
          .then((res) => {
            console.log(res.data);
            setRefresh(!refresh);
            setInd(null);
            setAddDiary(false);
            setAded(true);
          })
          .catch((err) => console.log(err));
        setDataCopy({
          text: "",
          title: "",
          date: "",
        });
      }
    };

    const ModalBody = () => {
      return (
        <Modal
          open={overWrite}
          onClose={() => {}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="d-flex justify-content-center align-items-center py-sm-5 mx-md-3 mx-lg-4 mx-lg-5"
        >
          <Box
            component={motion.div}
            {...ModalAnimation}
            className="bg-white overwrite-modal"
            sx={{
              // position: "absolute",
              // top: "50%",
              // left: "50%",
              // transform: "translate(-50%, -50%)",
              // width: "40vw",
              // height: "30vh",
              overflowY: "scroll",
              // border: "3px solid #fff",
              outline: "none",
              borderRadius: 10,
              boxShadow: 24,
              px: 4,
            }}
          >
            <div className="d-flex flex-column ">
              <p
                className="fw-600 bg-linearlr col-4 mx-auto text-center p-2 mt-0"
                style={{
                  borderRadius: "0px 0px 10px 10px",
                  boxShadow: "0px 5px 10px #0000005e",
                }}
              >
                Alert!!
              </p>
              {/* <img
                className="mx-auto bg-white"
                src={invalid ? invalidgif : verifiedImg}
                width="60%"
                height="60%"
              /> */}
              <div
                className="d-flex flex-column justify-content-around"
                style={{ height: "20vh" }}
              >
                <div className="mx-auto fw-600 h5 purple ">
                  A note already exists in this date! Do you want to overwrite?
                </div>
                <div className="d-flex align-justify-center">
                  <div
                    className="bg-white li-shadow br-10 purple px-3 py-2 mx-2 cursor-pointer"
                    onClick={() => setOverWrite(false)}
                  >
                    No, Change Date
                  </div>
                  <div
                    className="bg-linearlr li-shadow br-10 px-3 py-2 mx-2 cursor-pointer"
                    onClick={() => {
                      setOverWrite(false);
                      handleSubmit();
                    }}
                  >
                    Yes, Overwrite!
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      );
    };

    // setAddData({ ...addData, date: story.dairy_date });
    // console.log(ind);
    // function changeTextAreaValue1() {
    //   document.getElementById("myTextArea").value = story
    //     ? story.text
    //     : "sample";
    // }
    // function changeTextAreaValue2() {
    //   var oldVal = document.getElementById("myTextArea").value;
    //   document.getElementById("myTextArea").value = oldVal + diaryTextRef;
    // }
    // changeTextAreaValue1();
    // changeTextAreaValue2();

    // <textarea rows="10%" cols="100%" id="myTextArea"></textarea>;

    return (
      <>
        <div className="fw-600 h4 col-11 col-md-9 mx-auto mt-4 mb-4 purple">
          Add your today's activity
        </div>
        <div
          className="col-11 col-md-10 col-xl-8 mx-auto li-shadow my-2 bg-linearlr"
          style={{ borderRadius: 30 }}
        >
          {/* <form> */}
          <div className="">
            <div className="d-flex justify-content-end col-12 ">
              <div className=" br-10">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={story ? story.dairy_date : addData.date}
                    label="Calendar"
                    format="dd/MM/yyyy"
                    onChange={(date) => {
                      const newDate = formatDate2(date);
                      !story && setAddData({ ...addData, date: newDate });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        required
                        className="p-1"
                        sx={{ bgcolor: "#ffffff" }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div className="px-3 px-md-5 py-4">
              <div className="col-12">
                <div className="fw-bold text-white h5">Title</div>
                <input
                  ref={diaryTitleRef}
                  // required
                  value={addData.title}
                  onChange={(e) =>
                    setAddData({ ...addData, title: e.target.value })
                  }
                  type="text"
                  placeHolder={story ? story.title : "Add a title to your note"}
                  maxLength="30"
                  className="w-100 bg-white rounded-3 p-2 li-y-shadow border-0  no-out"
                />
              </div>
              <div className="fw-bold text-white h5 mt-3">Work Sheet</div>
              <textarea
                ref={diaryTextRef}
                rows={10}
                onChange={(e) =>
                  setAddData({ ...addData, text: e.target.value })
                }
                value={addData.text}
                type="text"
                id="myTextArea"
                // value={story ? story.text : ""}
                placeHolder={story ? story.text : "Write something..."}
                className="col-12 bg-white br-10 p-2 li-y-shadow border-0 no-out"
              ></textarea>
              <div className="col-12 d-flex justify-content-between align-items-end">
                <div className="col-6">
                  {error && (
                    <div className="text-white fw-600" style={{ fontSize: 12 }}>
                      **Please Fill out all the fields**
                    </div>
                  )}
                </div>
                <div className="col-6 d-flex justify-content-end align-items-end">
                  <Button
                    className="col-4 bg-linearlr text-center fw-bold shadow mt-3  me-2"
                    onClick={() => {
                      setAddDiary(false);
                      setInd(null);
                      setAddData({
                        text: "",
                        title: "",
                        date: "",
                      });
                    }}
                    style={{
                      textTransform: "initial",
                      borderRadius: 10,
                      boxShadow: "0px 3px 10px #0000005e",
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="col-4 bg-white purple text-center fw-bold shadow mt-3  me-2"
                    style={{
                      textTransform: "initial",
                      borderRadius: 10,
                      boxShadow: "0px 3px 10px #0000005e",
                    }}
                    onClick={(e) => {
                      setDataCopy(addData);
                      if (!checkDate()) handleSubmit(e);
                      else {
                        console.log("overWrite??");
                        setOverWrite(true);
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
              <AnimatePresence> {overWrite && <ModalBody />}</AnimatePresence>
            </div>
          </div>
          {/* </form> */}
        </div>
      </>
    );
  };

  return (
    <>
      <div
        className=" mb-2 mt-1 mt-md-2 col-11 mx-auto d-flex pe-4"
        // style={{ borderTop: "2px solid #7201c8" }}
      >
        {!addDiary && (
          <ArrowBackIcon
            className="bg-purple rounded-circle p-1 me-3 mt-2 cursor-pointer li-shadow"
            sx={{ fontSize: 30 }}
            onClick={() => setDiary(false)}
          />
        )}
        <p
          className="fw-bold bg-linearlr col-6 col-md-3 col-xl-2 mx-auto text-center p-2 mt-0"
          style={{
            borderRadius: "0px 0px 10px 10px",
            boxShadow: "0px 5px 10px #0000005e",
          }}
        >
          ZD Diary
        </p>
      </div>
      {addDiary ? (
        <AddDiary />
      ) : (
        // <DiaryList />
        <>
          <div className="px-xl-5 mt-4">
            <div className="d-flex justify-content-between py-2 px-3 px-md-5">
              <div
                className=" fw-600 purple"
                style={{ fontSize: mob || tab ? 20 : 30 }}
              >
                Add daily record of<br></br> Your personal activities
              </div>
              <div>
                <button
                  type="button"
                  className="cursor-pointer bg-linearlr rounded-circle border-0 li-shadow p-2 p-xl-3 ms-5 mt-md-2"
                  onClick={() => setAddDiary(true)}
                >
                  <AddIcon style={{ fontSize: 30 }} />
                </button>
              </div>
            </div>
          </div>
          <div className="p-2 p-md-5">
            {load ? (
              <div className="col-12 d-flex align-justify-center my-5 py-5 h-100">
                <img className="my-3" src={loaderP} width="10%" height="10%" />
              </div>
            ) : diaryData.length == 0 ? (
              <div className="col-12 d-flex flex-column align-justify-center">
                <img src={nodata} className="launching-gif" />
                <div className="purple">Add some notes to view them here</div>
              </div>
            ) : (
              diaryData.length > 0 && (
                <InfiniteScroll
                  className="col-12 row d-flex align-items-between justify-content-around mx-auto"
                  dataLength={diaryData.length}
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
                  {diaryData
                    // .slice(0)
                    // .reverse()
                    .map((val, index) => (
                      <div
                        className="d-flex flex-column justify-content-between mb-4 align-items-center col-12"
                        key={index}
                      >
                        <AnimatePresence>
                          {val.expand && <ViewStory i={index} />}
                        </AnimatePresence>
                        <>
                          <div className="bg-linearlr col-12 col-md-10 col-xl-8 mx-auto li-shadow ps-1 pt-1 br-15 position-relative">
                            <div
                              className="bg-white purple li-shadow px-2 py-1 rounded-circle me-3 cursor-pointer position-absolute"
                              style={{ top: 5, right: 2 }}
                              onClick={() => {
                                setAddDiary(true);
                                setInd(index);
                              }}
                            >
                              <EditIcon style={{ fontSize: 17 }} />
                            </div>
                            <div
                              className="col-12 cursor-pointer"
                              onClick={() => {
                                setAddDiary(false);
                                let dupData = [...diaryData];
                                dupData[index].expand = true;
                                setDiaryData(dupData);
                              }}
                            >
                              <div className=" d-flex align-items-start justify-content-start col-10 col-md-5">
                                <div className="bg-white li-shadow br-10 p-1 py-2">
                                  <div
                                    className="purple text-center fw-600 px-3"
                                    // style={{ maxHeight: 70 }}
                                  >
                                    {val.title}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 d-flex flex-column align-items-end mt-0">
                                <div
                                  className="bg-white li-shadow purple fw-600 mb-0 px-2 px-md-3 py-2 col-4 col-xl-3 text-center mt-4"
                                  style={{
                                    borderRadius: "0px 10px 10px 0px",
                                    // boxShadow: "0px 100px 0px #000",
                                  }}
                                >
                                  {formatDate(val.dairy_date)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      </div>
                    ))}
                </InfiniteScroll>
              )
            )}
          </div>
        </>
      )}
      <Snackbar
        sx={{ ml: { md: "100px" } }}
        open={added}
        autoHideDuration={6000}
        onClose={() => setAded(false)}
        TransitionComponent={TransitionUp}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={() => setAded(false)}
          severity="success"
          sx={{ width: "100%", backgroundColor: "#9bf8cf" }}
        >
          Your <strong>Note</strong> was {edited ? "edited " : "added "}
          successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
