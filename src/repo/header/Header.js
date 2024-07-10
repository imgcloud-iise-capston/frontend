import { useAppContext } from "../../context/AppContext";
import "../../css/Header.css";
import { Link } from "react-router-dom";

const Header = ({ theme }) => {
  // theme props를 받도록 수정
  const { user } = useAppContext();

  return (
    <div className="header">
      <div className="userInfo">
        <div>
          <img
            src={
              localStorage.getItem("picture") ||
              "frontend/public/img/profile.png"
            } //undefind인경우해결하기
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
        <button>로그아웃</button>
      </div>
    </div>
  );
};

export default Header;
