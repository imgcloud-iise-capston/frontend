import React from "react";
import "../css/styles.css";
import { Link, useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  const moveLogin = () => {
    navigate("/login");
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
              data-bs-target="#feedbackModal"
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
      {/* Mashead header*/}
      <header className="masthead">
        <div className="container px-5">
          <div className="row gx-5 align-items-center">
            <div className="col-lg-6">
              {/* Mashead text and app badges*/}
              <div className="mb-5 mb-lg-0 text-center text-lg-start">
                <h1 className="display-1 lh-1 mb-3">
                  Manage your photos easily.
                </h1>
                <p className="lead fw-normal text-muted mb-5">
                  Launch your mobile app landing page faster with this free,
                  open source theme from Start Bootstrap!
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              {/* Masthead device mockup feature*/}
              <div className="masthead-device-mockup">
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
                      {/* PUT CONTENTS HERE:*/}
                      {/* * * This can be a video, image, or just about anything else.*/}
                      {/* * * Set the max width of your media to 100% and the height to*/}
                      {/* * * 100% like the demo example below.*/}
                      <img
                        // muted, autoPlay, loop 속성은 이미지에는 적용되지 않으므로 주석 처리.
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
      </header>
      {/* Quote/testimonial aside*/}
      <aside className="text-center bg-gradient-primary-to-secondary">
        <div className="container px-5">
          <div className="row gx-5 justify-content-center">
            <div className="col-xl-8">
              <div className="h2 fs-1 text-white mb-4">
                "An intuitive platform that simplifies image quality assessment,
                format conversion, and enhancement — all in one seamless
                experience!"
              </div>
              <img
                src="img/imgcloud_whitelogo.png"
                alt="..."
                style={{ height: "3rem" }}
              />
            </div>
          </div>
        </div>
      </aside>
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
              {/* Features section device mockup*/}
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
                      {/* PUT CONTENTS HERE:*/}
                      {/* * * This can be a video, image, or just about anything else.*/}
                      {/* * * Set the max width of your media to 100% and the height to*/}
                      {/* * * 100% like the demo example below.*/}
                      <img
                        // muted, autoPlay, loop 속성은 이미지에는 적용되지 않으므로 주석 처리.
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
      {/* Basic features section*/}
      <section className="bg-light">
        <div className="container px-5">
          <div className="row gx-5 align-items-center justify-content-center justify-content-lg-between">
            <div className="col-12 col-lg-5">
              <h2 className="display-4 lh-1 mb-4">
                Enter a new age of web design
              </h2>
              <p className="lead fw-normal text-muted mb-5 mb-lg-0">
                This section is perfect for featuring some information about
                your application, why it was built, the problem it solves, or
                anything else! There's plenty of space for text here, so don't
                worry about writing too much.
              </p>
            </div>
            <div className="col-sm-8 col-md-6">
              <div className="px-5 px-sm-0">
                <img
                  className="img-fluid rounded-circle"
                  src="https://source.unsplash.com/u8Jn2rzYIps/900x900"
                  alt="..."
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Call to action section*/}
      <section className="cta" id="download">
        <div className="cta-content">
          <div className="container costPlan">
            <div className="leftCost">
              <div className="costName">Starter</div>
            </div>
            <div className="centerCost">
              <div className="costName">Basic</div>
            </div>
            <div className="rightCost">
              <div className="costName">Pro</div>
            </div>
          </div>
        </div>
      </section>
      {/* App badge section*/}

      {/* Footer*/}
      <footer className="bg-black text-center py-5">
        <div className="container px-5">
          <div className="text-white-50 small">
            <div className="mb-2">© ImgCloud 2024. All Rights Reserved.</div>
            <a href="#!">Privacy</a>
            <span className="mx-1">·</span>
            <a href="#!">Terms</a>
            <span className="mx-1">·</span>
            <a href="#!">FAQ</a>
          </div>
        </div>
      </footer>
      {/* Feedback Modal*/}
      <div
        className="modal fade"
        id="feedbackModal"
        tabIndex={-1}
        aria-labelledby="feedbackModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-gradient-primary-to-secondary p-4">
              <h5
                className="modal-title font-alt text-white"
                id="feedbackModalLabel"
              >
                Send feedback
              </h5>
              <button
                className="btn-close btn-close-white"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body border-0 p-4">
              {/* * * * * * * * * * * * * * * **/}
              {/* * * SB Forms Contact Form * **/}
              {/* * * * * * * * * * * * * * * **/}
              {/* This form is pre-integrated with SB Forms.*/}
              {/* To make this form functional, sign up at*/}
              {/* https://startbootstrap.com/solution/contact-forms*/}
              {/* to get an API token!*/}
              <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                {/* Name input*/}
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="name"
                    type="text"
                    placeholder="Enter your name..."
                    data-sb-validations="required"
                  />
                  <label htmlFor="name">Full name</label>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="name:required"
                  >
                    A name is required.
                  </div>
                </div>
                {/* Email address input*/}
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    data-sb-validations="required,email"
                  />
                  <label htmlFor="email">Email address</label>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="email:required"
                  >
                    An email is required.
                  </div>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="email:email"
                  >
                    Email is not valid.
                  </div>
                </div>
                {/* Phone number input*/}
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="phone"
                    type="tel"
                    placeholder="(123) 456-7890"
                    data-sb-validations="required"
                  />
                  <label htmlFor="phone">Phone number</label>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="phone:required"
                  >
                    A phone number is required.
                  </div>
                </div>
                {/* Message input*/}
                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    id="message"
                    type="text"
                    placeholder="Enter your message here..."
                    style={{ height: "10rem" }}
                    data-sb-validations="required"
                    defaultValue={""}
                  />
                  <label htmlFor="message">Message</label>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="message:required"
                  >
                    A message is required.
                  </div>
                </div>
                {/* Submit success message*/}
                {/**/}
                {/* This is what your users will see when the form*/}
                {/* has successfully submitted*/}
                <div className="d-none" id="submitSuccessMessage">
                  <div className="text-center mb-3">
                    <div className="fw-bolder">Form submission successful!</div>
                    To activate this form, sign up at
                    <br />
                    <a href="https://startbootstrap.com/solution/contact-forms">
                      https://startbootstrap.com/solution/contact-forms
                    </a>
                  </div>
                </div>
                {/* Submit error message*/}
                {/**/}
                {/* This is what your users will see when there is*/}
                {/* an error submitting the form*/}
                <div className="d-none" id="submitErrorMessage">
                  <div className="text-center text-danger mb-3">
                    Error sending message!
                  </div>
                </div>
                {/* Submit Button*/}
                <div className="d-grid">
                  <button
                    className="btn btn-primary rounded-pill btn-lg disabled"
                    id="submitButton"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
