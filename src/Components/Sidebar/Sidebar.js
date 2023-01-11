import "./Sidebar.css";
import { Link } from "react-router-dom";
import {
  AiFillPlayCircle,
  AiOutlineHistory,
  AiOutlinePoweroff,
} from "react-icons/ai";
import { auth, firebase, provider, db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  let navigate = useNavigate();

  const SignOut = () => {
    console.log("Sign Out");
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("Successfully SignedOut");
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        alert("Error");
      });
  };
  return (
    <div className="sideBar">
      <div className="sideBarFixed">
        <Link to="/">
          <AiFillPlayCircle className="SideBarLink" />
        </Link>
        <Link to="/history">
          <AiOutlineHistory className="SideBarLink" />
        </Link>
        <AiOutlinePoweroff className="SideBarLink" onClick={SignOut} />
      </div>
    </div>
  );
};

export default Sidebar;
