import React, { useLayoutEffect, useState } from "react";
import styles from "./Indicator.less";
import useWindowSize from "../../../../hooks/useWindowSize";

export default function Indicator() {
  const { innerHeight } = useWindowSize();
  const { innerHeight: innerHeightBody } = useWindowSize(document.body);
  const [scroll, setScroll] = useState(0);
  useLayoutEffect(function () {
    function updateScroll() {
      const scrolling = document.body.getBoundingClientRect().top;
      setScroll(scrolling);
    }
    window.addEventListener("scroll", updateScroll);
    updateScroll();
    return function () {
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);
  const maxScroll = innerHeightBody - innerHeight;

  return (
    <div className={styles.indicator}>
      <div style={{ width: `${(Math.abs(scroll) * 100) / maxScroll}%` }} />
    </div>
  );
}
