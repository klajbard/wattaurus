import { useState, useEffect } from "react";

export default function useWindowSize(ref = window) {
  const [size, setSize] = useState(0);
  useEffect(
    function () {
      function updateSize() {
        setSize({
          innerWidth: ref.innerWidth || ref.scrollWidth,
          innerHeight: ref.innerHeight || ref.scrollHeight,
        });
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return function () {
        window.removeEventListener("resize", updateSize);
      };
    },
    [ref.scrollHeight, ref.scrollWidth]
  );
  return size;
}
