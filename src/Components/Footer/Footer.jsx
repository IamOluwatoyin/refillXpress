import React from "react";
import "./footer.css";
import { BsWhatsapp, BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { GrLinkedin } from "react-icons/gr";
import Instagram from "../../assets/instagram.png";

const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="footer">
        <section className="top">
          <div className="column-one">
            <h2 className="logo-style">
              refill<span className="logo-heading">Xpress</span>
            </h2>
            <p>
              Empowering customers with innovative solutions. Join thousands of
              satisfied users worldwide.
            </p>
          </div>
          <div className="column-list">
            <h2>products</h2>
            <ul>
              <li>features</li>
              <li>pricing</li>
              <li>vendors</li>
            </ul>
          </div>
          <div className="column-list">
            <h2>company</h2>
            <ul>
              <li>about us</li>
              <li>contact</li>
              <li>press</li>
            </ul>
          </div>
          <div className="column-list">
            <h2>support</h2>
            <ul>
              <li>FAQ</li>
              <li>help center</li>
              <li>documentation</li>
            </ul>
          </div>
          <div className="column-one">
            <h2>Subscribe to our newsletter</h2>
            <p>
              Get the latest updates, news, and special offers delivered to your
              inbox.
            </p>
            <button className="email-btn">Email address</button>
            <button className="email-btn border">Subscribe</button>
          </div>
        </section>
        <section className="bottom">
          <div className="left">
            <h2>
              Copywright 2025 @ refillxpress, <span>Design</span>
            </h2>
          </div>
          <div className="right">
            <BsWhatsapp className="wa-icon" />
            <FaFacebook className="fb-icon" />
            <img src={Instagram} className="ig-icon" />
            <BsTwitterX />
            <GrLinkedin className="li-icon" />
          </div>
        </section>
      </footer>
    </div>
  );
};

export default Footer;
