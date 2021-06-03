import { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/UI/Nav";

import logo from '../images/mesic-logo.png';
import browser from '../images/Browser.png';

import section2_Img from '../images/illustration-1.png';
import section3_Img from '../images/illustration-2.png';
import section4_Img from '../images/illustration-3.png';
import section5_Img from '../images/illustration-4.png';
import section6_Img from '../images/illustration-5.png';


function IntroPage() {
  return (
    <div>
      <Nav />
      <div className="intro-page">
        <div className="intro-page-section-1">
          <img className="intro-page-browser-img" src={browser}/>
          <div className="intro-page-text-section">
            <div className="intro-page-aboutus">ABOUT US</div>
            <div className="intro-page-aboutus-name">Mesic [Memory + Music]</div>
            <div className="intro-page-aboutus-content">
              음악과 함께 그 당시로 떠나는 
              마법 같은 추억 여행
            </div>
            <Link className="quick-start" to="/mainpage">
              <button className="quick-start-btn">바로 시작하기</button>
            </Link>
          </div>
        </div>
        <div className="intro-page-section-2">
          <img className="intro-page-section2-img" src={section2_Img}/>
          <div className="intro-page-section-2-content">
            <div className="section2-content-small">“그 노래만 들으면 그때 그 일이 생각나..”</div>
            <div className="section2-content-large">이런노래 누구든 하나쯤 있지 않나요?</div>
          </div>
        </div>
        <div className="intro-page-section-3">
          <div className="intro-page-section-3-content">
            <div className="section3-content-small"> 
              매일 학교 가는 길에 들었던 신나는 힙합 노래, <br/>
              연인과 헤어지고 들었던 슬픈 발라드 노래와 같이
            </div>
            <div className="section3-content-large">
              우리에겐 노래에 대한 다양한 추억들이 있습니다. 
            </div>
          </div>
          <img className="intro-page-section3-img" src={section3_Img}/>
        </div>
        <div className="intro-page-section-4">
          <img className="intro-page-section4-img" src={section4_Img}/>
          <div className="intro-page-section-4-content">
            <div className="section4-content-small">3분동안 잠깐 그 당시로 <br/> 추억여행을 떠나보는 건 어떠신가요?</div>
            <div className="section4-content-large">Mesic과 함께 당신의 추억을 <br/> 생생하게 기록해보세요! </div>
          </div>
        </div>
        <div className="intro-page-section-5">
          <div className="intro-page-section-5-content">
            <div className="section5-content-small">내가 다녀간 장소들에서 겪은 <br/> 그 때의 순간들을 음악, 사진, 메모 등으로</div>
            <div className="section5-content-large">다양하게 기록하고 공유해보세요!</div>
          </div>
          <img className="intro-page-section5-img" src={section5_Img}/>
        </div>
        <div className="intro-page-section-6">
          <img className="intro-page-section6-img" src={section6_Img}/>
          <div className="intro-page-section-6-content">
            <div className="section6-content-small">노래를 들으면서 사진을 보고 메모를 읽는 순간,</div>
            <div className="section6-content-large">그 당시의 풍경이 눈 앞에 펼쳐지는 <br/> 마법같은 경험을 하실 수 있습니다!</div>
          </div>
        </div>
        <div className="below-btn-section">
          <button className="intro-page-below-start-btn">
            바로 시작하기
          </button>
        </div>
        <h1/>
        <div className="footer-section">
          <img className="footer-section-logo" src={logo}></img>
          <div className="footer-section-members">
            MEMBERS <br/><br/>
            jjy0821 @Github <br/>
            jinhw12 @Github <br/>
            Bill1907 @Github <br/>
            Gwan-Woo-Jeong @Github <br/>
          </div>
          <div className="footer-section-github">
            Mesic Wiki <br/>
            Repository <br/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroPage;
