import React, { useState, useEffect } from "react";
import "../css/styles.css";

import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import SendIcon from "@mui/icons-material/Send";

const Main = () => {
  const navigate = useNavigate();

  const moveRepo = () => {
    navigate("/mainRepo");
  };

  const handleKakaoLogin = () => {
    window.location.href = "http://localhost:8080/oauth/kakao";
  };

  const handleNaverLogin = () => {
    window.location.href = "http://localhost:8080/oauth/naver";
  };

  const [userId, setUserId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // Menu anchor state
  const open = Boolean(anchorEl);

  // useEffect to check localStorage on component mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  const handleMenuClick = (event) => {
    if (userId) {
      moveRepo();
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="description" content="" />
      <meta name="author" content="" />
      <title>New Age - Start Bootstrap Theme</title>
      <link rel="icon" type="image/x-icon" href="../public/img/favicon.ico" />
      {/* Bootstrap icons*/}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
        rel="stylesheet"
      />
      {/* Google fonts*/}
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,600;1,600&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,300;0,500;0,600;0,700;1,300;1,500;1,600;1,700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,400;1,400&display=swap"
        rel="stylesheet"
      />
      {/* Core theme CSS (includes Bootstrap)*/}
      <link href="../css/styles.css" rel="stylesheet" />
      {/* Navigation*/}

      <div className="navbar">
        <div
          style={{
            marginLeft: "180px",
            fontFamily: "Kanit",
            fontWeight: "600",
            fontSize: "21px",
          }}
        >
          Img Cloud
        </div>
        <div>
          <Button
            variant="contained"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMenuClick}
            size="large"
            endIcon={userId ? <SendIcon /> : <LoginIcon />} // Conditionally rendering icons
            sx={{
              marginRight: "180px",
              fontFamily: "Kanit",
              fontWeight: "bold",
              borderRadius: "20px",
            }}
          >
            {userId ? "Get Started" : "Login"}
          </Button>

          {!userId && (
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
            >
              <MenuItem>
                <img
                  src="img/kakao_login_large.png"
                  alt="카카오로 로그인"
                  onClick={handleKakaoLogin}
                  style={{
                    cursor: "pointer",
                    width: "200px",
                    height: "50px",
                  }}
                />
              </MenuItem>
              <MenuItem>
                {" "}
                <img
                  src="img/btnW.png"
                  alt="네이버로 로그인"
                  onClick={handleNaverLogin}
                  onMouseOver={(e) => (e.currentTarget.src = "img/btnG.png")}
                  onMouseOut={(e) => (e.currentTarget.src = "img/btnW.png")}
                  style={{
                    cursor: "pointer",
                    width: "200px",
                    height: "50px",
                  }}
                />
              </MenuItem>
            </Menu>
          )}
        </div>
      </div>
      {/* App features section*/}
      <section id="features">
        <div className="container px-5">
          <div className="row gx-5 align-items-center">
            <div className="col-lg-8 order-lg-1 mb-5 mb-lg-0">
              <div className="container-fluid px-5">
                <div className="row gx-5">
                  <div className="col-md-6 mb-5">
                    {/* Feature item*/}
                    <div className="text-center">
                      <i className="bi-image icon-feature text-gradient d-block mb-3" />
                      <h3 className="font-alt">Choose Best Shot</h3>
                      <p className="text-muted mb-0">
                        Explore our photo quality assessment tool and choose
                        your best shot with confidence.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 mb-5">
                    {/* Feature item*/}
                    <div className="text-center">
                      <i className="bi-tools icon-feature text-gradient d-block mb-3" />
                      <h3 className="font-alt">Additional Functions</h3>
                      <p className="text-muted mb-0">
                        You can convert your file format, compress files without
                        quality loss, and remove noise.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-5 mb-md-0">
                    {/* Feature item*/}
                    <div className="text-center">
                      <i className="bi-gift icon-feature text-gradient d-block mb-3" />
                      <h3 className="font-alt">Choose your Plan</h3>
                      <p className="text-muted mb-0">
                        Choose the plan that's right for you. We have 3 plans.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    {/* Feature item*/}
                    <div className="text-center">
                      <i className="bi-patch-check icon-feature text-gradient d-block mb-3" />
                      <h3 className="font-alt">Open Source</h3>
                      <p className="text-muted mb-0">
                        OpenCV and BRISQUE were used to measure image quality
                        scores.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 order-lg-0">
              <div className="features-device-mockup">
                <svg
                  className="circle"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="circleGradient"
                      gradientTransform="rotate(45)"
                    >
                      <stop className="gradient-start-color" offset="0%" />
                      <stop className="gradient-end-color" offset="100%" />
                    </linearGradient>
                  </defs>
                  <circle cx={50} cy={50} r={50} />
                </svg>
                <svg
                  className="shape-1 d-none d-sm-block"
                  viewBox="0 0 240.83 240.83"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="-32.54"
                    y="78.39"
                    width="305.92"
                    height="84.05"
                    rx="42.03"
                    transform="translate(120.42 -49.88) rotate(45)"
                  />
                  <rect
                    x="-32.54"
                    y="78.39"
                    width="305.92"
                    height="84.05"
                    rx="42.03"
                    transform="translate(-49.88 120.42) rotate(-45)"
                  />
                </svg>
                <svg
                  className="shape-2 d-none d-sm-block"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx={50} cy={50} r={50} />
                </svg>
                <div className="device-wrapper">
                  <div
                    className="device"
                    data-device="iPhoneX"
                    data-orientation="portrait"
                    data-color="black"
                  >
                    <div className="screen bg-black">
                      <img
                        src="img/mainBurst2.jpg" // img/mainBurst2를 이미지 경로로 지정
                        alt="Main Burst Image" // 접근성을 위한 alt 텍스트 추가
                        style={{ maxWidth: "100%", height: "100%" }} // 이미지 스타일 적용
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;
