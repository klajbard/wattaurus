import React from "react";
import styles from "./Posts.less";
import Link from "../Link/Link";
import { Link as RRDLink } from "react-router-dom";
import { truncate, getReadTime } from "../../utils";

export default function Posts({ posts, contentLength, withImage }) {
  return (
    <div className={styles.container}>
      {posts.map((post) => {
        const date = new Date(post.time).toLocaleString("en-US", {
          timeZone: "Europe/Budapest",
        });
        const isRecent = new Date() - post.time < 1000 * 60 * 60 * 24 * 3;
        return (
          <div className={styles.post} key={post.id}>
            {withImage && (
              <div className={styles.imageContainer}>
                <img
                  className={styles.image}
                  src={post.cover.thumb}
                  alt={post.id}
                  key={post.id}
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            <div className={styles.contentContainer}>
              <h2 className={styles.title}>
                <Link
                  className={styles.link}
                  nav
                  tagName={RRDLink}
                  to={`/posts/${post.id}`}
                >
                  {post.title}
                </Link>
                {isRecent && <sup>NEW</sup>}
              </h2>
              <span className={styles.content}>
                {truncate(post.content[0], contentLength)}
              </span>
              <div className={styles.footer}>
                <span>{date}</span>
                <span>{getReadTime(post.content)} minutes read</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
