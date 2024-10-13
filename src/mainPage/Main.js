import React from "react";
import "../css/styles.css";

import { Link, useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  const moveLogin = () => {
    navigate("/login");
  };

  const handleKakaoLogin = () => {
    window.location.href = "http://localhost:8080/oauth/kakao";
  };

  const handleNaverLogin = () => {
    window.location.href = "http://localhost:8080/oauth/naver";
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
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top shadow-sm"
        id="mainNav"
      >
        <div className="container px-5">
          <a className="navbar-brand fw-bold" href="#page-top">
            Img Cloud
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="bi-list" />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto me-4 my-3 my-lg-0">
              <li className="nav-item">
                <a className="nav-link me-lg-3" href="#features">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link me-lg-3" href="#download">
                  Cost Plan
                </a>
              </li>
            </ul>
            <button
              className="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0"
              data-bs-toggle="modal"
            >
              <span className="d-flex align-items-center">
                <i className="bi-chat-text-fill me-2" />
                <span className="small" onClick={moveLogin}>
                  Get Started
                </span>
              </span>
            </button>
          </div>
        </div>
      </nav>

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <button
              onClick={handleKakaoLogin}
              style={{
                backgroundColor: "#FFF067",
                opacity: "67%",
                border: "None",
                padding: "10px 20px",
                marginTop: "30px",
                cursor: "pointer",
                width: "200px",
                height: "50px",
                borderRadius: "15px",
                fontSize: "14px",
                fontFamily: "Nanum Gothic",
                fontWeight: "700",
              }}
            >
              카카오로 로그인
            </button>
          </div>
          {/* 네이버 로그인 버튼 */}
          <div>
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
                marginTop: "20px",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;
