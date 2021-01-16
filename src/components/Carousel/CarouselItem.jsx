import React from "react";
import styles from "./CarouselItem.less";
import progressiveStyles from "../../hooks/lazyload.less";
import useWindowSize from "../../hooks/useWindowSize";

export default function CarouselItem({ background, children }) {
  const { innerWidth } = useWindowSize();
  const isMobile = innerWidth <= 995;
  function handleClick(event) {
    event.preventDefault();
  }

  return (
    <div className={styles.container}>
      <a
        href={background.normal}
        onClick={handleClick}
        className={`${progressiveStyles.progressive} ${styles.imageContainer} replace`}
      >
        <img
          src={`/${background.tiny}`}
          className={`${progressiveStyles.preview} ${styles.image} ${
            background.dark ? styles.dark : ""
          }`}
          alt="image"
          referrerPolicy="no-referrer"
        />
      </a>
      <div className={styles.banner}>
        {isMobile && (
          <a
            href={background.normal}
            onClick={handleClick}
            className={`${progressiveStyles.progressive} ${styles.imageContainerMobile} replace`}
          >
            <img
              src={`/${background.tiny}`}
              className={`${progressiveStyles.preview} ${
                background.dark ? styles.mobileDark : ""
              }`}
              alt="image"
              referrerPolicy="no-referrer"
            />
          </a>
        )}
        <div className={styles.bannerInner}>
          <span className={styles.bannerContent}>
            <p className={styles.title}>{children}</p>
          </span>
        </div>
      </div>
    </div>
  );
}
