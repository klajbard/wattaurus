import React from "react";
import Link from "../components/Link/Link";
import styles from "./About.less";
import { InstagramIcon, FacebookIcon, MailIcon } from "../assets/icons";

export default function About() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About Wattaurus</h1>
      <div className={styles.postContainer}>
        <p className={styles.justify}>
          Wattaurus is a tech blog recently started in September, 2020 for
          tinkerers, smart home fans, people who love playing with Arduino and
          Raspberry and also for myself to organize and document my projects.
          The plan behind this diary-like blog was that I never wrote down how
          I've actually solved a problem but wanted to proceed as fast as I can.
          That was a huge mistake! Years after that, now I learned that all
          these issues and problems will repeatedly pup up with the need to have
          an investigation again on how to handle it. This could be a simple
          package installation on Linux, misuse of a microcontroller or even to
          remeber what I've already achieved (yeah, that might sounds funny but
          actually happened few times).
        </p>
      </div>
      <p className={styles.justify}>
        If you love <strong>creating something from nothing</strong>, if you
        want to <strong>automate boring stuff</strong>, if you want to get a
        better view on <strong>microcontrollers and sensors</strong> you will
        feel right at home here. I am here for you and hopefully you will be
        here for me too.
      </p>
      <p className={styles.justify}>
        Don't be shy to reach me out on <i>Facebook</i>, <i>Instagram</i> or
        just drop me an <i>e-mail</i>. I would be glad to hear from you so go on
        share your feedback and ideas and let's do something great together!
      </p>
      <div className={styles.socialList}>
        <div className={styles.socialItem}>
          <div className={styles.iconContainer}>
            <FacebookIcon className={styles.icon} />
          </div>
          <Link
            className={`${styles.link} ${styles.fb}`}
            href="https://www.facebook.com/wattaurus/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={`${styles.linkContainer}`}>
              facebook.com/wattaurus
            </div>
          </Link>
        </div>
        <div className={styles.socialItem}>
          <div className={styles.iconContainer}>
            <InstagramIcon className={styles.icon} />
          </div>
          <Link
            className={`${styles.link} ${styles.insta}`}
            href="https://www.instagram.com/wattaurus1/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={`${styles.linkContainer}`}>
              instagram.com/wattaurus1
            </div>
          </Link>
        </div>
        <div className={styles.socialItem}>
          <div className={styles.iconContainer}>
            <MailIcon className={styles.icon} />
          </div>
          <Link
            className={`${styles.link} ${styles.mail}`}
            href="mailto:alpha@wattaurus.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={`${styles.linkContainer}`}>alpha@wattaurus.com</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
