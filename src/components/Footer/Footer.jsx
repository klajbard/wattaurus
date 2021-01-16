import React from "react";
import styles from "./Footer.less";
import { GithubIcon, InstagramIcon, FacebookIcon } from "../../assets/icons";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.linkContainer}>
          <a
            className={styles.iconLink}
            href="https://github.com/klajbard"
            rel="noopener noreferrer"
            name="Github link"
          >
            <GithubIcon />
          </a>
          <a
            className={styles.iconLink}
            href="https://instagram.com/wattaurus1"
            rel="noopener noreferrer"
            name="Instagram link"
          >
            <InstagramIcon />
          </a>
          <a
            className={styles.iconLink}
            href="https://www.facebook.com/wattaurus"
            rel="noopener noreferrer"
            name="Instagram link"
          >
            <FacebookIcon />
          </a>
        </div>
        <div className={styles.copyright}>
          <small>&copy; Copyright 2021, Wattaurus</small>
        </div>
      </div>
    </footer>
  );
}
