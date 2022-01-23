import { NavLink } from "react-router-dom";

function Error() {
  return (
    <>
      <h1>NO page found! Error 404</h1>
      <br />
      <NavLink className="Error_btn" to="/">
        {"<--"} Homepage
      </NavLink>
    </>
  );
}
export default Error;
