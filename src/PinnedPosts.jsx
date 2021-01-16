import React from "react";
import styles from "./PinnedPosts.less";
import { Link } from "react-router-dom";
import { truncate } from "./utils";
import { getHighlights } from "./data";

export default function PinnedPosts() {
  const recentPosts = getHighlights();
  return (
    <div className={styles.container}>
      {recentPosts.map((post) => {
        return (
          <Link to={`/posts/${post.id}`} className={styles.post} key={post.id}>
            <span className={styles.star} title="Pinned post">
              ★
            </span>
            <img
              referrerPolicy="no-referrer"
              className={styles.image}
              src={post.cover.thumb}
              alt={post.id}
              key={post.id}
            />
            <span className={styles.header}>
              <span className={styles.title}>
                <span>{post.title}</span>
              </span>
            </span>
            <p className={styles.content}>{truncate(post.content[0], 150)}</p>
          </Link>
        );
      })}
    </div>
  );
}
