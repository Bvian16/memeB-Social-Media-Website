import "./navbar.scss";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, page, handlePage, logout } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="left">
        <Link
          to="/"
          style={{ textDecoration: "none" }}
          onClick={async () => await handlePage("home")}
        >
          <span>memeB</span>
        </Link>
      </div>
      <div className="search">
        <SearchOutlinedIcon />
        <input type="text" placeholder="Search..." />
      </div>
      <div className="right">
        <Link
          to="/"
          style={{ textDecoration: "none" }}
          onClick={async () => await handlePage("home")}
        >
          {page === "home" ? (
            <HomeIcon className="homeIcon" style={{ color: "blue" }} />
          ) : (
            <HomeOutlinedIcon className="homeIcon" />
          )}
        </Link>
        {darkMode ? (
          <WbSunnyOutlinedIcon className="homeIcon" onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon className="homeIcon" onClick={toggle} />
        )}
        <EmailOutlinedIcon className="homeIcon" />
        <NotificationsOutlinedIcon className="homeIcon" />
        <div className="user">
          <img
            className="homeIcon"
            src={"/upload/" + currentUser.profilePic}
            alt=""
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {/* <span>{currentUser.name}</span> */}
          {menuOpen && (
            <div className="menuBar">
              {/* <Link
                to={`/profile/${currentUser.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={async () => await handlePage("profile")}
              > */}
              <div
                className="menuWrap"
                onClick={async () => {
                  navigate(`/profile/${currentUser.id}`);
                  await handlePage("profile");
                }}
              >
                <div className="iconWrap">
                  <PersonIcon />
                </div>
                <span>Profile</span>
              </div>
              <div className="menuWrap">
                <div className="iconWrap">
                  <SettingsIcon />
                </div>
                <span>Setting</span>
              </div>
              <div className="menuWrap">
                <div className="iconWrap">
                  <HelpIcon />
                </div>
                <span>Help & Support</span>
              </div>
              <div
                className="menuWrap"
                onClick={async () => {
                  await logout();
                  await handlePage("profile");
                }}
              >
                <div className="iconWrap">
                  <LogoutIcon />
                </div>
                <span>Log Out</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
