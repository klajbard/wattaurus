import React from "react";
import Posts from "../components/Posts/Posts";
import Carousel from "../components/Carousel/Carousel";
import styles from "./Homepage.less";
import PinnedPosts from "../PinnedPosts";
import { getRecents } from "../data";

export default function Homepage() {
  const recentPosts = getRecents();
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.carousel}>
          <Carousel />
        </div>
        <div className={styles.posts}>
          <Posts posts={recentPosts} />
        </div>
      </div>
      <PinnedPosts />
    </div>
  );
}
