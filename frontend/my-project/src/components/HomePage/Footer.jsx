import React from "react";
import { FaInstagram, FaWhatsapp,FaPhoneAlt,FaEnvelope } from "react-icons/fa";

import styles from "../styles/components/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo & About */}
        <div className={styles.section}>
          <div className={styles.logo}>🎓 VJISS</div>
          <p className={styles.description}>
            Empowering students with industry-ready skills through expert-led
            courses, hands-on projects, and career support.
          </p>
        </div>

        {/* Quick Links */}
        <div className={styles.section}>
          <h4 className={styles.heading}>Quick Links</h4>
          <ul className={styles.links}>
            <li><a href="/">Home</a></li>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/about">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.section}>
          <h4 className={styles.heading}>Contact Us</h4>
         

<p>
  <a href="mailto:info@vjinnovative.co.in" className={styles.contactLinkEmail}>
    <FaEnvelope style={{ marginRight: "8px" }} />
    info@vjinnovative.co.in
  </a>
</p>




     <p>
  <a href="tel:8985744204" className={styles.contactLink}>
    <FaPhoneAlt style={{ marginRight: "8px" }} />
    8985744204
  </a>
</p>

        <div className={styles.socials}>
  <div className={styles.socials}>
  <a
    href="https://www.instagram.com/vj_innovative?igsh=MW85ZzZhZzNzMnpjbQ%3D%3D"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    <FaInstagram />
  </a>

  <a
    href="https://wa.me/918985744204"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp"
  >
    <FaWhatsapp />
  </a>
</div>

</div>

        </div>
      </div>

      <div className={styles.bottom}>
        &copy; {new Date().getFullYear()} VJISS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
