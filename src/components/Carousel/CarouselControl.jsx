import React from "react";
import styles from "./CarouselControl.less";

export default function CarouselControl({
  current,
  onClick,
  onLeftClick,
  onRightClick,
}) {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.buttonLeft} onClick={onLeftClick}>
        &#xab;
      </button>
      <ul className={styles.controls}>
        {[0, 1, 2].map((elem) => {
          return (
            <li key={elem}>
              <button
                onClick={onClick}
                id={elem}
                className={current == elem ? styles.current : null}
              >
                <span className="hidden">{`Showcase ${elem}`}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <button className={styles.buttonRight} onClick={onRightClick}>
        &#xbb;
      </button>
    </div>
  );
}
