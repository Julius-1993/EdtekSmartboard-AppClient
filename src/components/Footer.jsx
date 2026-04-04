import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="footer xl:px-24 py-10 px-10 text-base-content bg-base-200">
        <aside>
          <img
            src="/logo.png"
            className="oobject-scale-down  h-20 w-40 items-center"
          />
          <p>
            EDTEK-Interactive
            <br />
            Providing reliable Service since 2010
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Useful Link</h6>
          <Link to="/about" className="link link-hover"> About Us</Link>
          <Link className="link link-hover"> Events</Link>
          <Link className="link link-hover"> Terms of use</Link>
          <Link className="link link-hover"> Privacy policy</Link>
          <Link className="link link-hover"> FAQ</Link>
        </nav>
        <nav>
          <h6 className="footer-title">Main Menu</h6>
          <Link to="/" className="link link-hover">Home</Link>
          <Link to="/menu" className="link link-hover">Menu</Link>
          <Link  className="link link-hover">Offer</Link>
        </nav>
        <nav>
          <h6 className="footer-title">Contact Us</h6>
          <a className="link link-hover">edtekboards@gmail.com</a>
          <a className="link link-hover">+2348060757622</a>
          <a className="link link-hover">Social Handle</a>
        </nav>
      </footer>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>Copyright © 2025 - All right reserved by AJ Innovation Afrika</p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
