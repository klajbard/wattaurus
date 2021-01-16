import React from "react";
import styles from "./Ribbon.less";

export default function Ribbon({ children, className }) {
  return (
    <div className={`${styles.ribbon}${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}
