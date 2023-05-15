import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router-dom";

const container = "col-12 py-4 px-3 px-md-5";
const para = "mx-2 mx-md-4 mx-xl-5";
const subtitle = "fw-bold";
const title = "fw-bold text-center text-uppercase ";
const card = "bg-f3 py-4 mt-3 mb-5 px-2 px-md-4 li-y-shadow br-10";
const heading =
  "h2 mx-auto text-center fw-bold bg-f3 py-2 mb-3 px-5 li-y-shadow br-10";

export default function Tipsforparents() {
  const history = useHistory();
  return (
    <div className={container}>
      <div className="d-flex">
        <ArrowBackIcon
          className="bg-purple rounded-circle p-1 me-3 cursor-pointer"
          sx={{ fontSize: 30 }}
          onClick={() => history.goBack()}
        />
        <div
          className={heading}
          style={{
            borderRadius: 10,
          }}
        >
          ZD PARENT’S GUIDE
        </div>
      </div>
      <div
        className={card}
        style={{
          borderRadius: 10,
        }}
      >
        <h5 className={title}>
          Why Zillion Dreamz?
        </h5>
        <p className={para}>
          Zillion Dreamz is a goal tracking app with free photo and video
          sharing app facility on iPhone and Android. People can upload photos
          or videos to our service and share them with their followers or with a
          select group of friends. They can also view, comment and like posts
          shared by their friends on Zillion Dreamz. Anyone 13 and older can
          create an account by registering an email address and selecting a
          username
        </p>
      </div>
      <div
        className={card}
        style={{
          borderRadius: 10,
        }}
      >
        <h5 className={title}>
          Can I have access to my teen’s Zillion Dreamz account?
        </h5>
        <p className={para}>
          We appreciate your concern for your child's use of our app, but
          unfortunately, we can't give you access to the account or take any
          action on the account at your request. We're generally forbidden by
          privacy laws against giving unauthorized access to someone who isn't
          an account holder. Please note that all users ages 13 and older are
          considered authorized account holders and are included in the scope of
          this policy. Instagram requires everyone to be at least 13 years old
          before they create an account (in some areas, the age limit may be
          higher).
        </p>
      </div>
    </div>
  );
}
