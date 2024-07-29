import React from "react";
import { useAppContext } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/Header.css";

const Header = ({ theme }) => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/logout");
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="header">
      <div className="userInfo">
        <div>
          <img
            src={localStorage.getItem("picture") || "/img/profile.png"}
            style={{ width: "50px" }}
          ></img>
        </div>
        <div>{localStorage.getItem("nickname")}</div>
        <div>{localStorage.getItem("email")}</div>
      </div>
      <div className="logo">
        <img src="img/imgcloud_logo.png" />
      </div>
      <div className="menu">
        {theme === "cont" ? (
          <Link to="/mainRepo">
            <button>기본레포</button>
          </Link>
        ) : (
          <Link to="/contRepo">
            <button>연속사진</button>
          </Link>
        )}
        <button>결제관리</button>
        <button onClick={handleLogout}>로그아웃</button>
      </div>
    </div>
  );
};

export default Header;
