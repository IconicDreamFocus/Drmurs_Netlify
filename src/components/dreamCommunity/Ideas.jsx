import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addIdea } from "../../slices/queryMaker";
import { endpoint, token, config } from "../../endpoint";
import axios from "axios";

export default function Ideas({ data, publicQueryId }) {
  const dispatch = useDispatch();
  const [userIdea, setUserIdea] = useState("");
  const selectedQuery = data.find((val) => val.id === publicQueryId);
  const { loggedIn, user, username, avatar } = useSelector(
    (state) => state.user
  );

  axios.get(`${endpoint}/answers/61b8058c79c371bf4d7fe36c`, config);

  function handleSubmit() {
    const data = {
      question_id: publicQueryId,
      text: userIdea,
    };
    dispatch(
      addIdea({
        idea: userIdea,
        id: publicQueryId,
      })
    );
    axios.post(`${endpoint}/answer`, { data }, config);
    setUserIdea("");
  }
  return (
    <>
      <div className="d-flex align-items-start">
        <div className="w-100">
          <h2 className="purple">{selectedQuery.query}</h2>
          {selectedQuery.sug.map((val) => (
            <h4 className="ms-md-1">
              • {user ? user : username} : {val}
            </h4>
          ))}
          {console.log(loggedIn, user, username)}
          <input
            value={userIdea}
            type="text"
            className="form-control mt-5 no-out"
            id="exampleFormControlInput1"
            placeholder="Enter your Idea"
            onChange={(e) => setUserIdea(e.target.value)}
          />
          <button className="btn bg-purple mt-3" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
