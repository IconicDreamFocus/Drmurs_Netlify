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

export default function CreatinguserAccont() {
  const history = useHistory();

  return (
    <div className={container}>
      <ArrowBackIcon
        className="bg-purple rounded-circle p-1 cursor-pointer" 
        sx={{ fontSize: 30 }}
        onClick={() => history.goBack()}
      />
      <div className={card}>
        <h5 className={title}>SIGNUP PROCESS</h5>
        <ol className={para}>
          <li>
            Opening website (zilliondreamz.com) from a computer or from a mobile
            browser
          </li>
          <li>
            Go to zilliondreamz.com click create account,enter your
            username,email address,password,gender and phone number.
          </li>
          <li>
            Click Next, select your field of interest in multiple of your
            choice.
          </li>
          <li>
            Click Next, select your DP(DISPLAY PICTURE),using upload from
            gallery option.click finish.
          </li>
          <li>
            After clicking finish, verification link will be sent to your email
            address, by clicking the verification link, you will be redirected
            to zilliondreamz website.
          </li>
        </ol>
      </div>
      <div className={card}>
        <h5 className={title}>Zillion dreamz app for android and iphone</h5>
        <ol className={para}>
          <li>
            Download the zillion dreams app from the google play
            store(android)or from the app store(iphone)
          </li>
          <li>After successful installation,tap (zd icon) to open it.</li>
          <li>
            Tap create account then enter your username,password,email
            address,gender and phone number.tap next.
          </li>
          <li>
            Select your field of interest in multiple of your choice.click next.
          </li>
          <li>Tap upload from gallery and select your DP.Click finish.</li>
          <li>
            After clicking finish,verification link will be sent to your email
            address.by,clicking the verification link,you will be redirected to
            zilliondreamz app.
          </li>
        </ol>
      </div>
      <div className={card}>
        <h5 className={title}>
          FORGOT PASSWORD<br></br>
          ZILLIONDREAMZ WEBSITE or APP(ANDROID AND IPHONE)
        </h5>
        <ol className={para}>
          <li>
            If you logout and forget your zillion password,you’ll need to be
            able to access your emails to get back into your zillion dreamz
            account.
          </li>
          <li>
            You can also change your password in settings page,by clicking or
            tapping(settings icon),move to change password section click or tap
            forgot password(it will ask for your email id). Giving your email
            id, a verification link will be sent to your given email address.
          </li>
          <li>
            Verifying the email address, you will be asked to enter a new
            password. Click submit.
          </li>
        </ol>
      </div>
    </div>
  );
}
