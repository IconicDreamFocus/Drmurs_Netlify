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

export default function NavigationMap() {
  const history = useHistory();
  return (
    <div className={container}>
      <ArrowBackIcon
        className="bg-purple rounded-circle p-1 cursor-pointer"
        sx={{ fontSize: 30 }}
        onClick={() => history.goBack()}
      />
      <div
        className={card}
        style={{
          borderRadius: 10,
        }}
      >
        <h5 className={title}>Authentication</h5>
        <p className={para}>
          The log in screen lets you create a new zillion account. you can also
          select your field of interest. You can also recover password by
          tapping forgot password?(website/Android/ios)
        </p>
      </div>
      <div
        className={card}
        style={{
          borderRadius: 10,
        }}
      >
        <h5 className={title}>Memoir</h5>
        <p className={para}>
          Memoir lets you to post your content with captions by tapping (icon).
          To post your content: Zillion dreamz website or zillion dreamz app for
          Android and Iphone:
          <ol className="">
            <li>Tap (icon), you will be shown an empty post uploading box.</li>
            <li>
              By tapping (plus icon) you will be shown a dialog box where you
              can select your image/video, click post. Your content will be
              posted.
            </li>
          </ol>
        </p>
      </div>
      <div
        className={card}
        style={{
          borderRadius: 10,
        }}
      >
        <h5 className={title}>Future studio</h5>
        <p className={para}>
          you will be given two options CREATE GOALS
          <ol>
            <li>
              By tapping here you will be asked to enter your goal, goals
              description, number of milestones.
            </li>
            <li>
              after entering your milestones, you will be shown activity box.
              You will be given an option to create your own deadline date by
              selecting calendar icon and reminder icon for push notifications.{" "}
            </li>
            <li>
              remember you have to enter your tasks to achieve your milestones
              by tapping (plus icon). After entering all your task click next to
              move to your next milestone. remember you have to enter your tasks
              to achieve your milestones by tapping (plus icon). After entering
              all your task click next to move to your next milestone.{" "}
            </li>
          </ol>
          ACTIVITY STUDIO
          <ol>
            <li>
              By tapping here you will be shown a list of goals. you can view
              your tasks by clicking your goals. YOUR ACTIVITIES
              <ol>
                <li>
                  By selecting your goals from activity studio you will be shown
                  your activities related to that goal.
                </li>
                <li>
                  after completing your task you can check it by clicking or
                  tapping the check box.
                </li>
              </ol>
            </li>
            <li>
              TASK MANAGER
              <ol>
                <li>
                  You can able to edit your dead line and duration of your task
                  and click submit to save changes. ZD DIARY it is your personal
                  diary where you can select your date and enter your memories.
                </li>
              </ol>
            </li>
          </ol>
        </p>
      </div>
      <div
        className={card}
        style={{
          borderRadius: 10,
        }}
      >
        <h5 className={title}>Dream COMMUNITY</h5>
        <ol className={para}>
          <li>
            CREATE EVENT You can create your own events by tapping here,
            remember before you create an event you will be shown our own
            community conditions. On accepting those conditions, you can create
            your events by entering your event details which are event name,
            event description, event rules(optional), event poster, click create
            event.
          </li>
          <li>
            ZILLION EVENTS You will be shown a list of events based on your
            field of interests. On selecting the event, you will be shown the
            details about the events which are yet to be conducted. You can join
            by clicking register button.
          </li>
          <li>
            BRAINSTORMING FAMILY There are two options:
            <ol>
              <li>
                Query maker This will show public queries, where you have to
                suggest ideas on clicking the query. Upon clicking the query,
                you will be shown a dialog box where you have to enter your
                idea. Click Submit button for submitting your query.
              </li>
              <li>
                Your queries This will show your queries which are created by
                you. By clicking Add query icon on your query maker section,
                will ask you enter your query. After entering click submit
                button. Your query will be posted publicly. You can also view
                ideas suggested by other users on clicking on your query.
              </li>
            </ol>
          </li>
        </ol>
      </div>
    </div>
  );
}
