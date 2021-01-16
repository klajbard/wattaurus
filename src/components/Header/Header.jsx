import React from "react";
import styles from "./Header.less";
import Link from "../Link/Link";
import { Link as RRDLink } from "react-router-dom";

export default function Header() {
  return (
    <header className={styles.container}>
      <nav className={styles.linkContainer}>
        <Link className={styles.link} nav tagName={RRDLink} to="/">
          home
        </Link>
        <Link className={styles.link} nav tagName={RRDLink} to="/posts">
          posts
        </Link>
        <Link className={styles.link} nav tagName={RRDLink} to="/resistor-calc">
          resistor calc
        </Link>
        <Link className={styles.link} nav tagName={RRDLink} to="/about">
          about
        </Link>
      </nav>
    </header>
  );
}
