import React from "react";
import styles from "./Video.less";

export default function Video({ video }) {
  return (
    <figure
      className={`${styles.figure} ${styles[video.align || "left"]}`}
      style={video.style || {}}
    >
      <video className={styles.video} controls autoPlay loop>
        <source src={video.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <figcaption>
        {video.caption.text ? (
          video.caption.text
        ) : (
          <>
            By {video.caption.by} via{" "}
            <a href={video.caption.url} target="_blank">
              {video.caption.via}
            </a>
          </>
        )}
      </figcaption>
    </figure>
  );
}
