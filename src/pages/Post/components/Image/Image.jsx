import React from "react";
import styles from "./Image.less";
import progressiveStyles from "../../../../hooks/lazyload.less";

function ImageBasic({ image }) {
  function handleClick(event) {
    event.preventDefault();
  }
  return (
    <a
      href={image.url}
      onClick={handleClick}
      className={`${progressiveStyles.progressive} ${image.className} replace`}
    >
      <img
        src={`/${image.url_tiny || "blank.jpg"}`}
        alt={image.alt}
        className={`${progressiveStyles.preview} ${styles.image}`}
        referrerPolicy="no-referrer"
      />
    </a>
  );
}

function figurizer(Component, image) {
  return (
    <figure
      className={`${styles.figure} ${styles[image.align || "left"]}`}
      style={image.style || {}}
    >
      {image.avoidLazy ? (
        <img
          src={image.url}
          alt={image.alt}
          className={`${progressiveStyles.preview} ${styles.image}`}
          referrerPolicy="no-referrer"
        />
      ) : (
        <Component image={image} />
      )}
      <figcaption>
        {image.caption &&
          (image.caption.text ? (
            image.caption.text
          ) : (
            <>
              By {image.caption.by} via{" "}
              <a href={image.caption.url} target="_blank">
                {image.caption.via}
              </a>
            </>
          ))}
      </figcaption>
    </figure>
  );
}

export default function Image({ figure, image }) {
  return figure ? figurizer(ImageBasic, image) : <ImageBasic image={image} />;
}
