import React from "react";
import { Facebook, Instagram, X } from "@mui/icons-material";
import { footerLinks } from "./footerLinksData";
import "../Main/footerMain.css"
function FooterMain() {
  return (
    <section className="footer-main-wrapper">
      <div className="logo-socials-wrapper">
        <h2 className="logo">Tech & Ride</h2>
        <p className="footer-parag">
          Our commitment is to deliver top-quality products and outstanding
          service. We aim to make every purchase satisfying, ensuring a smooth
          and enjoyable shopping experience.
        </p>
        <ul className="share-socials-wrapper footer">
          <li className="share-item">
            <a href="https://www.x.com" target="_blank" className="share-link">
              <X fontSize="large" />
            </a>
          </li>
          <li className="share-item">
            <a
              href="https://www.facebook.com"
              target="_blank"
              className="share-link"
            >
              <Facebook fontSize="large" />
            </a>
          </li>
          <li className="share-item">
            <a
              href="https://www.instagram.com"
              target="_blank"
              className="share-link"
            >
              <Instagram fontSize="large" />
            </a>
          </li>
        </ul>
      </div>
      <ul className="footer-links">
        {footerLinks.map((obj) => {
          return (
            <li key={obj.id} className="link-heading">
              <h2 className="category">{obj.category}</h2>
              {obj.links.map((link,i) => (
                <li key={i} className="footer-link">{link.name}</li>
              ))}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default FooterMain;
