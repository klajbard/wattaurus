import React from "react";
import styles from "./SegmentedControl.less";

export default function SegmentedControl({ items = [], onClick }) {
  return (
    <ul className={styles.list}>
      {items.map(({ id, value, defaultChecked, ...props }) => (
        <li className={styles.item} key={id}>
          <input
            onChange={onClick}
            className={styles.input}
            type="radio"
            value={id}
            name="option"
            id={`option-${id}`}
            defaultChecked={defaultChecked}
            {...props}
          />
          <label className={styles.label} htmlFor={`option-${id}`}>
            {value}
          </label>
        </li>
      ))}
    </ul>
  );
}
