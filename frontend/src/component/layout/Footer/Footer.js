import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";
import { BsInstagram, BsYoutube, BsFacebook } from "react-icons/bs"

const Footer = () => {
  return (
    <>
      <footer id="footer">

        <div className="leftFooter">
          <h1>ARF MART BRAND</h1>
          <p>High Quality is our first priority</p>

          <p>Copyrights 2023 &copy; Team ARF</p>
          <img src={playStore} alt="playstore" />
          <img src={appStore} alt="Appstore" />
        </div>





        <div className="links">
          <section className="">
            <div className="row">
              <div className="col">
                <h5 className="text-uppercase">About us</h5>
                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">Meet our Team</a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">Our Responsibilities</a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">Our Codes</a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">Our Values</a>
                  </li>
                </ul>
              </div>
              {/* Add more columns with links here */}
            </div>
          </section>
        </div>

        <div className="rightFooter">

          <a href="/" className="social-icon"><BsInstagram /></a>
          <a href="/" className="social-icon"><BsYoutube /></a>
          <a href="/" className="social-icon"><BsFacebook /></a>
        </div>

      </footer>

    </>
  );
};

export default Footer;