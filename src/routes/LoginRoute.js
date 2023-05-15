import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function LoginRoute(props) {
  const Component = props.component;
  const { loggedIn } = useSelector((state) => state.user);

  return <>{loggedIn ? <Redirect to={{ pathname: "/" }} /> : <Component />}</>;
}
