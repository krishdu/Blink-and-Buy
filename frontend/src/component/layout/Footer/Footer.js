import React from "react";
import playStore from "../../../images/playstore.png";
import appstore from "../../../images/appstore.png";
import "./Footer.css";

const Footer = (props) => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download app for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore icon" />
        <img src={appstore} alt="applestore icon" />
      </div>
      <div className="midFooter">
        <h1>Blink&amp;Buy</h1>
        <p>An E-commerce platform that is made to impress</p>
        <p>Copyright 2022 &copy; Krishnendu</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://github.com/krishdu/">GitHub</a>
        <a href="https://www.instagram.com/patra._.krishnendu/">Instagram</a>
        <a href="https://www.youtube.com/">YouTube</a>
      </div>
    </footer>
  );
};

export default Footer;
