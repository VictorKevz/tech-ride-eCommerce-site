import React from "react";
import CTA from "./CTA/CTA";
import "../Footer/footer.css"
import FooterMain from "./Main/FooterMain";
function Footer() {
  return (
    <section className="footer-wrapper">
      <CTA />
      <FooterMain/>
    </section>
  );
}

export default Footer;
