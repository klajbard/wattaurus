import React from "react";
import styles from "./Link.less";

export default function Link({ children, className, nav, tagName, ...props }) {
  const Wrapper = tagName || "a";
  const classNames = [styles.container, className, nav && styles.nav]
    .filter((elem) => elem)
    .join(" ");
  return (
    <Wrapper {...props} className={classNames}>
      {children}
    </Wrapper>
  );
}
