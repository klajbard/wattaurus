import { useState, useLayoutEffect } from "react";

export default function useScrolling(ref) {
  const [scroll, setScroll] = useState(0);
  useLayoutEffect(function () {
    function updateScroll() {
      const offset = ref.current && ref.current.getBoundingClientRect().top;
      setScroll(offset < -300);
    }
    window.addEventListener("scroll", updateScroll);
    updateScroll();
    return function () {
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);
  return scroll;
}
