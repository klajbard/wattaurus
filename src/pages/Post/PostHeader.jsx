import React from "react";
import Link from "../../components/Link/Link";
import { Link as RRDLink } from "react-router-dom";
import styles from "./PostHeader.less";
import { getReadTime } from "../../utils";

export default function PostHeader({ content, id, title, time, tags }) {
  const date = new Date(time).toLocaleString("en-US", {
    timeZone: "Europe/Budapest",
  });

  return (
    <div>
      <h1 className={styles.title}>
        <Link to={`/posts/${id}`} tagName={RRDLink}>
          {title}
        </Link>
      </h1>
      <span>{getReadTime(content)} minutes read</span>
      <div className={styles.secondRow}>
        <span>{date}</span>
        <span>
          {tags.map((tag) => {
            return <span key={tag}>#{tag}</span>;
          })}
        </span>
      </div>
    </div>
  );
}

PostHeader.defaultProps = {
  tags: [],
};
