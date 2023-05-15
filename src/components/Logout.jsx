import { useDispatch } from "react-redux";
import { logout } from "../slices/userSlice";
import { useHistory } from "react-router-dom";

export default function Logout() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log("logout");
    dispatch(logout());
    history.push("/");
  };

  return (
    <div className="bg-body vh-100 text-center d-flex align-items-center justify-content-center">
      <button type="button" className="btn bg-purple" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}
