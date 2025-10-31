import React from "react";
import "./Footer.css";
import { CiFacebook } from "react-icons/ci";
import { MdOutlineWhatsapp } from "react-icons/md";
import { BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="footer-container" id="contact">
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
          <div className="top_left">
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
            <div className="column-list">
              <h2>Contact us</h2>
              <ul>
                <li>+23481665694</li>
                <li>+2340760994040</li>
                <li>customerservice@refillXpress.ng</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="bottom">
          <div className="left">
            <h2>
              Copywright 2025 @ refillxpress, <span>Design</span>
            </h2>
          </div>
          <div className="right">
            <CiFacebook />
            <MdOutlineWhatsapp />
            <BsInstagram />
          </div>
        </section>
      </footer>
    </div>
  );
};

export default Footer;
