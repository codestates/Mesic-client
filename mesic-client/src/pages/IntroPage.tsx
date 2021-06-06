import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Nav from "../components/UI/Nav";

import logo from "../images/mesic-logo.png";
import github_logo from "../images/github-logo.png";
import browser from "../images/Browser.png";

import section1_Img from "../images/illustration-1.png";
import section2_Img from "../images/illustration-2.png";
import section3_Img from "../images/illustration-3.png";
import section4_Img from "../images/illustration-4.png";
import section5_Img from "../images/illustration-5.png";

import blob_1 from "../images/Blob-2.png";
import blob_2 from "../images/Blob-3.png";
import blob_3 from "../images/Blob-4.png";
import blob_4 from "../images/Blob-5.png";
import blob_5 from "../images/Blob-6.png";

function IntroPage() {
  const history = useHistory();
  const [scrollY, setScrollY] = useState<number>(0);

  const moveToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  const onScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const addAnimation = () => {
    const illus = document.querySelectorAll(".section-img");
    for (let i = 0; i < illus.length; i++) {
      const bounding = illus[i].getBoundingClientRect().top;
      if (window.innerHeight > bounding) {
        illus[i].classList.add("in");
      } else {
        illus[i].classList.remove("in");
      }
    }
  };
  const addEventListener = () => {
    window.addEventListener("scroll", addAnimation);
    window.addEventListener("load", addAnimation);
  };

  useEffect(() => {
    addEventListener();
    addAnimation();
  }, []);
  return (
    <>
      <Nav />
      <div className="mainpage">
        <div className={`scroll-down ${scrollY > 300 ? "display-none" : ""}`}>
          see more details
        </div>
        <div
          onClick={() => moveToTop()}
          className={`scroll-up ${
            scrollY < 300 ? "display-none" : "align-middle"
          }`}
        >
          top
        </div>
        <section className="mainpage-mesic">
          <div className="mainpage-mesic-body">
            <img src={browser} className="left-img mainpage-img" />
            <div className="mainpage-mesic-text">
              <div className="mainpage-mesic-about-us">ABOUT US</div>
              <div className="mainpage-mesic-title">
                Mesic <span>[Memory + Music]</span>
              </div>
              <div className="mainpage-mesic-subtitle">
                <p>
                  <strong>음악</strong>과 함께 그 당시로 떠나는 <br />
                  <strong>마법</strong> 같은 <strong>추억</strong>
                  여행
                </p>
              </div>
              <div className="mainpage-mesic-btn">
                <button onClick={() => history.push("/mainpage")}>
                  바로 시작하기
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="mainpage-mesic first-section">
          <div className="mainpage-mesic-body">
            <img src={section1_Img} className="section-img" />
            <div className="mainpage-mesic-text">
              <img className="blob-img blob-1" src={blob_1} />
              <div className="mainpage-mesic-subtitle ">
                <p>
                  "<strong>그 노래</strong>만 들으면{" "}
                  <strong>그 때 그 일</strong>이 생각나.."
                </p>
              </div>
              <div className="mainpage-mesic-title">
                이런 노래 누구든 하나쯤 있지 않나요?
              </div>
            </div>
          </div>
        </section>
        <section className="mainpage-mesic second-section">
          <div className="mainpage-mesic-body">
            <div className="mainpage-mesic-text">
              <img className="blob-img blob-2" src={blob_2} />
              <div className="mainpage-mesic-subtitle ">
                <p>
                  <strong>학교 가는 길</strong>에 들었던 신나는 힙합,
                  <br />
                  <strong>연인과 헤어지고 들었던</strong> 슬픈 발라드 같이
                </p>
              </div>
              <div className="mainpage-mesic-title">
                우리에겐 노래에 대한 <br />
                다양한 추억들이 있습니다.
              </div>
            </div>
            <img src={section2_Img} className="section-img" />
          </div>
        </section>
        <section className="mainpage-mesic third-section">
          <div className="mainpage-mesic-body">
            <img src={section3_Img} className="section-img" />
            <div className="mainpage-mesic-text">
              <img className="blob-img blob-3" src={blob_3} />
              <div className="mainpage-mesic-subtitle ">
                <p>
                  3분동안 잠깐 그 당시로 <br />
                  <strong>추억여행</strong>을 떠나보시는 건 어떠신가요?
                </p>
              </div>
              <div className="mainpage-mesic-title">
                Mesic과 함께 당신의 추억을 <br /> 가장 생생하게 기록해보세요!
              </div>
            </div>
          </div>
        </section>
        <section className="mainpage-mesic fourth-section">
          <div className="mainpage-mesic-body">
            <div className="mainpage-mesic-text">
              <img className="blob-img blob-4" src={blob_4} />
              <div className="mainpage-mesic-subtitle ">
                <p>
                  내가 있는 <strong>장소</strong>에서
                  <br /> 지금의 순간을 <strong>음악, 사진, 메모</strong> 등
                </p>
              </div>
              <div className="mainpage-mesic-title">
                추억을 다양한 기록으로 남겨보세요.
              </div>
            </div>
            <img src={section4_Img} className="section-img" />
          </div>
        </section>
        <section className="mainpage-mesic fifth-section">
          <div className="mainpage-mesic-body">
            <img src={section5_Img} className="section-img" />
            <div className="mainpage-mesic-text">
              <img className="blob-img blob-5" src={blob_5} />
              <div className="mainpage-mesic-subtitle ">
                <p>
                  그 <strong>당시</strong>의 <strong>풍경</strong>이 눈 앞에
                  펼쳐지는
                </p>
              </div>
              <div className="mainpage-mesic-title">
                마법같은 경험을 하실 수 있습니다!
              </div>
            </div>
          </div>
        </section>
        <section className="mainpage-mesic-btn-end">
          <button onClick={() => history.push("/mainpage")}>
            <div>
              <img src={logo} />
              <div>시작하기</div>
            </div>
          </button>
        </section>
        <section className="mainpage-footer">
          <div className="mainpage-footer-body">
            <div className="mainpage-footer-logo">
              <img src={logo} />
            </div>
            <div className="mainpage-footer-members">
              <div>MEMBERS</div>
              <div
                onClick={() =>
                  (window.location.href = "https://github.com/jjy0821")
                }
              >
                jjy0821 @Github
              </div>
              <div
                onClick={() =>
                  (window.location.href = "https://github.com/jinhw12")
                }
              >
                jinhw12 @Github
              </div>
              <div
                onClick={() =>
                  (window.location.href = "https://github.com/Bill1907")
                }
              >
                Bill1907 @Github
              </div>
              <div
                onClick={() =>
                  (window.location.href = "https://github.com/Gwan-Woo-Jeong")
                }
              >
                Gwan-Woo-Jeong @Github
              </div>
            </div>
            <div className="mainpage-footer-repo">
              <img src={github_logo} />
              <div
                onClick={() =>
                  (window.location.href =
                    "https://github.com/codestates/Mesic-client/wiki")
                }
              >
                Mesic Wiki
              </div>
              <div
                onClick={() =>
                  (window.location.href =
                    "https://github.com/codestates/Mesic-client")
                }
              >
                Repository
              </div>
            </div>
            <div className="mainpage-footer-copyright">
              <div>Copyrightⓒ2021 PORT757 All rights reserved.</div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default IntroPage;
